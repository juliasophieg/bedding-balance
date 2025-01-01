"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const createOrder = async () => {
  const response = await fetch("/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_name: "My New Order", // Adjust based on your form input
    }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("Order created successfully:", data);
  } else {
    console.error("Error creating order:", data.error);
  }
};

export default function Home() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/get-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Välkommen till Bedding Balance!</h1>
        <p>Ditt hjälpverktyg för att koordinera större ströbeställningar.</p>
        <button onClick={createOrder}>Kom igång</button>
        <h2>Beställningar:</h2>
        <ul>
          {orders.map((order) => (
            <Link
              href={`/order/${order.id}`}
              key={order.id}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {order.order_name} -{" "}
              {new Date(order.created_at).toLocaleDateString()}
            </Link>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
