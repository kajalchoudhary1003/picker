import axios from 'axios';
import { IProduct, Product } from '@/app/models/Product';
import { dbConnect } from './mongoose';

export async function fetchProducts(): Promise<IProduct[]> {
  try {
    const response = await axios.get('https://64e0caef50713530432cafa1.mockapi.io/api/products');
    return response.data as IProduct[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw error for handling in `addProductsToMongo`
  }
}

export async function addProductsToMongo(products: IProduct[]) {
  try {
    await dbConnect();

    // Retrieve existing products
    const existingProducts = await Product.find({}).exec();
    const existingProductIds = new Set(existingProducts.map((product) => product.id));

      // Filter out products that already exist in MongoDB
      const newProducts = products.filter((product) => !existingProductIds.has(product.id));

      if (newProducts.length > 0) {
        await Product.insertMany(newProducts);
        console.log(`Added ${newProducts.length} new products to MongoDB.`);
      } else {
        console.log('No new products to add.');
      }
  } catch (error) {
    console.error('Error adding products to MongoDB:', error);
  }
}