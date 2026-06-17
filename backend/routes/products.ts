import { Router, Request, Response } from 'express';
import { getDb } from '../database';

const router = Router();

// GET /api/products — list all products (supports ?category=&search=)
router.get('/', async (req: Request, res: Response) => {
  const { category, search } = req.query;
  const db = await getDb();

  let query = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY created_at DESC';

  const result = db.exec(query, params);
  if (result.length === 0) return res.json([]);

  const { columns, values } = result[0];
  const products = values.map(row => {
    const obj: any = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });

  return res.json(products);
});

// GET /api/products/:id — single product
router.get('/:id', async (req: Request, res: Response) => {
  const db = await getDb();
  const result = db.exec('SELECT * FROM products WHERE id = ?', [req.params.id]);

  if (result.length === 0 || result[0].values.length === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { columns, values } = result[0];
  const product: any = {};
  columns.forEach((col, i) => { product[col] = values[0][i]; });

  return res.json(product);
});

export default router;
