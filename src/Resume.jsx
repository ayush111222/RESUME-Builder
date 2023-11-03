import "./Resume.css";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import PrintButton from "./components/PrintButton";
import ResumeEditor from "./components/ResumeEditor";
import { useState } from "react";

function Resume() {
  const [resume, setResume] = useState({
    skills: ["javaScript", "react js", "node js"],
    education: [
      "Wilton High School",
      "Silvermine School of Arts",
      "Codeacademy",
    ],
    experience: [{ year: 2012, company: "google", role: "something" }],
  });
  const [editableItems, setEditableItems] = useState(null);

  function addResume(addSkill, addEducation, addExperience) {
    if (addSkill) {
      setResume({
        ...resume,
        skills: [...resume.skills, addSkill],
      });
    } else if (addEducation) {
      setResume({
        ...resume,
        education: [...resume.education, addEducation],
      });
    } else if (addExperience) {
      setResume({
        ...resume,
        experience: [Object.assign(...resume.experience, addExperience)],
      });
    }
  }

  function deleteItems(item) {
    const newSkills = resume.skills.filter((i) => i !== item);
    const newEducation = resume.education.filter((i) => i !== item);
    const newExperienceArray = Object.entries(resume.experience[0]).map(
      (item) => item.join(":- ")
    );
    const newExperience = newExperienceArray.filter((i) => i !== item);
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
    setResume({
      ...resume,
      skills: newSkills,
      education: newEducation,
      experience: [newExperienceObject],
    });
  }
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
  function updateResume(item) {
    
    let updatedResume = { ...resume };
    const newExperienceArray = Object.entries(resume.experience[0]).map(
      (item) => item.join(":- ")
    );
    const item2 = Object.entries(item).map(
      (item) => item.join(":- ")
    );
    const itemToString = item2.toString()
    if (resume.skills.find((i) => i === editableItems)) {
      const index = resume.skills.findIndex((i) => i === editableItems);
      updatedResume.skills.splice(index, 1, item);
    } else if (resume.education.find((i) => i === editableItems)) {
      const index = resume.education.findIndex((i) => i === editableItems);
      updatedResume.education.splice(index, 1, item);
    }else if (newExperienceArray.find((i) => i === editableItems)) {
      const index = newExperienceArray.findIndex((i) => i === editableItems);
      newExperienceArray.splice(index, 1, itemToString);
      const split = newExperienceArray.map(i=>i.split(":- "))
      updatedResume = {
        ...updatedResume,
        experience: [Object.fromEntries(split)],
      }
    }
    setResume(updatedResume);
    setEditableItems(null);
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
            addResume={addResume}
            editableItems={editableItems}
            updateResume={updateResume}
          ></ResumeEditor>
        </div>
        <div className="resume__box">
          <Skills
            deleteItems={deleteItems}
            skills={resume.skills}
            editItems={editItems}
          ></Skills>
          <Education
            deleteItems={deleteItems}
            education={resume.education}
            editItems={editItems}
          ></Education>
          <Experience
            deleteItems={deleteItems}
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
