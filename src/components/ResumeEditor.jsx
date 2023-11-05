import React, { useState } from "react";
import "./ResumeEditor.css";
export default function ResumeEditor({
  dispatch,
  editableItems,
  resume,
}) {
  const [addSkill, setSkill] = useState("");
  const [addEducation, setEducation] = useState("");
  const [addExperience, setExperience] = useState({});
  const [addExperienceInfo, setAddExperienceInfo] = useState("");
  const [addExperienceDetails, setAddExperienceDetails] = useState("");
  const [prevEditableItems, setPrevEditableItems] = useState(null);
  const newExperienceArray = Object.entries(resume.experience[0]).map(
    (item) => item.join(":- ")
  );

  if (editableItems !== prevEditableItems) {
    setPrevEditableItems(editableItems);
    if (resume.skills.find((i) => i === editableItems)) {
      setSkill(editableItems);
    } else if (resume.education.find((i) => i === editableItems)) {
      setEducation(editableItems);
    } else if (newExperienceArray.find((i) => i === editableItems)) {
      const joined = newExperienceArray.find((i) => i === editableItems);
      const split = joined.split(":- ");
      const [k, v] = split;
      setAddExperienceInfo(k)
      setAddExperienceDetails(v)
      setExperience({ [k]: v });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.className === "skills__form") {
      if (editableItems) {
        dispatch({type:"UPDATE_SKILL", playload: addSkill})
      } else {
        dispatch({type:"ADD_SKILL", playload: addSkill})
      }
      setSkill("");
      setPrevEditableItems(null);
    } else if (e.target.className === "Education__form") {
      if (editableItems) {
        dispatch({type:"UPDATE_EDUCATION", playload: addEducation})
      } else {
        dispatch({type:"ADD_EDUCATION", playload: addEducation})
      }
      setEducation("");
      setPrevEditableItems(null);
    } else if (e.target.className === "Experience__form") {
      if (addExperienceInfo && addExperienceDetails) {
        if (editableItems) {
          dispatch({type:"UPDATE_EXPERIENCE", playload: addExperience})
        } else {
          dispatch({type:"ADD_EXPERIENCE", playload: addExperience})
        }
        setAddExperienceInfo("");
        setAddExperienceDetails("");
      } else {
        alert(
          "Please fill both Add Experience Info and Add Experience Details"
        );
      }
      
    }
  }
  function handleOnChange(e) {
    if (e.target.name === "skill") {
      setSkill(e.target.value);
    } else if (e.target.name === "education") {
      setEducation(e.target.value);
    } else if (e.target.name === "experienceInfo") {
      setAddExperienceInfo(e.target.value);
    } else if (e.target.name === "experienceDetails") {
      setAddExperienceDetails(e.target.value);
    }
    setExperience({ [addExperienceInfo]: addExperienceDetails });
  }
  return (
    <>
      <form className="skills__form" onSubmit={handleSubmit}>
        <input
          name="skill"
          onChange={handleOnChange}
          value={addSkill}
          type="text"
          placeholder="Add Skills"
        />
        <button>{resume.skills.find((i) => i === editableItems) ? "Edit" : "Add"} Skill</button>
      </form>
      <form className="Education__form" onSubmit={handleSubmit}>
        <input
          name="education"
          onChange={handleOnChange}
          value={addEducation}
          type="text"
          placeholder="Add Education"
        />
        <button>{resume.education.find((i) => i === editableItems) ? "Edit" : "Add"} Education</button>
      </form>
      <form className="Experience__form" onSubmit={handleSubmit}>
        <input
          name="experienceInfo"
          onChange={handleOnChange}
          type="text"
          placeholder="Add Experience Info"
          value={addExperienceInfo}
        />
        <input
          name="experienceDetails"
          onChange={handleOnChange}
          type="text"
          placeholder="Add Experience Details"
          value={addExperienceDetails}
        />
        <button>{newExperienceArray.find((i) => i === editableItems) ? "Edit" : "Add"} Experience</button>
      </form>
    </>
  );
}
