import React from "react";
import { useState, useContext } from "react";
import { ProductContext } from "../../context/product";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import Header from "../../components/Header";

const Form = () => {
  const { addNewProduct, getAllProducts } = useContext(ProductContext);
  const [productT, setproductT] = useState("");
  const [price, setprice] = useState("");
  const [cost, setcost] = useState("");
  const [description, setdescription] = useState("");
  const [name, setname] = useState("");
  const productsType = [
    {
      value: "haircuts",
      label: "haircuts",
    },
    {
      value: "cosmetics",
      label: "cosmetics",
    },
    {
      value: "logistics",
      label: "logistics",
    },
    {
      value: "salary",
      label: "salary",
    },
    {
      value: "other",
      label: "other",
    },
  ];

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New Product" />

      <Box
        component="form"
        sx={{ m: 10 }}
        noValidate
        autoComplete="off"
        onSubmit={() =>
          addNewProduct({
            product_name: name,
            product_price: price,
            product_cost: cost,
            product_description: description,
            product_type: productT,
          })
        }
      >
        <div>
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Name"
            sx={{ mr: 2 }}
            onChange={(e) => setname(e.target.value)}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="haircuts"
            helperText="select your product type"
            onChange={(e) => setproductT(e.target.value)}
          >
            {productsType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <OutlinedInput
          type="number"
          id="outlined-adornment-weight"
          endAdornment={<InputAdornment position="end">₪</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "price",
          }}
          defaultValue={0}
          onChange={(e) => setprice(e.target.value)}
        />
        <FormHelperText id="outlined-weight-helper-text">price</FormHelperText>
        <OutlinedInput
          type="number"
          id="outlined-adornment-weight"
          endAdornment={<InputAdornment position="end">₪</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "cost",
          }}
          defaultValue={0}
          onChange={(e) => setcost(e.target.value)}
        />
        <FormHelperText id="outlined-weight-helper-text">cost</FormHelperText>
        <TextField
          id="outlined-multiline-static"
          label="description"
          multiline
          rows={4}
          defaultValue="..."
          onChange={(e) => setdescription(e.target.value)}
        />

        <Button type="submit" color="secondary" variant="contained">
          Create New Product
        </Button>
        {console.log(productT)}
      </Box>
    </Box>
  );
};

export default Form;
