import { useState, useContext } from "react";
import FirstContext from "../../Contexts/FirstContext";
import DataContext from "../../Contexts/DataContext";

function Line({ idea }) {
  const [name, setName] = useState("");
  const [donation, setDonation] = useState("");

  const { setCreateDonation } = useContext(FirstContext);
  const { makeMsg } = useContext(DataContext);

  const add = () => {
    if (name.length === 0) {
      makeMsg("Add name", "error");
      return;
    }
    if (name.length > 50) {
      makeMsg("Name is too long", "error");
      return;
    }
    if (donation.length === 0) {
      makeMsg("Add donation amount", "error");
      return;
    }
    if (donation > idea[1][0].left_to_reach) {
      makeMsg(
        "Donation amount exceeds remaining goal, please add lower sum",
        "error"
      );
      return;
    }
    setCreateDonation({
      name,
      donation: parseInt(donation),
      idea_id: idea[1][0].id,
    });
    setName("");
    setDonation("");
  };

  return (
    <li
      style={{
        border:
          idea[1][0].goal - idea[1][0].current_balance <= 0
            ? "2px solid green"
            : "none",
      }}
      className="list-group-item"
    >
      <div className="line__content align-center gap-50px">
        <div>
          <h4 className="idea-title">{idea[1][0].title}</h4>
          {idea[1][0].image ? (
            <div className="width-300px ">
              <img
                className="width-300px "
                src={idea[1][0].image}
                alt={idea[1][0].title}
              />
            </div>
          ) : (
            <span className="no-image">No Image</span>
          )}
        </div>
        <div className="flex-column">
          <p>{idea[1][0].description}</p>
          <span>Fundraiser goal: {idea[1][0].goal} Eur</span>
          <span>Currently raised: {idea[1][0].current_balance} Eur</span>
          <span>Left to reach: {idea[1][0].left_to_reach} Eur </span>
        </div>
      </div>
      <div className="comments">
        <ul className="list-group">
          <h5>Donations</h5>
          {idea[1]?.map((i) => (
            <li key={i.did} className="list-group-item flex-row gap-5px">
              <div>{i.name}</div>
              <div>
                {i.donation}
                {i.donation > 0 ? "Eur" : "No donations yet"}
              </div>
            </li>
          ))}
        </ul>

        <div
          style={{
            display:
              idea[1][0].goal - idea[1][0].current_balance <= 0
                ? "none"
                : "block",
          }}
          className="mb-3 flex-column"
        >
          <div className="flex-column margin-bottom-10px">
            <h5>Donate</h5>
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label className="form-label">Amount to donate</label>
            <input
              value={donation}
              onChange={(e) => setDonation(Number(e.target.value))}
              type="number"
            />
          </div>
          <button
            style={{
              display:
                idea[1][0].goal - idea[1][0].current_balance <= 0
                  ? "none"
                  : "block",
            }}
            onClick={add}
            type="button"
            className="btn btn-outline-success"
          >
            Donate
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
