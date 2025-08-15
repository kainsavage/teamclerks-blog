import { readdir, readFile, access } from 'fs/promises';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

/**
 * Process hero images to generate thumbnails and blurred versions
 */
async function processHeroImages() {
	const imagesDir = join(process.cwd(), 'static', 'images');
	const postsDir = join(process.cwd(), 'src', 'posts');

	try {
		// Ensure images directory exists
		try {
			await access(imagesDir);
		} catch {
			console.log('Images directory does not exist, skipping image processing');
			return;
		}

		// Read all markdown files to find hero images
		const postFiles = await readdir(postsDir);
		const heroImages = new Set();

		for (const file of postFiles) {
			if (!file.endsWith('.md')) continue;

			const content = await readFile(join(postsDir, file), 'utf-8');
			const heroMatch = content.match(/^hero:\s*(.+)$/m);

			if (heroMatch) {
				const heroImage = heroMatch[1].trim();
				// Only process local images (not external URLs or data URLs)
				if (!heroImage.startsWith('http') && !heroImage.startsWith('data:')) {
					heroImages.add(heroImage);
				}
			}
		}

		console.log(`Found ${heroImages.size} hero images to process`);

		// Process each hero image
		for (const heroImage of heroImages) {
			const imagePath = join(imagesDir, heroImage);
			const ext = extname(heroImage);
			const name = basename(heroImage, ext);

			try {
				// Check if image exists
				await access(imagePath);

				// Generate thumbnail (320px max dimension, maintain aspect ratio)
				const thumbnailPath = join(imagesDir, `${name}_thumb${ext}`);
				await sharp(imagePath)
					.resize(320, 320, {
						fit: 'inside',
						withoutEnlargement: true
					})
					.jpeg({ quality: 80, progressive: true })
					.toFile(thumbnailPath);

				console.log(`✓ Generated thumbnail: ${basename(thumbnailPath)}`);

				// Generate blurred version (640px max dimension, maintain aspect ratio)
				const blurredPath = join(imagesDir, `${name}_blurred${ext}`);
				await sharp(imagePath)
					.resize(640, 640, {
						fit: 'inside',
						withoutEnlargement: true
					})
					.blur(15)
					.jpeg({ quality: 60, progressive: true })
					.toFile(blurredPath);

				console.log(`✓ Generated blurred: ${basename(blurredPath)}`);
			} catch (error) {
				if (error.code === 'ENOENT') {
					console.warn(`⚠ Hero image not found: ${heroImage}`);
				} else {
					console.warn(`⚠ Failed to process ${heroImage}:`, error.message);
				}
			}
		}

		console.log('Image processing complete!');
	} catch (error) {
		console.error('Error processing hero images:', error);
		process.exit(1);
	}
}

// Run the script
processHeroImages();
