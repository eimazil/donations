import { useState } from "react";
import { useContext } from "react";
import AdminIdeas from "../../Contexts/AdminIdeas";
import Line from "./Line";

// const sortData = [
//   { v: "default", t: "Default" },
//   { v: "price_asc", t: "Price 1-9" },
//   { v: "price_desc", t: "Price 9-1" },
//   { v: "rate_asc", t: "Rating 1-9" },
//   { v: "rate_desc", t: "Rating 9-1" },
// ];

function List() {
  const { ideas } = useContext(AdminIdeas);

  const [stateFilter, setStateFilter] = useState(0);

  // const [sortBy, setSortBy] = useState("default");
  // const [stats, setStats] = useState({ clothesCount: null });

  // useEffect(() => {
  //   if (null === clothes) {
  //     return;
  //   }
  //   setStats((s) => ({ ...s, movieCount: clothes.length }));
  // }, [clothes]);

  //   useEffect(() => {
  //     switch (sortBy) {
  //       case "price_asc":
  //         setMovies((m) => [...m].sort((a, b) => a[1][0].price - b[1][0].price));
  //         break;
  //       case "price_desc":
  //         setMovies((m) => [...m].sort((b, a) => a[1][0].price - b[1][0].price));
  //         break;
  //       case "rate_asc":
  //         setMovies((m) =>
  //           [...m].sort((x, c) => x[1][0].rating - c[1][0].rating)
  //         );
  //         break;
  //       case "rate_desc":
  //         setMovies((m) =>
  //           [...m].sort((jo, no) => no[1][0].rating - jo[1][0].rating)
  //         );
  //         break;
  //       default:
  //         setMovies((m) =>
  //           [...(m ?? [])].sort((a, b) => a[1][0].row - b[1][0].row)
  //         );
  //     }
  //   }, [sortBy, setMovies]);

  return (
    <>
      <div className="card m-4">
        {/* <h5 className="card-header">Ideas ({ideas.suggestionsCount})</h5> */}
        <div className="card-body">
          <div className="filter-box">
            <label className="form-label">Filter ideas</label>
            <select
              className="form-select"
              onChange={(e) => setStateFilter(Number(e.target.value))}
            >
              <option value={0}>Unconfirmed</option>
              <option value={1}>Confirmed</option>
            </select>
          </div>
          <div className="filters-container">
            <div className="card-body">
              <ul className="list-group">
                {ideas?.map((s) =>
                  s.state === stateFilter ? <Line key={s.id} idea={s} /> : null
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
