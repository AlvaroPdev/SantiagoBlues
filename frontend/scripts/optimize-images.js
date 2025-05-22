const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/assets/images');
const outputDir = path.join(__dirname, '../src/assets/images/optimized');

// Asegurarse de que el directorio de salida existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuración de optimización
const optimizationConfig = {
  jpeg: {
    quality: 80,
    progressive: true,
    mozjpeg: true
  },
  png: {
    quality: 80,
    compressionLevel: 9
  },
  webp: {
    quality: 80
  }
};

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const format = metadata.format;

    // Crear versión WebP
    const webpPath = outputPath.replace(/\.[^.]+$/, '.webp');
    await image
      .webp(optimizationConfig.webp)
      .toFile(webpPath);

    // Optimizar formato original
    if (format === 'jpeg') {
      await image
        .jpeg(optimizationConfig.jpeg)
        .toFile(outputPath);
    } else if (format === 'png') {
      await image
        .png(optimizationConfig.png)
        .toFile(outputPath);
    }

    console.log(`✅ Optimizada: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Error al optimizar ${path.basename(inputPath)}:`, error);
  }
}

// Función principal
async function optimizeImages() {
  try {
    const files = fs.readdirSync(sourceDir);
    
    for (const file of files) {
      const inputPath = path.join(sourceDir, file);
      const outputPath = path.join(outputDir, file);
      
      // Verificar si es una imagen
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        await optimizeImage(inputPath, outputPath);
      }
    }
    
    console.log('🎉 Optimización de imágenes completada');
  } catch (error) {
    console.error('❌ Error durante la optimización:', error);
  }
}

// Ejecutar la optimización
optimizeImages();

const optimizeSVG = async (inputPath, outputPath) => {
  try {
    const svgBuffer = fs.readFileSync(inputPath);
    const optimizedSvg = await sharp(svgBuffer)
      .resize(120, 40, { // Dimensiones máximas según el CSS
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();
    
    fs.writeFileSync(outputPath, optimizedSvg);
    console.log(`Optimizado: ${inputPath}`);
  } catch (error) {
    console.error(`Error optimizando ${inputPath}:`, error);
  }
};

const logosDir = path.join(__dirname, '../src/assets/logos');
const files = fs.readdirSync(logosDir);

files.forEach(file => {
  if (file.endsWith('.svg')) {
    const inputPath = path.join(logosDir, file);
    const outputPath = path.join(logosDir, `optimized-${file}`);
    optimizeSVG(inputPath, outputPath);
  }
}); 