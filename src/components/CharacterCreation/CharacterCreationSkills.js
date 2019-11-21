import React, { Component } from "react";
import PropTypes from "prop-types";

class CharacterCreationSkills extends Component {
  render() {
    const { skills, onChangeSkills, addSkill, removeSkill } = this.props;

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
  }
}

CharacterCreationSkills.propTypes = {
  skills: PropTypes.array.isRequired,
  onChangeSkills: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
};

export default CharacterCreationSkills;
