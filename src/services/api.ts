/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddToCartResponse } from "@/interfaces/cart/AddToCartResponse";
import { Product } from "@/interfaces/Product";
import { ResponseType } from "@/types/ResponseType";
import { SignInResponse } from "@/types/SignInResponse";
import { AddAddressResponse, AddressPayload } from "@/interfaces/Address/AddAddressResponse";
import { AddAddressBody, Address, ShippingAddressRequest } from "@/interfaces/Address/Address";
import { Order } from "@/interfaces/myOrders/Order";
import { Category } from "@/interfaces/Category";
import { Subcategory } from "@/interfaces/Subcategory";
import { Brand } from "@/interfaces/Brand";
import { getAuthToken } from "@/lib/getToken";




class ApiServices {
  #Base_URL = process.env.NEXT_PUBLIC_BASE_URL;
  
  // get all products
  async getProducts(params: Record<string, string> = {}): Promise<Product[]> {
  let url = this.#Base_URL + "/api/v1/products";

  const query = new URLSearchParams(params).toString();

  if (query) {
    url += `?${query}`;
  }

 
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const data: ResponseType<Product[]> = await response.json();

  return data.data;
}
  // products details
  async getProductsDetails(productId: string): Promise<Product> {
    const response = await fetch(
      this.#Base_URL + `/api/v1/products/${productId}`,
      {
        method: "GET",
      },
    );
    const data: ResponseType<Product> = await response.json();
    return data.data;
  }
  // add product to cart
  async addProductToCart(productid: string): Promise<AddToCartResponse> {
    const token = await getAuthToken();
    const response = await fetch(this.#Base_URL + `/api/v2/cart`, {
      method: "POST",
      body: JSON.stringify({
        productId: productid,
      }),
      headers:{
        'content-type':'application/json',
         ...(token && { token })
      }
    });
    const data = await response.json();
    return data;
  }

  // get categories
  async getCategory(): Promise<Category[]> {
    const response = await fetch(this.#Base_URL + "/api/v1/categories", {
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  }

  
  // get specific category
  async getSpecificCategory(categoryId: string): Promise<Category> {
    const response = await fetch(
      this.#Base_URL + "/api/v1/categories/" + categoryId,
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const data = await response.json();
    return data.data;
  }
  // get SubCategories
  async getSubCategory(): Promise<Subcategory[]> {
    const response = await fetch(this.#Base_URL + "/api/v1/subcategories", {
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  }
    // get brands
    async getBrands() : Promise<Brand[]>{
        const response=await fetch(this.#Base_URL+'/api/v1/brands',{
            headers:{
                'content-type':'application/json'
            }
        })
        const data =await response.json()
        return data.data
    }
    //get specific brand
    async getSpecificBrand(brandId: string): Promise<Brand> {
    const response = await fetch(
      this.#Base_URL + "/api/v1/brands/" + brandId,
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    const data = await response.json();
    return data.data;
  }
  //get Wishlist
  async getWishlist() {
    const token=await getAuthToken()
    const response = await fetch(this.#Base_URL + "/api/v1/wishlist", {
      
      headers: {
        "content-type": "application/json",
         ...(token && { token })},
    });
    const data = await response.json();
    return data;
  }
  //add to wishlist
  async AddToWishlist(productId: string) {
       const token=await getAuthToken()

    const response = await fetch(this.#Base_URL + "/api/v1/wishlist", {
      method: "POST",
      headers:{
        'content-type':'application/json',
         ...(token && { token })
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const data = await response.json();
    return data;
  }
  // Remove from wishlist
  async RemoveToWishlist(productId: string) {
        const token=await getAuthToken()

    const response = await fetch(
      this.#Base_URL + "/api/v1/wishlist/" + productId,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
           ...(token && { token })},
        body: JSON.stringify({
          productId,
        }),
      },
    );
    const data = await response.json();
    return data;
  }

  // get user cart data
  async getUserCart(): Promise<AddToCartResponse> {
    const token=await getAuthToken()
    const response = await fetch(this.#Base_URL + "/api/v2/cart", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
         ...(token && { token })
      },
    });
    const data = await response.json();
    return data;
  }
  // remove from cart
  async removeProductFromCart(productId: string): Promise<AddToCartResponse> {
        const token=await getAuthToken()

    const response = await fetch(this.#Base_URL + `/api/v2/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
         ...(token && { token })},
    });
    const data = await response.json();
    return data;
  }
  // clear user cart
  async clearUserCart(): Promise<AddToCartResponse> {
        const token=await getAuthToken()

    const res = await fetch(this.#Base_URL + "/api/v2/cart", {
      method: "delete",
      headers: {
         ...(token && { token })},
    });
    const data = await res.json();
    console.log(data, "clear items");

    return data;
  }
  // update product count
  async updateProductCount(
    productId: string,
    count: number,
  ): Promise<AddToCartResponse> {
        const token=await getAuthToken()

    const res = await fetch(this.#Base_URL + `/api/v2/cart/` + productId, {
      method: "PUT",
      body: JSON.stringify({
        count: count,
      }),
      headers: {
        "content-type": "application/json",
         ...(token && { token })},
    });
    const data = await res.json();
    console.log(data);

    return data;
  }
  //signup register
  async signUp(values:any): Promise<SignInResponse> {
    const response=await fetch(this.#Base_URL+'/api/v1/auth/signup',{
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify(values)
    })
    const data=await response.json()
    return data
  } 
  // sign in login
  async signIn(email: string, password: string): Promise<SignInResponse> {
    const response = await fetch(this.#Base_URL + `/api/v1/auth/signin`, {
      method: "POST",
      headers: {"content-type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    return data;
  }
  // get address
  async GetUserAddresses(): Promise<AddAddressResponse> {

    const token=await getAuthToken()
    const response = await fetch(this.#Base_URL + "/api/v1/addresses", {
      
      headers: {
        "content-type": "application/json",
         ...(token && { token })},
    });

    const data = await response.json();

    return data;
  }

  // Post address

  async AddAddress(values: AddAddressBody): Promise<AddAddressResponse> {
        const token=await getAuthToken()

    const response = await fetch(this.#Base_URL + "/api/v1/addresses", {
      method: "POST",
      headers:{
        'content-type':'application/json',
         ...(token && { token }),
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    return data;
  }
  //Delete address
  async deleteAddress(addressId: string) {
        const token=await getAuthToken()

    const response = await fetch(
      this.#Base_URL + `/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
           ...(token && { token })},
      },
    );
    const data = await response.json();
    return data;
  }
  //update address
  async editAddress(
    values: AddressPayload,
    addressId: string,
  ): Promise<AddAddressResponse> {
        const token=await getAuthToken()

    const response = await fetch(
      this.#Base_URL + `/api/v1/addresses/${addressId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
           ...(token && { token })},
        body: JSON.stringify(values),
      },
    );
    const data = await response.json();
    return data;
  }
  //checkout online payment
  async checkout(cartId: string, value: ShippingAddressRequest) {
        const token=await getAuthToken()

    const response = await fetch(
      this.#Base_URL +
        "/api/v1/orders/checkout-session/" +
        cartId +
        "?url=http://localhost:3000",
      {
        method: "POST",
        body: JSON.stringify(value),
        headers:{
                  'content-type':'application/json',
               ...(token && { token })

        }
      },
    );
    const data = await response.json();
    return data;
  }

  // cash on order
  async cashOnOrder(cartId: string, value: ShippingAddressRequest) {
        const token=await getAuthToken()

    const response = await fetch(
      this.#Base_URL +
        "/api/v2/orders/" +
        cartId +
        "?url=http://localhost:3000",
      {
        method: "POST",
        body: JSON.stringify(value),
        headers:{
                  'content-type':'application/json',
 ...(token && { token })
        }
      },
    );
    const data = await response.json();
    return data;
  }

  //my Orders
  async myOrders(cartOwnerId: string): Promise<Order[]> {
        const token=await getAuthToken()

    const response = await fetch(
      this.#Base_URL + "/api/v1/orders/user/" + cartOwnerId,
      {
        headers: {
          "content-type": "application/json",
           ...(token && { token })},
      },
    );
    const data = response.json();
    return data;
  }

  //get token
  async getToken() {
        const token=await getAuthToken()

    const response = await fetch(this.#Base_URL + "/api/v1/auth/verifyToken", {
      headers: {
        "content-type": "application/json",
        ...(token && { token })},
    });
    const data = response.json();
    return data;
  }
  //update profile
  async updateProfile(data: {
  name: string;
  email: string;
  phone: string;
}) {
  const token = await getAuthToken();

  const res = await fetch(
    this.#Base_URL + "/api/v1/users/updateMe/",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
       ...(token && { token }),
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}

//update logged user password
async changePassword(data: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  const token = await getAuthToken();

  const res = await fetch(
    this.#Base_URL + "/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         ...(token && { token }),
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}
// send email
async forgetPassword(email: string) {
  const res = await fetch(`${this.#Base_URL}/api/v1/auth/forgotPasswords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

// verify code
async verifyResetCode(resetCode: string) {
  const res = await fetch(`${this.#Base_URL}/api/v1/auth/verifyResetCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetCode }),
  });
  return res.json();
}
async resetPassword(email: string, newPassword: string) {
  const res = await fetch(
    `${this.#Base_URL}/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        newPassword,
      }),
    }
  );

  return res.json();
}
}

const apiServices = new ApiServices();
export default apiServices;
