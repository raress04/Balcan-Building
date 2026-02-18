/**
 * Image Optimization Script
 * 
 * This script compresses images while maintaining good quality:
 * - Portfolio images: Resized to max 800px width (for thumbnails)
 * - Gallery images: Resized to max 1600px width (for lightbox viewing)
 * - Converts to JPEG with 80% quality (good balance of size/quality)
 * - Creates backup of originals first
 * 
 * Usage: node scripts/optimize-images.cjs
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const rootDir = path.join(__dirname, '..');
const imagesDir = path.join(rootDir, 'public', 'images');

// Configuration
const CONFIG = {
    portfolio: {
        maxWidth: 800,      // Thumbnails don't need to be huge
        quality: 80,        // Good quality for portfolio previews
    },
    gallery: {
        maxWidth: 1600,     // Large enough for lightbox viewing
        quality: 85,        // Slightly higher quality for full-size viewing
    },
    hero: {
        maxWidth: 1200,     // Hero image
        quality: 85,
    }
};

async function ensureBackupDir() {
    const backupDir = path.join(imagesDir, 'backup');
    try {
        await fs.access(backupDir);
    } catch {
        await fs.mkdir(backupDir, { recursive: true });
    }
    return backupDir;
}

async function backupFile(filePath, backupDir) {
    const relativePath = path.relative(imagesDir, filePath);
    const backupPath = path.join(backupDir, relativePath);

    // Create subdirectory in backup if needed
    await fs.mkdir(path.dirname(backupPath), { recursive: true });

    try {
        await fs.access(backupPath);
        console.log(`  [SKIP] Backup already exists: ${relativePath}`);
    } catch {
        await fs.copyFile(filePath, backupPath);
        console.log(`  [BACKUP] ${relativePath}`);
    }
}

async function optimizeImage(filePath, config) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return { skipped: true, reason: 'not an image' };
    }

    try {
        const originalStats = await fs.stat(filePath);
        const originalSize = originalStats.size;

        // Read and get metadata
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Skip if already smaller than target
        if (metadata.width && metadata.width <= config.maxWidth) {
            return {
                skipped: true,
                reason: `already ${metadata.width}px wide`,
                originalSize
            };
        }

        // Process image
        const buffer = await image
            .resize(config.maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({
                quality: config.quality,
                mozjpeg: true  // Use mozjpeg for better compression
            })
            .toBuffer();

        // Write optimized image
        await fs.writeFile(filePath, buffer);

        const newSize = buffer.length;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        return {
            success: true,
            originalSize,
            newSize,
            savings,
            originalWidth: metadata.width,
            newWidth: config.maxWidth
        };
    } catch (error) {
        return { error: error.message };
    }
}

async function processDirectory(dir, config, backupDir) {
    let totalOriginal = 0;
    let totalNew = 0;
    let processed = 0;
    let skipped = 0;
    let errors = 0;

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory() && entry.name !== 'backup') {
            // Recursively process subdirectories
            const subResult = await processDirectory(fullPath, config, backupDir);
            totalOriginal += subResult.totalOriginal;
            totalNew += subResult.totalNew;
            processed += subResult.processed;
            skipped += subResult.skipped;
            errors += subResult.errors;
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                // Backup first
                await backupFile(fullPath, backupDir);

                // Optimize
                const result = await optimizeImage(fullPath, config);

                if (result.success) {
                    console.log(`  [OK] ${entry.name}: ${(result.originalSize / 1024).toFixed(0)}KB -> ${(result.newSize / 1024).toFixed(0)}KB (-${result.savings}%)`);
                    totalOriginal += result.originalSize;
                    totalNew += result.newSize;
                    processed++;
                } else if (result.skipped) {
                    console.log(`  [SKIP] ${entry.name}: ${result.reason}`);
                    if (result.originalSize) {
                        totalOriginal += result.originalSize;
                        totalNew += result.originalSize;
                    }
                    skipped++;
                } else if (result.error) {
                    console.log(`  [ERROR] ${entry.name}: ${result.error}`);
                    errors++;
                }
            }
        }
    }

    return { totalOriginal, totalNew, processed, skipped, errors };
}

async function main() {
    console.log('Image Optimization Script\n');
    console.log('This will compress images while maintaining good quality.\n');

    const backupDir = await ensureBackupDir();
    console.log(`Backup directory: ${backupDir}\n`);

    let grandTotalOriginal = 0;
    let grandTotalNew = 0;

    // Process portfolio images
    const portfolioDir = path.join(imagesDir, 'portfolio');
    try {
        await fs.access(portfolioDir);
        console.log('Processing portfolio images...');
        const portfolioResult = await processDirectory(portfolioDir, CONFIG.portfolio, backupDir);
        grandTotalOriginal += portfolioResult.totalOriginal;
        grandTotalNew += portfolioResult.totalNew;
        console.log(`   Processed: ${portfolioResult.processed}, Skipped: ${portfolioResult.skipped}, Errors: ${portfolioResult.errors}\n`);
    } catch {
        console.log('Portfolio directory not found\n');
    }

    // Process gallery images
    const galleryDir = path.join(imagesDir, 'gallery');
    try {
        await fs.access(galleryDir);
        console.log('Processing gallery images...');
        const galleryResult = await processDirectory(galleryDir, CONFIG.gallery, backupDir);
        grandTotalOriginal += galleryResult.totalOriginal;
        grandTotalNew += galleryResult.totalNew;
        console.log(`   Processed: ${galleryResult.processed}, Skipped: ${galleryResult.skipped}, Errors: ${galleryResult.errors}\n`);
    } catch {
        console.log('Gallery directory not found\n');
    }

    // Process hero image
    const heroImage = path.join(imagesDir, 'hero-construction.jpg');
    try {
        await fs.access(heroImage);
        console.log('Processing hero image...');
        await backupFile(heroImage, backupDir);
        const heroResult = await optimizeImage(heroImage, CONFIG.hero);
        if (heroResult.success) {
            console.log(`  [OK] hero-construction.jpg: ${(heroResult.originalSize / 1024).toFixed(0)}KB -> ${(heroResult.newSize / 1024).toFixed(0)}KB (-${heroResult.savings}%)`);
            grandTotalOriginal += heroResult.originalSize;
            grandTotalNew += heroResult.newSize;
        } else if (heroResult.skipped) {
            console.log(`  [SKIP] hero-construction.jpg: ${heroResult.reason}`);
        }
        console.log('');
    } catch {
        console.log('Hero image not found\n');
    }

    // Summary
    console.log('=======================================');
    console.log('SUMMARY');
    console.log('=======================================');
    console.log(`Original total: ${(grandTotalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized total: ${(grandTotalNew / 1024 / 1024).toFixed(2)} MB`);
    const totalSavings = grandTotalOriginal > 0
        ? ((grandTotalOriginal - grandTotalNew) / grandTotalOriginal * 100).toFixed(1)
        : 0;
    console.log(`Total savings: ${((grandTotalOriginal - grandTotalNew) / 1024 / 1024).toFixed(2)} MB (${totalSavings}%)`);
    console.log('');
    console.log('Done! Original images backed up to public/images/backup/');
    console.log('To restore originals, copy files from backup/ back to their locations.');
}

main().catch(console.error);
