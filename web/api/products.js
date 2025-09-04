import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const [products] = await connection.execute(
          'SELECT * FROM Products WHERE is_deleted = FALSE ORDER BY created_at DESC'
        );
        res.json(products);
        break;
      
      case 'POST':
        const { product_name, product_desc, status, created_by } = req.body;
        await connection.execute(
          'INSERT INTO Products (product_name, product_desc, status, created_by) VALUES (?, ?, ?, ?)',
          [product_name, product_desc, status, created_by]
        );
        res.json({ message: 'Product created successfully' });
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


