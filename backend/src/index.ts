import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'LOGiS-Ai' });
});

app.get('/api/db-status', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', message: 'Database connected successfully', result });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ status: 'error', message: 'Database connection failed', error: String(error) });
  }
});

import { execSync } from 'child_process';
app.get('/api/debug/db-push', (req, res) => {
  try {
    const env = { ...process.env, DATABASE_URL: "postgresql://postgres:!zxasqw12%40@34.64.78.99:5432/LOGiS-Ai-db?schema=public" };
    const stdout = execSync('npx prisma db push --accept-data-loss', { env }).toString();
    res.json({ status: 'success', output: stdout });
  } catch (error: any) {
    res.status(500).json({ status: 'error', output: error.stdout?.toString(), error: error.message, stderr: error.stderr?.toString() });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { tenantId, name, category, price, stock, manufacturer, spec, code, barcode, lotNumber, isInsurance } = req.body;
    
    if (!tenantId || !name || !category) {
      return res.status(400).json({ error: 'tenantId, name, and category are required' });
    }

    // [HOTFIX] Ensure the company (tenant) exists before mapping foreign key relation
    await prisma.company.upsert({
      where: { tenantId },
      update: {},
      create: {
        tenantId,
        name: `Dental Clinic (${tenantId})`,
      }
    });

    const product = await prisma.product.create({
      data: {
        tenantId,
        name,
        category,
        price: Number(price) || 0,
        stock: Number(stock) || 0,
        manufacturer,
        spec,
        code,
        barcode,
        lotNumber,
        isInsurance: Boolean(isInsurance)
      }
    });

    res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    console.error('Failed to create product:', error);
    res.status(500).json({ error: 'Failed to create product', details: String(error) });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Add isActive mock field for frontend compatibility
    const formattedProducts = products.map(p => ({
      ...p,
      isActive: true
    }));
    res.json(formattedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: String(error) });
  }
});

app.listen(Number(PORT), '0.0.0.0', async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await prisma.$connect();
    console.log('Successfully connected to the PostgreSQL database.');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
});