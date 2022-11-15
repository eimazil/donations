import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import SecondContext from "../../Contexts/SecondContext";
import getBase64 from "../../Functions/getBase64";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const fileInput = useRef();

  const { setCreateData } = useContext(SecondContext);
  const { makeMsg } = useContext(DataContext);

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (title.length === 0) {
      makeMsg("Add title", "error");
      return;
    }
    if (title.length > 50) {
      makeMsg("Tittle is too long", "error");
      return;
    }
    if (description.length === 0) {
      makeMsg("Add description", "error");
      return;
    }
    if (description.length > 150) {
      makeMsg("Description", "error");
      return;
    }

    if (goal.length === 0) {
      makeMsg("Add the goal");
      return;
    }
    setCreateData({
      title,
      description,
      goal: parseFloat(goal),
      left_to_reach: parseFloat(goal),
      image: photoPrint,
    });
    setTitle("");
    setDescription("");
    setGoal("");
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Fundraise</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Fundraise title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3 d-flex flex-column">
          <label className="form-label">Add description</label>
          <textarea
            value={description}
            cols="30"
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Fundraise goal</label>
          <input
            type="number"
            className="form-control"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fundraise Image</label>
          <input
            ref={fileInput}
            type="file"
            className="form-control"
            onChange={doPhoto}
          />
        </div>
        {photoPrint ? (
          <div className="img-bin">
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
