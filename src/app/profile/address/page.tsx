import apiServices from "@/services/api";
import AddressClient from "./AddressClient";

export default async function Address() {
  const response = await apiServices.GetUserAddresses();
  // console.log(response, 'addresss');

  return <AddressClient addresses={response.data} />;
}
