import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../../context/expenses";
const Invoices = () => {
  const { expenses, getAllExpOrInc } = useContext(ExpenseContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "date_month",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {params.row.date_month + "-" + params.row.date_year}
        </Typography>
      ),
    },
    {
      field: "product.product_name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Typography>{params.row.product.product_name}</Typography>
      ),
      cellClassName: "name-column--cell",
    },
    {
      field: "product.product_type",
      headerName: "Product Type",
      flex: 1,
      renderCell: (params) => (
        <Typography>{params.row.product.product_type}</Typography>
      ),
    },
    {
      field: "amount",
      headerName: "amount",
      flex: 1,
    },

    {
      headerName: "Total Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "red" }}>
          ${params.row.amount * params.row.product.product_cost}
        </Typography>
      ),
    },
    {
      field: "amountPrice",
      headerName: "Futer Profit",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "green" }}>
          ${params.row.amountPrice}
        </Typography>
      ),
    },
  ];
  useEffect(() => {
    getAllExpOrInc();
  }, []);
  return (
    <Box m="20px">
      {console.log(expenses)}
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={expenses}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
