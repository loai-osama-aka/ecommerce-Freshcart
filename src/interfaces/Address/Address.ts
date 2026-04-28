// Single Address
export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
export interface AddAddressBody{
   name: string;
  details: string;
  phone: string;
  city: string;
}
export interface ShippingAddressRequest {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
}