import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = './public';

// Helper function to create a colored rectangle with text
async function createPlaceholder(width, height, text, outputPath, bgColor = '#1a1a1a') {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" fill="#d6ff62" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✓ Created: ${outputPath}`);
}

// Main generation function
async function generatePlaceholders() {
  console.log('🎨 Generating placeholder images...\n');

  // Hero image
  await createPlaceholder(1920, 1080, 'Hero Image',
    path.join(publicDir, 'images/home/hero-img.jpg'), '#0f0f0f');

  // Portrait image
  await createPlaceholder(600, 840, 'Portrait',
    path.join(publicDir, 'images/home/portrait.jpg'), '#141414');

  // Work preview images
  for (let i = 1; i <= 5; i++) {
    await createPlaceholder(800, 600, `Work ${i}`,
      path.join(publicDir, `images/work/work-${i}.jpg`), '#1d1d1d');
  }

  // Menu images
  await createPlaceholder(1920, 1080, 'Menu Background',
    path.join(publicDir, 'images/menu/menu-bg.jpg'), '#1a1a1a');

  await createPlaceholder(1920, 1080, 'Pattern',
    path.join(publicDir, 'images/menu/menu-pattern.png'), 'transparent');

  // Object images for screensaver
  const colors = ['#ed6a5a', '#f4f1bb', '#9bc1bc', '#5d576b', '#d6ff62',
                  '#ff6e14', '#3d2fa9', '#a92f78', '#ff3d33', '#2f72a9'];

  for (let i = 1; i <= 10; i++) {
    await createPlaceholder(300, 300, `${i}`,
      path.join(publicDir, `images/objects/obj-${i}.png`), colors[i - 1]);
  }

  // Footer arrow (small icon)
  const arrowSvg = `
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16 L24 16 M24 16 L18 10 M24 16 L18 22"
            stroke="#f9f4eb" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>
  `;

  await sharp(Buffer.from(arrowSvg))
    .png()
    .toFile(path.join(publicDir, 'images/global/footer-right-arrow.png'));

  console.log(`✓ Created: ${path.join(publicDir, 'images/global/footer-right-arrow.png')}`);

  console.log('\n✅ All placeholder images generated successfully!');
}

// Run the generation
generatePlaceholders().catch(console.error);
