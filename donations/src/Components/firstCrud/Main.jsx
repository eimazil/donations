import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import FirstContext from "../../Contexts/FirstContext";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [ideas, setIdeas] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createDonation, setCreateDonation] = useState(null);

  const reList = (data) => {
    const d = new Map();
    data.forEach((line) => {
      if (d.has(line.title)) {
        d.set(line.title, [...d.get(line.title), line]);
      } else {
        d.set(line.title, [line]);
      }
    });
    return [...d];
  };

  // READ for list
  useEffect(() => {
    axios.get("http://localhost:3003/home/ideas", authConfig()).then((res) => {
      console.log(reList(res.data));
      setIdeas(reList(res.data));
    });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createDonation) {
      return;
    }
    axios
      .post(
        "http://localhost:3003/home/donations/" + createDonation.idea_id,
        createDonation,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createDonation]);

  useEffect(() => {
    if (null === createDonation) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/sum/" + createDonation.idea_id,
        createDonation,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createDonation]);

  return (
    <FirstContext.Provider
      value={{
        ideas,
        setCreateDonation,
      }}
    >
      <div className="container suppliers">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FirstContext.Provider>
  );
}
export default Main;
