import { NextResponse } from "next/server";
import { getOrderItems } from "../../../../utils/db";

export async function GET(
  request: Request,
  { params }: { params: Record<string, string> }
) {
  try {
    const orderId = parseInt(params.orderId);
    const orderItems = await getOrderItems(orderId);
    return NextResponse.json(orderItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
