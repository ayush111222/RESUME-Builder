import "./style.css";
function Skills({ skills, dispatch, editItems}) {
  const newArray = skills.slice(0, 10);
  return (
    <>
      <div className="box">
        <h3>Skills</h3>
        {newArray.length >= 1 ? (
          <ol className="items">
            {newArray.map((item) => {
              return (
                <li className="item" key={item}>
                  {item} <button onClick={() => dispatch({type: "DELETE_SKILL", playload:item})}>X</button>{" "}
                  <button onClick={() => editItems(item)}>edit</button>
                </li>
              );
            })}
          </ol>
        ) : (
          <span>Add Education From Input.</span>
        )}
      </div>
    </>
  );
}

export default Skills;
