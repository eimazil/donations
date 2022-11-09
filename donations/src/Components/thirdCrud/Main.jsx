import ThirdContext from "../../Contexts/ThirdContext";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [ideas, setIdeas] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  // const reList = (data) => {
  //   const d = new Map();
  //   data.forEach((line) => {
  //     if (d.has(line.title)) {
  //       d.set(line.title, [...d.get(line.title), line]);
  //     } else {
  //       d.set(line.title, [line]);
  //     }
  //   });
  //   return [...d];
  // };

  // READ for list
  useEffect(() => {
    axios.get("http://localhost:3003/admin/ideas", authConfig()).then((res) => {
      setIdeas(res.data);
    });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/admin/ideas/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/admin/ideas/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <ThirdContext.Provider
      value={{
        ideas,
        setEditData,
        setDeleteData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </ThirdContext.Provider>
  );
}

export default Main;
