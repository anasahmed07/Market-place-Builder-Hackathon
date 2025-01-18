import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url'
import fs from 'fs';

const products = [
  {
    slug: "gradient-graphic-t-shirt",
    name: "Gradient Graphic T-shirt",
    price: 145,
    rating: 4.5,
    images: ["/images/products/gradient-graphic-t-shirt.png"],
    category: "T-shirts",
  },
  {
    slug: "polo-with-tipping-details",
    name: "Polo with Tipping Details",
    price: 180,
    oldPrice: 260,
    rating: 4.8,
    images: ["/images/products/polo-with-tipping-details.png"],
    category: "Shirts",
  },
  {
    slug: "black-striped-t-shirt",
    name: "Black Striped T-shirt",
    price: 120,
    oldPrice: 150,
    rating: 4.2,
    images: ["/images/products/black-striped-t-shirt.png"],
    category: "T-shirts",
  },
  {
    slug: "skinny-fit-jeans",
    name: "Skinny Fit Jeans",
    price: 240,
    oldPrice: 260,
    rating: 4.7,
    images: ["/images/products/skinny-fit-jeans.png"],
    category: "Jeans",
  },
  {
    slug: "checkered-shirt",
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    images: ["/images/products/checkerd-shirt.png"],
    category: "Shirts",
  },
  {
    slug: "sleeve-striped-t-shirt",
    name: "Sleeve Striped T-shirt",
    price: 130,
    oldPrice: 160,
    rating: 4.3,
    images: ["/images/products/sleeve-striped-t-shirt.png"],
    category: "T-shirts",
  },
  {
    slug: "vertical-striped-shirt",
    name: "Vertical Striped Shirt",
    price: 212,
    oldPrice: 232,
    rating: 4.6,
    images: ["/images/products/vertical-striped.png"],
    category: "Shirts",
  },
  {
    slug: "courage-graphi-t-shirt",
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.4,
    images: ["/images/products/courage-graphic.png"],
    category: "T-shirts",
  },
  {
    slug: "loose-fit-bermuda-shorts",
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    oldPrice: 110,
    rating: 4.1,
    images: ["/images/products/loose-fit.png"],
    category: "Shorts",
  },
  {
    slug: "faded-skinny-jeans",
    name: "Faded Skinny Jeans",
    price: 160,
    rating: 4.3,
    images: ["/images/products/faded-skinny-jeans.png"],
    category: "Pants",
  },
  {
    slug: "one-life-graphic-t-shirt",
    name: "One Life Graphic T-shirt",
    price: 220,
    oldPrice: 250,
    rating: 4.6,
    image: "/images/products/one-life-graphic-t-shirt.png",
    category: "Jackets",
  },
  {
    slug: "polo-with-contrast-trim",
    name: "Polo With Contrast Trim",
    price: 190,
    rating: 4.2,
    images: ["/images/products/polo-with-contrast-trim.png"],
    category: "Hoodies",
  },
  
];

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
// Create Sanity client

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_CLIENT_TOKEN,
  apiVersion: '2021-08-31'
})

/**
 * Uploads an image to Sanity and returns the asset reference.
 * @param {string} imagePath - The relative path to the image in the `public/images` folder.
 * @returns {Promise<string|null>} - Asset reference ID from Sanity.
 */

async function uploadImage(imagePath) {
  try {
    const filePath = path.resolve('public', imagePath); // Full path to the image file
    const fileStream = fs.createReadStream(filePath); // Read the image file

    // Upload the image to Sanity
    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(imagePath), // Use the image file name
    });

    return asset._id; // Return the uploaded asset reference ID
  } catch (error) {
    console.error(`Error uploading image: ${imagePath}`, error);
    return null;
  }
}

/**
 * Creates products in Sanity by iterating over the product array.
 */
async function createProducts() {
  try {
    for (const product of products) {
      console.log(`Processing product: ${product.name}`);

      // Upload images and collect asset references
      const imageRefs = [];
      for (const imageUrl of product.images) {
        const assetId = await uploadImage(imageUrl);
        if (assetId) {
          imageRefs.push({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
          });
        }
      }

      // Prepare the product document
      const productDocument = {
        _type: 'product',
        name: product.name,
        slug: product.slug,
        price: product.price,
        discount: product.discount || 0,
        category: product.category,
        description: product.description,
        images: imageRefs, // Add uploaded image references
        rating: product.rating || 0,
      };

      // Create the product document in Sanity
      const createdProduct = await client.create(productDocument);
      console.log(`Product created successfully: ${createdProduct._id}`);
    }
    console.log('All products have been processed successfully!');
  } catch (error) {
    console.error('Error creating products:', error);
  }
}

// Run the product creation script
createProducts();
