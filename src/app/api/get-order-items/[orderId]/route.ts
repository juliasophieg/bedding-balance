import { NextResponse } from "next/server";
import { getOrderItems } from "../../../../utils/db";

export async function GET(
  request: Request,
  { params }: { params: { orderId: number } }
) {
  try {
    const orderItems = await getOrderItems(params.orderId);
    return NextResponse.json(orderItems);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
