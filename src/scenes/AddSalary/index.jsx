import React from "react";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../context/product";
import { ExpenseContext } from "./../../context/expenses";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
const AddSalary = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { getAllProductsofsalary, salaryProducts } = useContext(ProductContext);
  const { addNewExpense } = useContext(ExpenseContext);
  const [productIdChose, setproductIdChose] = useState("");
  const [productprice, setproductprice] = useState("");
  const [amountOfProducts, setamountOfProducts] = useState("");
  const [chosenMonth, setchosenMonth] = useState(months[month]);
  useEffect(() => {
    getAllProductsofsalary();
  }, []);
  const handleProductChange = (e) => {
    const selectedProduct = salaryProducts.find(
      (product) => product.product_name === e.target.value
    );
    console.log(selectedProduct);
    setproductIdChose(selectedProduct._id);
    setproductprice(selectedProduct.product_cost);
  };

  return (
    <div>
      <h1>ADD EXPENSES</h1>
      {console.log(salaryProducts)}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40vw",
          gap: "3vh",
          margin: "3vh",
        }}
        onSubmit={() => {
          addNewExpense({
            product: productIdChose,
            date_month: chosenMonth,
            date_year: year,
            amount: 1,
            amountPrice: productprice,
          });
        }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Product Select"
          defaultValue="haircuts"
          helperText="select your product"
          onChange={handleProductChange}
        >
          {salaryProducts.map((product) => (
            <MenuItem key={product._id} value={product.product_name}>
              {product.product_name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="month"
          select
          label="Month Select"
          defaultValue={months[month]}
          helperText="select your product"
          onChange={(e) => {
            setchosenMonth(e.target.value);
          }}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit"
        color="secondary"
        variant="contained" >submit</Button>
      </form>
    </div>
  );
};

export default AddSalary;
