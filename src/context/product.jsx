import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

function ProductProvider(props) {
  const { children } = props;
  const url = "https://final-project-server-dbar.onrender.com/api/v1/product";
  const [products, setproducts] = useState([]);
  const [salaryProducts, setsalaryProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const product = (await axios.get(url)).data;

      //array of all the photos
      setproducts(product);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const getAllProductsofsalary = async () => {
    try {
      const product = (
        await axios.get(
          url+"/getAllProductsofsalary"
        )
      ).data;

      //array of all the photos
      setsalaryProducts(product);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const addNewProduct = async (productObj) => {
    try {
      const product = await axios.post(url, productObj);

      setproducts([...products, product.data]);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <ProductContext.Provider
        value={{
          addNewProduct,
          getAllProducts,
          products,
          getAllProductsofsalary,
          salaryProducts,
        }}
      >
        {children}
      </ProductContext.Provider>
    </div>
  );
}

export default ProductProvider;
