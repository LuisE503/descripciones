// Script de verificación de categorías
// Ejecutar en la consola del navegador para verificar coincidencias

console.log('🔍 VERIFICACIÓN DE CATEGORÍAS\n');

// Obtener todas las categorías de products-data.js
const productsFromData = getAllProducts();
const categoriesFromData = productsFromData.map(p => p.category).sort();

console.log('📦 Categorías en products-data.js:', categoriesFromData.length);
console.log(categoriesFromData);

// Obtener todas las categorías de script.js (productsData)
const categoriesFromScript = Object.keys(appState.productsData).sort();

console.log('\n📁 Categorías en script.js:', categoriesFromScript.length);
console.log(categoriesFromScript);

// Comparar
const missingInScript = categoriesFromData.filter(cat => !categoriesFromScript.includes(cat));
const extraInScript = categoriesFromScript.filter(cat => !categoriesFromData.includes(cat));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (missingInScript.length > 0) {
    console.error('❌ Categorías en products-data.js pero NO en script.js:');
    missingInScript.forEach(cat => console.error('  •', cat));
} else {
    console.log('✅ Todas las categorías de products-data.js están en script.js');
}

if (extraInScript.length > 0) {
    console.warn('⚠️  Categorías en script.js pero NO en products-data.js:');
    extraInScript.forEach(cat => console.warn('  •', cat));
} else {
    console.log('✅ Todas las categorías de script.js están en products-data.js');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Verificar archivos
console.log('\n📄 Verificando archivos .txt...');

async function verifyFiles() {
    for (const product of productsFromData) {
        try {
            const response = await fetch(product.file);
            if (!response.ok) {
                console.error(`❌ ${product.category}: ${product.file} - HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ ${product.category}: ${product.file} - ${error.message}`);
        }
    }
    console.log('✅ Verificación de archivos completada');
}

verifyFiles();

console.log('\n💡 Si todos los checks son ✅, el sistema está funcionando correctamente');
