import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Pie from "./scenes/pie/index";
import PieChart from "./components/PieChart";
import IncomingProvider from "./context/incoming";
import UserProvider from "./context/user";
import HairCutsProvider from "./context/hairCuts";
import BarberProvider from "./context/barbers";
import RoleProvider from "./context/role";
import ExpenseProvider from "./context/expenses";
import ProductProvider from "./context/product";
import PagenationProvider from "./context/pagenation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoleProvider>
        <BarberProvider>
          <PagenationProvider>
            <UserProvider>
              <HairCutsProvider>
                <ProductProvider>
                  <ExpenseProvider>
                    <IncomingProvider>
                      <App />
                    </IncomingProvider>
                  </ExpenseProvider>
                </ProductProvider>
              </HairCutsProvider>
            </UserProvider>
          </PagenationProvider>
        </BarberProvider>
      </RoleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
