import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const { order_name } = await req.json();
    const orderName = order_name || "New Order";
    const createdAt = new Date().toISOString();

    // First, ensure tables exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_name TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        stall TEXT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders (id)
      );
    `);

    // Create order
    const order = await db.run(
      "INSERT INTO orders (order_name, created_at) VALUES (?, ?)",
      [orderName, createdAt]
    );

    const orderId = order.lastID;

    // Insert order items
    const stallValues = [
      "Box 1",
      "Box 2",
      "Box 3",
      "Box 4",
      "Box 5",
      "Box 6",
      "Box 7",
      "Box 8",
      "Utebox 1",
      "Utebox 2",
      "Utebox 3",
      "Utebox 4",
    ];

    // Use a transaction for better performance and atomicity
    await db.run("BEGIN TRANSACTION");

    try {
      for (const stall of stallValues) {
        await db.run(
          "INSERT INTO order_items (order_id, stall) VALUES (?, ?)",
          [orderId, stall]
        );
      }
      await db.run("COMMIT");
    } catch (error) {
      await db.run("ROLLBACK");
      throw error;
    }

    return NextResponse.json(
      { message: "Order and order items created successfully", orderId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
