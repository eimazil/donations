import { useContext } from "react";
import ThirdContext from "../../Contexts/ThirdContext";

function Line({ idea }) {
  const { setEditData, setDeleteData } = useContext(ThirdContext);

  return (
    <li className="list-group-item">
      <div className="line__content">
        <div className="col-12 col-lg-3 margin-right-30px">
          <h5>{idea.title}</h5>
          {idea.image ? (
            <img
              className="col-12"
              src={idea.image}
              alt={`${idea.title} crest`}
            ></img>
          ) : (
            <span className="no-image">No image</span>
          )}
        </div>
        <div className="col-12 col-lg-8 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between">
          <div>
            <div>{idea.description}</div>
            <div>Campaign goal: {idea.goal}</div>
          </div>
          <div className="d-flex flex-row flex-lg-column gap-5px ">
            <button
              style={{ display: idea.state === 1 ? "none" : "block" }}
              onClick={() => setEditData({ state: 1, id: idea.id })}
              type="button"
              className="btn btn-outline-success"
            >
              Accept
            </button>
            <button
              onClick={() => setDeleteData(idea)}
              type="button"
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
