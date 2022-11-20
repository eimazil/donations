import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowNav from "./Functions/showNav";
import RequireAuth from "./Functions/requireAuth";
import { useState, useCallback } from "react";
import DataContext from "./Contexts/DataContext";
import { v4 as uuidv4 } from "uuid";
import Messages from "./Components/Messages";

// Main screen imports
import FirstCrud from "./Components/firstCrud/Main";
import SecondCrud from "./Components/secondCrud/Main";
import ThirdCrud from "./Components/thirdCrud/Main";

// Logins
import LoginPage from "./Components/logins/loginPage";
import LogoutPage from "./Components/logins/logoutPage";

function App() {
  const [roleChange, setRoleChange] = useState(Date.now());

  const [msgs, setMsgs] = useState([]);

  const makeMsg = useCallback((text) => {
    const msg = {
      id: uuidv4(),
      text,
    };
    setMsgs((m) => [...m, msg]);
    setTimeout(() => {
      setMsgs((m) => m.filter((mes) => mes.id !== msg.id));
    }, 4000);
  }, []);

  return (
    <DataContext.Provider
      value={{
        msgs,
        setMsgs,
        makeMsg,
      }}
    >
      <BrowserRouter>
        <ShowNav roleChange={roleChange} />
        <Messages />
        <Routes>
          <Route path="/" element={<FirstCrud />}></Route>
          <Route path="/secondLink" element={<SecondCrud />}></Route>
          <Route
            path="/thirdLink"
            element={<RequireAuth role="admin">{<ThirdCrud />}</RequireAuth>}
          ></Route>
          <Route
            path="/login"
            element={<LoginPage setRoleChange={setRoleChange} />}
          />
          <Route
            path="/logout"
            element={<LogoutPage setRoleChange={setRoleChange} />}
          />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
