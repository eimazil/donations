import { useState, useEffect } from "react";
import Ideas from "../../Contexts/Ideas";
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
    <Ideas.Provider
      value={{
        setCreateData,
      }}
    >
      <div className="container">
        <div className="row justify-center">
          <div className=" col-lg-4">{<Create />}</div>
        </div>
      </div>
    </Ideas.Provider>
  );
}
export default Main;
