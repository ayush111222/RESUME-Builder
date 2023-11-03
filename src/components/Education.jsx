import "./style.css";

function Education({ education, deleteItems, editItems }) {
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
                  {item} <button onClick={() => deleteItems(item)}>X</button>{" "}
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
