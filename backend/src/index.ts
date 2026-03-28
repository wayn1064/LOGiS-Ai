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
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', message: 'Database connected successfully' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ status: 'error', message: 'Database connection failed', error: String(error) });
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

app.listen(Number(PORT), '0.0.0.0', async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await prisma.$connect();
    console.log('Successfully connected to the PostgreSQL database.');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
});