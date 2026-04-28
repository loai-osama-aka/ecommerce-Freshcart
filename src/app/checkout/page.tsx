import CheckoutHeader from "@/components/ui/CheckoutHeader";
import apiServices from "@/services/api";
import CheckoutClient from "./CheckoutClient";

export default async function CheckOut() {
  const addresses = await apiServices.GetUserAddresses();
  const cart = await apiServices.getUserCart();
  console.log(addresses, "aa");
  console.log(cart, "cc");

  return (
    <div className="dark:bg-gray-900 bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <CheckoutHeader />
        <CheckoutClient addresses={addresses.data} cart={cart} />
      </div>
    </div>
  );
}
