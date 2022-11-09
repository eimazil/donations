import { useContext } from "react";
import ThirdContext from "../../Contexts/ThirdContext";

function Line({ idea }) {
  const { setEditData, setDeleteData } = useContext(ThirdContext);

  return (
    <li className="list-group-item">
      <div className="line__content">
        <div className="width-300px margin-right-30px">
          <h4>{idea.title}</h4>
          {idea.image ? (
            <img
              className="width-200px"
              src={idea.image}
              alt={`${idea.title} crest`}
            ></img>
          ) : (
            <span className="no-image">No image</span>
          )}
        </div>
        <div className="text-container">
          <div>
            <div>{idea.description}</div>
            <div>Campaign goal: {idea.goal}</div>
          </div>
          <div className="line__buttons">
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
