import { useContext, useEffect, useState } from "react";
import Home from "../../Contexts/Home";
import Line from "./Line";

function List() {
  const { ideas } = useContext(Home);

  // useEffect(() => {
  //   if (movies === null) {
  //     return;
  //   }
  //   setStats((s) => ({ ...s, movieCount: movies.length }));
  // }, [movies]);

  return (
    <div className="card m-4">
      <div className="card-body">
        <ul className="list-group">
          {ideas?.map((i) =>
            i[1][0].state === 1 ? <Line key={i[1][0].id} idea={i} /> : null
          )}
        </ul>
      </div>
    </div>
  );
}

export default List;
