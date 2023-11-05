import "./Resume.css";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import PrintButton from "./components/PrintButton";
import ResumeEditor from "./components/ResumeEditor";
import { useReducer, useState } from "react";
const intialState = {
  skills: ["javaScript", "react js", "node js"],
  education: ["Wilton High School", "Silvermine School of Arts", "Codeacademy"],
  experience: [{ year: 2012, company: "google", role: "something" }],
};
function Resume() {
  const [editableItems, setEditableItems] = useState(null);

  function resumeReducer(state, action) {
    let updatedResume = { ...state };
    const newExperienceArray = Object.entries(state.experience[0]).map((item) =>
      item.join(":- ")
    );
    switch (action.type) {
      case "ADD_SKILL": {
        return {
          ...state,
          skills: [...state.skills, action.playload],
        };
      }

      case "ADD_EDUCATION": {
        return {
          ...state,
          education: [...state.education, action.playload],
        };
      }

      case "ADD_EXPERIENCE": {
        return {
          ...state,
          experience: [Object.assign(...state.experience, action.playload)],
        };
      }

      case "DELETE_SKILL": {
        const newSkills = state.skills.filter((i) => i !== action.playload);
        return {
          ...state,
          skills: newSkills,
        };
      }

      case "DELETE_EDUCATION": {
        const newEducation = state.education.filter(
          (i) => i !== action.playload
        );
        return {
          ...state,
          education: newEducation,
        };
      }

      case "DELETE_EXPERIENCE": {
        const newExperience = newExperienceArray.filter(
          (i) => i !== action.playload
        );
        const newExperienceArraySplited = newExperience.map((item) =>
          item.split(":- ")
        );
        const newExperienceObject = newExperienceArraySplited.reduce(
          (obj, [key, value]) => {
            obj[key] = value;
            return obj;
          },
          {}
        );
        return {
          ...state,
          experience: [newExperienceObject],
        };
      }

      case "UPDATE_SKILL": {
        if (state.skills.find((i) => i === editableItems)) {
          const index = state.skills.findIndex((i) => i === editableItems);
          updatedResume.skills.splice(index, 1, action.playload);
        }
        setEditableItems(null);
        return updatedResume;
      }

      case "UPDATE_EDUCATION": {
        if (state.education.find((i) => i === editableItems)) {
          const index = state.education.findIndex((i) => i === editableItems);
          updatedResume.education.splice(index, 1, action.playload);
        }
        setEditableItems(null);
        return updatedResume;
      }

      case "UPDATE_EXPERIENCE": {
        if (newExperienceArray.find((i) => i === editableItems)) {
          const item2 = Object.entries(action.playload).map((item) =>
            item.join(":- ")
          );
          const itemToString = item2.toString();
          const index = newExperienceArray.findIndex(
            (i) => i === editableItems
          );
          newExperienceArray.splice(index, 1, itemToString);
          const split = newExperienceArray.map((i) => i.split(":- "));
          updatedResume = {
            ...updatedResume,
            experience: [Object.fromEntries(split)],
          };
        }
        setEditableItems(null);
        return updatedResume;
      }
     
      default: {
        return state;
      }
    }
  }

  const [resume, dispatch] = useReducer(resumeReducer, intialState);
  
  function editItems(item) {
    const newExperienceArray = Object.entries(resume.experience[0]).map(
      (item) => item.join(":- ")
    );  
    if (resume.skills.find((i) => i === item)) {
      setEditableItems(resume.skills.find((i) => i === item));
    } else if (resume.education.find((i) => i === item)) {
      setEditableItems(resume.education.find((i) => i === item));
    } else if (newExperienceArray.find((i) => i === item)) {
      setEditableItems(newExperienceArray.find((i) => i === item));
    }
  }

  return (
    <>
      <div className={`container`}>
        <div className="heading">
          <h1>Resume</h1>
          <h2>Ayush</h2>
        </div>
        <div className="resume__form__container">
          <ResumeEditor
            resume={resume}
            dispatch={dispatch}
            editableItems={editableItems}
          ></ResumeEditor>
        </div>
        <div className="resume__box">
          <Skills
            dispatch={dispatch}
            skills={resume.skills}
            editItems={editItems}
          ></Skills>
          <Education
            dispatch={dispatch}
            education={resume.education}
            editItems={editItems}
          ></Education>
          <Experience
            dispatch={dispatch}
            experience={Object.entries(resume.experience[0])}
            editItems={editItems}
          ></Experience>
        </div>
        <PrintButton></PrintButton>
      </div>
    </>
  );
}

export default Resume;
