import React, { createContext, useState, useEffect } from "react";

export const PagenationContext = createContext();

function PagenationProvider(props) {

  useEffect(() => {
    if(localStorage.getItem('token'))
      setDis('')
  }, [])
  

    const { children } = props;

    const [page,setPage]=useState('home');
    const [userProfileDis,setUserProfileDis]=useState('none');
    const [mustLogDis,setMustLogIn]=useState('none');
    const [barCantDis,setBarCantDis]=useState('none');
    const [addPhotoDis,setAddPhotoDis]=useState('none');
    const [scissorsLoadingDis,setScissorsLoadingDis]=useState('none');
    const [pickPhotoDis,setPickPhotoDis]=useState('none')
    const [addDescDis,setAddDescDis]=useState('none')
    const [dis,setDis]=useState('');

  return (
    <>
      <PagenationContext.Provider value={{page,setPage,userProfileDis,setUserProfileDis,mustLogDis,setMustLogIn,barCantDis,setBarCantDis, addPhotoDis,setAddPhotoDis,dis,setDis,scissorsLoadingDis,setScissorsLoadingDis,pickPhotoDis,setPickPhotoDis,addDescDis,setAddDescDis}}>
        {children}
      </PagenationContext.Provider>
    </>
  );
}

export default PagenationProvider;
