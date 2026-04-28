import { Address } from "./Address";

export interface AddAddressResponse {
  results?: number;
  status: 'success' | 'fail';
  message: string;
  data: Address[];
}

export type AddressPayload = {
  name: string;
  details: string;
  phone: string;
  city: string;
};