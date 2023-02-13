import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/users";
import Bar from "./scenes/bar";
import Form from "./scenes/AddProduct";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Calendar from "./scenes/calendar/calendar";
import AddExpenses from "./scenes/AddExpenses/index";
import AddSalary from "./scenes/AddSalary";
import AddBarberForm from "./scenes/AddBarber";
import { useContext } from "react";
import { PagenationContext } from "./context/pagenation";
import { BarbersContext } from "./context/barbers";
import LogIn from "./components/logIn";
import jwt_decode from "jwt-decode";

function App() {

  const {page,setPage}=useContext(PagenationContext);

  const {getbarberById}=useContext(BarbersContext);
 
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
   
    if(localStorage.getItem('token')){
    setPage('app');
    getbarberById(jwt_decode(localStorage.getItem('token'))._id)
    }

  }, [])
  

  return (
    <>
      {page==='log in'?
      <LogIn/>
      :
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/AddExpenses" element={<AddExpenses />} />
              <Route path="/AddSalary" element={<AddSalary />} />
              <Route path="/AddBarberForm" element={<AddBarberForm />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
}
      </>  
  );
}

export default App;
