import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/config/db";
import { productIdGenerator } from "@/lib/utils";

export const POST = async (req:NextRequest, res:NextResponse) => {
  try {
    const body = await req.json();
    const { products } = body;

    if (!Array.isArray(products)) {
      return NextResponse.json(
        {
          error: "Invalid request body. Expected an array of products.",
        },
        { status: 400 }
      );
    }

    // Get the starting product ID
    let startingProductId:any = await productIdGenerator();

    // Use promise-based queries
    const promiseDb = db.promise();

    for (let i = 0; i < products.length; i++) {
      const {
        productName,
        productType,
        productUnit,
        productUnitAmount,
        productStatus,
        retailPrice,
        wholesalePrice,
      } = products[i];

      const productId = startingProductId++; // Increment the product ID for each product

      // Insert the product into the database using a promise-based query
      await promiseDb.query(
        `INSERT INTO PRODUCT (P_ID, P_NAME, P_TYPE, P_UNIT, P_UNIT_AMOUNT, P_STATUS, RETAIL_PRICE, WHOLE_PRICE, P_IMAGE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          productId,
          productName,
          productType,
          productUnit,
          productUnitAmount,
          productStatus,
          parseInt(retailPrice),
          parseInt(wholesalePrice),
          null,
        ]
      );
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error while processing request:", error);
    return NextResponse.json({ status: 500 });
  }
};