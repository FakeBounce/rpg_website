import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
    storyBox: {
        width: 200,
        height: 200,
        border: "1px solid black",
        cursor: "pointer",
    },
    storyImage: { width: 150, height: 150 },
};

class Story extends Component {
    render() {
        const { index, name, chooseStory } = this.props;

        return (
            <div
                onClick={() => chooseStory(index)}
                style={styles.storyBox}
            >
                {name}
                <img src={"./common/dravos.jpg"} style={styles.storyImage} alt="dravos"/>
            </div>
        );
    }
}

Story.propTypes = {
    chooseStory: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default Story;
