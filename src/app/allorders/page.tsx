import MyOrdersHeader from "@/components/ui/MyOrdersComp/MyOrdersHeaders";
import OrderCard from "@/components/ui/MyOrdersComp/OrderCard";
import { Order } from "@/interfaces/myOrders/Order";
import apiServices from "@/services/api";
import React from "react";

export default async function AllOrders() {
  const response = await apiServices.getToken();

  const cartOwnerId = response.decoded.id;
  const orders: Order[] = await apiServices.myOrders(cartOwnerId);
  console.log(orders);

  return (
    <div className="dark:bg-gray-900 bg-white min-h-screen py-8">
      <div className="container dark:bg-gray-900 mx-auto px-4 py-8">
        <MyOrdersHeader orders={orders.length} />

        {/* Orders List */}
        <div className="space-y-4 mt-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
