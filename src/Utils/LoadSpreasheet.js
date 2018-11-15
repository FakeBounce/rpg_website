import React, { Component } from "react";
import firebase from "firebase";
import axios from "axios";
import PropTypes from "prop-types";

class LoadSpreasheet extends Component {
  state = {
    spreadSheet: {},
  };

  componentDidMount() {
    this.doAxiosCall("Merchants!A1:L39", "merchantsList");
    this.doAxiosCall("Consumables!A1:E74", "consumablesList");
    this.doAxiosCall("Enhancements!A1:E30", "enhancementsList");
    this.doAxiosCall("Runes!A1:E49", "runesList");
    this.doAxiosCall("Stones!A1:D26", "stonesList");
    this.doAxiosCall("Weapons!A1:C36", "weaponsList");
    this.doAxiosCall("Artefacts!A1:E38", "artefactsList");
    this.doAxiosCall("Spells!A1:G294", "spellsList");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.spreadSheet.artefactsList) {
      firebase
        .database()
        .ref("items/artefacts/")
        .set(this.state.spreadSheet.artefactsList.content)
        .catch(error => {
          // Handle Errors here.
          this.props.triggerError(error);
        });
      if (this.state.spreadSheet.weaponsList) {
        firebase
          .database()
          .ref("items/weapons/")
          .set(this.state.spreadSheet.weaponsList.content)
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      }
      if (this.state.spreadSheet.stonesList) {
        firebase
          .database()
          .ref("items/stones/")
          .set(this.state.spreadSheet.stonesList.content)
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      }
      if (this.state.spreadSheet.runesList) {
        firebase
          .database()
          .ref("items/runes/")
          .set(this.state.spreadSheet.runesList.content)
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      }
      if (this.state.spreadSheet.enhancementsList) {
        firebase
          .database()
          .ref("items/enhancements/")
          .set(this.state.spreadSheet.enhancementsList.content)
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      }
      if (this.state.spreadSheet.consumablesList) {
        firebase
          .database()
          .ref("items/consumables/")
          .set(this.state.spreadSheet.consumablesList.content)
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      }
      if (this.state.spreadSheet.spellsList) {
        firebase
          .database()
          .ref("items/spells/")
          .set(this.state.spreadSheet.spellsList.content)
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      }
      if (this.state.spreadSheet.merchantsList) {
        firebase
          .database()
          .ref("merchants/")
          .set(this.state.spreadSheet.merchantsList.content)
          .catch(error => {
            // Handle Errors here.
            this.props.triggerError(error);
          });
      }
    }
  }

  doAxiosCall = (url, currentList) => {
    const headerValues = [];
    const rowValues = [];
    axios
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/1VgBWvm0uKuNedA3mS98NUcZNMLucYL9I64Jinly6Pvc?key=AIzaSyCrpca5keUJdvpIPUY7LXDBz0-lyU7QVeg&includeGridData=true&ranges=${url}`,
      )
      .then(response => {
        response.data.sheets[0].data[0].rowData.map((rowData, rowIndex) => {
          const rowValue = {};
          rowData.values.map((columnData, columnIndex) => {
            if (rowIndex === 0) {
              headerValues.push(columnData.effectiveValue.stringValue);
            } else if (columnData.formattedValue) {
              rowValue[headerValues[columnIndex].toLowerCase()] =
                columnData.formattedValue;
            }
            return null;
          });
          if (rowIndex !== 0) {
            rowValues.push(rowValue);
          }
          return null;
        });

        const merchantsRow = {
          headers: headerValues,
          content: rowValues,
        };

        const spreadSheetMerchants = {
          ...this.state.spreadSheet,
        };
        spreadSheetMerchants[currentList] = merchantsRow;

        this.setState(
          state => ({
            ...state,
            spreadSheet: spreadSheetMerchants,
          }),
          () => {
            console.log("state", this.state.spreadSheet);
          },
        );
      })
      .catch(e => this.props.triggerError(e));
  };

  render() {
    return <div />;
  }
}

LoadSpreasheet.propTypes = {
  triggerError: PropTypes.func.isRequired,
};

export default LoadSpreasheet;
// https://sheets.googleapis.com/v4/spreadsheets/1VgBWvm0uKuNedA3mS98NUcZNMLucYL9I64Jinly6Pvc?key=AIzaSyCrpca5keUJdvpIPUY7LXDBz0-lyU7QVeg
