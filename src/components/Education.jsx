import "./style.css";

function Education({ education, dispatch, editItems }) {
  const newArray = education.slice(0, 10);

  return (
    <>
      <div className="box">
        <h3>Education</h3>
        {newArray.length >= 1 ? (
          <ol className="items">
            {newArray.map((item) => {
              return (
                <li className="item" key={item}>
                  {item} <button onClick={() => dispatch({type: "DELETE_EDUCATION", playload:item})}>X</button>{" "}
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

export default Education;
