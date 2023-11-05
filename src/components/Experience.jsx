import "./style.css";

function Experience({ experience, dispatch, editItems }) {
  const newArray = experience.slice(0, 10);

  return (
    <>
      <div className="box">
        <h3>Experience</h3>
        {newArray.length >= 1 ? (
          <ol className="items">
            {newArray.map((item) => {
              let joined = item.join(":- ");
              return (
                <li className="item" key={item}>
                  {joined}{" "}
                  <button onClick={() => dispatch({type: "DELETE_EXPERIENCE", playload: joined})}>X</button>{" "}
                  <button onClick={() => editItems(joined)}>edit</button>
                </li>
              );
            })}
          </ol>
        ) : (
          <span>Add Experience From Input.</span>
        )}
      </div>
    </>
  );
}

export default Experience;
