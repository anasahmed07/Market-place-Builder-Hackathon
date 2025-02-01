import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import bcrypt from 'bcrypt';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })
// Create Sanity client

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_CLIENT_TOKEN,
  apiVersion: '2021-08-31'
})

async function createCustomer() {
  const hashedPassword = await bcrypt.hash('Anas@4656', 10);  // Hash the password
  
  const customer = {
    _type: 'customer',
    name: 'Test Customer 2',
    email: 'test@example.com',
    password: hashedPassword,
    phone: '+1234567890',
    address: {
      street: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zip: '12345',
    },
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  const result = await client.create(customer);
  console.log('Customer created:', result);
}

createCustomer();
