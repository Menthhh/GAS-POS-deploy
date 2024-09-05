// src/app/api/(product)/delete-product/route.tsx
import { NextApiResponse } from 'next';
import db from '@/lib/config/db';
import { NextRequest, NextResponse } from 'next/server';
import { unlink, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API endpoints related to product operations
 * 
 * /api/product/delete-product:
 *   delete:
 *     summary: Delete specific products
 *     tags: [Product]
 *     description: This endpoint deletes specific products based on their IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productID:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the products to delete.
 *                 example: ["P123", "P456"]
 *     responses:
 *       200:
 *         description: Successfully deleted the specified products.
 *       500:
 *         description: Internal server error.
 */

export const DELETE = async (req:NextRequest, res: NextApiResponse) => {
    const body = await req.json();
    const { productID } = body;

    try {
        // Get image paths from the database
        const productImages = await Promise.all(productID.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('SELECT P_IMAGE FROM PRODUCT WHERE P_ID = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    if (result.length > 0) {
                        resolve(result[0].P_IMAGE);
                    } else {
                        resolve(null);
                    }
                });
            });
        }));

        // Filter out null values (in case product IDs are not found in the database)
        const validImages = productImages.filter((image: string | null) => image !== null);

        // Delete images from server
        await Promise.all(validImages.map(async (relativeImagePath: string) => {
            const imagePath = path.join(process.cwd(), 'public', relativeImagePath); // Construct full path
            try {
                // Check if the image file exists before attempting to delete it
                await access(imagePath, constants.F_OK);
                await unlink(imagePath);
            } catch (err) {
                if (err) {
                    console.error(`Error deleting image ${imagePath}:`, err);
                }
            }
        }));

        // Delete products from the database
        await Promise.all(productID.map(async (id: any) => {
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM PRODUCT WHERE P_ID = ?', [id], (err: string, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        }));

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error deleting product(s):', error);
        return NextResponse.json({ status: 500, message: 'An error occurred while deleting the product(s).' });
    }
};
