import { useState, useEffect } from "react";
import SecondContext from "../../Contexts/SecondContext";
import Create from "./Create";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [createData, setCreateData] = useState(null);

  // READ for list

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/user/create", createData, authConfig())
      .then((res) => {});
  }, [createData]);

  return (
    <SecondContext.Provider
      value={{
        setCreateData,
      }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className=" col-lg-4">{<Create />}</div>
        </div>
      </div>
    </SecondContext.Provider>
  );
}
export default Main;
