// src/app/api/(stock-product)/(receive-product)/edit-receive/[REF์ฯ].tsx
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: ReceiveProduct
 *     description: API endpoints related to receiving product management
 * 
 * /api/stock-product/receive-product/edit-receive/{REFNO}:
 *   get:
 *     summary: Get receive product by reference number
 *     tags: [ReceiveProduct]
 *     description: Retrieve details of a receive product based on its reference number (REFNO).
 *     parameters:
 *       - in: path
 *         name: REFNO
 *         schema:
 *           type: string
 *         required: true
 *         description: The reference number of the receive product.
 *     responses:
 *       200:
 *         description: Successfully retrieved the receive product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 REFNO:
 *                   type: string
 *                   description: The reference number of the receive product.
 *                 status:
 *                   type: number
 *                   description: The status code of the response.
 *       500:
 *         description: Internal server error.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { REFNO } = req.query
  // res.end(`GET: ${REFNO}`);
  return NextResponse.json({ REFNO, status: 200 });
}