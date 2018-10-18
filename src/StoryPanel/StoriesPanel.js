import React, { Component } from "react";
import PropTypes from "prop-types";
import Story from "./Story";

class StoriesPanel extends Component {
    render() {
        const { stories, chooseStory } = this.props;

        return (
            <div>
                Select a story :
                {stories.map((s, index) => {
                    return (
                        <Story
                            key={`${s.name}-${index}`}
                            chooseStory={chooseStory}
                            index={index}
                            name={s.name}
                        />
                    );
                })}
            </div>
        );
    }
}

StoriesPanel.propTypes = {
    stories: PropTypes.array.isRequired,
    chooseStory: PropTypes.func.isRequired,
};

export default StoriesPanel;
