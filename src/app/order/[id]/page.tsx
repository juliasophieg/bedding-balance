"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderPage() {
  const params = useParams();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetch(`/api/get-order-items/${params.id}`)
      .then((res) => res.json())
      .then(setOrderItems)
      .catch(console.error);
  }, [params.id]);

  return (
    <div className="p-8">
      <h1>Order #{params.id}</h1>
      {orderItems.map((item) => (
        <div key={item.id}>{item.stall}</div>
      ))}
    </div>
  );
}
