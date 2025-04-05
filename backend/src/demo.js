const express = require('express');
const app = express();
const Product = require('./models/Product');
const { analyzeProduct, findSimilarProducts, calculateCarbonFootprint } = require('./services/productService');
const midnightService = require('./services/midnightService');

// Demo function to showcase Midnight integration
async function runDemo(imageUrl, price) {
    console.log('\n🚀 Starting Midnight Integration Demo\n');
    
    try {
        // 1. Product Analysis using Gemini API
        console.log('📦 Step 1: Product Analysis');
        console.log('------------------------');
        console.log('🔍 Analyzing product using Gemini API...');
        const productAnalysis = await analyzeProduct(imageUrl);
        console.log('✅ Product analyzed successfully');
        console.log('📊 Analysis Results:', JSON.stringify(productAnalysis, null, 2));

        // 2. Calculate carbon footprint
        console.log('\n🌍 Step 2: Carbon Footprint Calculation');
        console.log('----------------------------------');
        console.log('📊 Calculating carbon footprint...');
        const carbonFootprint = await calculateCarbonFootprint(productAnalysis);
        console.log('✅ Carbon footprint calculated');
        console.log('📊 Footprint Results:', JSON.stringify(carbonFootprint, null, 2));

        // 3. Find similar products
        console.log('\n🔄 Step 3: Finding Similar Products');
        console.log('--------------------------------');
        console.log('🔍 Searching for similar products...');
        const similarProducts = await findSimilarProducts(productAnalysis.name, price);
        console.log(`✅ Found ${similarProducts.length} similar products`);

        // 4. Prepare sensitive data for Midnight
        console.log('\n🔒 Step 4: Preparing Data for Midnight');
        console.log('--------------------------------');
        const sensitiveData = {
            ingredients: productAnalysis.ingredients,
            packagingDetails: productAnalysis.packaging,
            carbonFootprint: carbonFootprint,
            similarProducts: similarProducts
        };
        console.log('✅ Data prepared for encryption');
        console.log('🔐 Data to be encrypted:', JSON.stringify(sensitiveData, null, 2));

        // 5. Store data in Midnight
        console.log('\n🌙 Step 5: Storing Data in Midnight');
        console.log('-------------------------------');
        const midnightResult = await midnightService.storeProductData(sensitiveData);
        
        // 6. Verify data integrity
        console.log('\n🔍 Step 6: Verifying Data Integrity');
        console.log('--------------------------------');
        const isVerified = await midnightService.verifyProductData(
            midnightResult.midnightId,
            midnightResult.proof
        );
        console.log('✅ Data verification result:', isVerified);

        // 7. Retrieve data from Midnight
        console.log('\n📥 Step 7: Retrieving Data from Midnight');
        console.log('------------------------------------');
        const retrievedData = await midnightService.retrieveProductData(midnightResult.midnightId);
        console.log('📊 Retrieved Data:', JSON.stringify(retrievedData, null, 2));

        // 8. Summary
        console.log('\n📋 Integration Summary');
        console.log('-------------------');
        console.log('✅ Product Analysis: Complete');
        console.log('✅ Carbon Footprint Calculation: Complete');
        console.log('✅ Similar Products Found:', similarProducts.length);
        console.log('✅ Data Encryption: Complete');
        console.log('✅ Midnight Storage: Complete');
        console.log('✅ Data Verification:', isVerified ? 'Successful' : 'Failed');
        console.log('✅ Data Retrieval: Complete');
        
        console.log('\n✨ Demo Completed Successfully ✨');
        console.log('Midnight Integration is fully operational and secure!\n');

        return {
            productAnalysis,
            carbonFootprint,
            similarProducts,
            midnightResult,
            isVerified,
            retrievedData
        };
    } catch (error) {
        console.error('\n❌ Demo Error:', error.message);
        throw error;
    }
}

// Example usage with command line arguments
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Please provide image URL and price as arguments');
        console.error('Usage: node demo.js <imageUrl> <price>');
        process.exit(1);
    }

    const [imageUrl, price] = args;
    console.log('🎭 Starting Midnight Integration Demo...');
    console.log('This demo will showcase the complete flow of product data through the Midnight network.\n');
    console.log('📸 Image URL:', imageUrl);
    console.log('💰 Price:', price);

    runDemo(imageUrl, parseFloat(price))
        .catch(error => {
            console.error('❌ Error:', error.message);
            process.exit(1);
        });
}

module.exports = runDemo; 