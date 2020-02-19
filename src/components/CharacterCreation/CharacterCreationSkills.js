import React  from "react";
import { useCharacterContext } from "../../contexts/characterContext";

const CharacterCreationSkills = () => {
  const { skills, onChangeSkills, addSkill, removeSkill } = useCharacterContext;

  return (
    <div>
      Skills :
      {skills.map((skill, index) => {
        return (
          <div key={`skill-${index}`}>
            <input
              type="text"
              placeholder={`Skill ${index + 1} + description if needed`}
              value={skill}
              onChange={e => {
                onChangeSkills(index, e.target.value);
              }}
            />
            <button onClick={() => removeSkill(index)}>
              Remove this skill
            </button>
          </div>
        );
      })}
      {skills.length < 6 && <button onClick={addSkill}>Add a skill</button>}
    </div>
  );
};

export default CharacterCreationSkills;
