import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const RoleContext = createContext();

function RoleProvider(props) {
  const { children } = props;

  useEffect(() => {
    if (localStorage.getItem("token"))
      setRole(jwtDecode(localStorage.getItem("token")).role);
  }, []);

  const [role, setRole] = useState("");

  return (
    <>
      <RoleContext.Provider value={{ role, setRole }}>
        {children}
      </RoleContext.Provider>
    </>
  );
}

export default RoleProvider;
