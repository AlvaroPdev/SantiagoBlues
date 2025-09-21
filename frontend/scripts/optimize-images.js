const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "../src/assets/images");
const outputDir = path.join(__dirname, "../src/assets/images/optimized");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const optimizationConfig = {
  jpeg: {
    quality: 80,
    progressive: true,
    mozjpeg: true,
  },
  png: {
    quality: 80,
    compressionLevel: 9,
  },
  webp: {
    quality: 80,
  },
};

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const format = metadata.format;

    const webpPath = outputPath.replace(/\.[^.]+$/, ".webp");
    await image.webp(optimizationConfig.webp).toFile(webpPath);

    if (format === "jpeg") {
      await image.jpeg(optimizationConfig.jpeg).toFile(outputPath);
    } else if (format === "png") {
      await image.png(optimizationConfig.png).toFile(outputPath);
    }
  } catch (error) {}
}

async function optimizeImages() {
  try {
    const files = fs.readdirSync(sourceDir);

    for (const file of files) {
      const inputPath = path.join(sourceDir, file);
      const outputPath = path.join(outputDir, file);

      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        await optimizeImage(inputPath, outputPath);
      }
    }
  } catch (error) {}
}

optimizeImages();

const optimizeSVG = async (inputPath, outputPath) => {
  try {
    const svgBuffer = fs.readFileSync(inputPath);
    const optimizedSvg = await sharp(svgBuffer)
      .resize(120, 40, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toBuffer();

    fs.writeFileSync(outputPath, optimizedSvg);
  } catch (error) {}
};

const logosDir = path.join(__dirname, "../src/assets/logos");
const files = fs.readdirSync(logosDir);

files.forEach((file) => {
  if (file.endsWith(".svg")) {
    const inputPath = path.join(logosDir, file);
    const outputPath = path.join(logosDir, `optimized-${file}`);
    optimizeSVG(inputPath, outputPath);
  }
});
