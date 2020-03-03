import React from "react";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";
import { widthLeft } from "../Utils/StyleConstants";
import PropTypes from "prop-types";

const styledImageContainer = {
  width: `${widthLeft / 4}px`,
  height: `${(widthLeft / 4) * 1.388}px`,
  display: "block",
  backgroundImage: "url(./quests/empty_notice.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 35,
};

const styledFormResultContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
  paddingBottom: 50,
};

const styledFormResultFirstItem = {
  fontSize: 20,
  marginBottom: 20,
  color: "black",
  textAlign: "center",
};

const styledFormResultItem = {
  marginBottom: 20,
  color: "black",
  textAlign: "center",
};

class SpellGeneratorPanelResult extends Component {
  render() {
    const { generatedSpell } = this.props;

    return (
      <div style={styledFormResultContainer}>
        <div style={styledImageContainer}>
          <div style={styledFormResultFirstItem}>{generatedSpell.name}</div>
          <div style={styledFormResultItem}>{generatedSpell.mode}</div>
          <div style={styledFormResultItem}>{generatedSpell.type}</div>
          <Progress
            value={generatedSpell.rarity}
            total="10"
            progress="ratio"
            color="red"
          />
        </div>
      </div>
    );
  }
}

SpellGeneratorPanelResult.propTypes = {
  generatedSpell: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SpellGeneratorPanelResult);
