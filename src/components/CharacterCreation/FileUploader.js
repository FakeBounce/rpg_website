import React from "react";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";

class FileUploader extends React.Component {
  render() {
    const {
      onDrop,
      fileContainerStyle,
      buttonStyles,
      buttonText,
      label,
      withIcon,
      noLabel,
    } = this.props;
    return (
      <ImageUploader
        withIcon={withIcon}
        buttonText={buttonText}
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
        fileContainerStyle={fileContainerStyle}
        buttonStyles={buttonStyles}
        label={label}
        errorStyle={{ display: "none" }}
        labelStyles={noLabel ? { display: "none" } : {}}
      />
    );
  }
}

FileUploader.defaultProps = {
  fileContainerStyle: {},
  buttonStyles: {},
  buttonText: "Choose an image",
  withIcon: true,
  noLabel: false,
  label: "Max file size: 5mb, accepted: jpg, gif, png",
};

FileUploader.propTypes = {
  onDrop: PropTypes.func.isRequired,
  fileContainerStyle: PropTypes.object,
  buttonStyles: PropTypes.object,
  buttonText: PropTypes.string,
  label: PropTypes.string,
  withIcon: PropTypes.bool,
  noLabel: PropTypes.bool,
};

export default FileUploader;
