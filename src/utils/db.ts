import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const dbPath = path.resolve(process.cwd(), "database", "orders.db");

export async function getDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export async function getOrders() {
  const db = await getDb();
  return db.all("SELECT * FROM orders");
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  return db.all("SELECT * FROM order_items WHERE order_id = ?", orderId);
}
