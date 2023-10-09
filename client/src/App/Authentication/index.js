import React, { useState } from "react";
// Load module
import Login from './Login/Login';
import Register from './Register/Register';

// Authentication
const Authentication = () => {
  // ActivePages
  const [ActivePage, setActivePage] = useState({
    loginPage: true,
    registerPage: false,
  })
  // Triggers
  const activeLogin = () => {
    setActivePage({ loginPage: true, registerPage: false })
  }
  const activeRegister = () => {
    setActivePage({ loginPage: false, registerPage: true})
  }

  // Display Pages
  let DisplayPage;
  if (ActivePage.loginPage === true) {
    DisplayPage = <Login activeRegister={activeRegister} />
  } else if (ActivePage.registerPage === true) {
    DisplayPage = <Register activeLogin={activeLogin} />
  } else {
    DisplayPage = <Login activeRegister={activeRegister} />
  }
  // Render
  return (<div className="user-info">{DisplayPage}</div>);
};
// Export
export default Authentication;