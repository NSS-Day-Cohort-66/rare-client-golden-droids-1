import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [staff, setStaffState] = useState(false);

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  const setStaff = (boolean) => {
    setStaffState(boolean);
  };

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <ApplicationViews
        token={token}
        setToken={setToken}
        staff={staff}
        setStaff={setStaff}
      />
    </>
  );
};
