import React from "react";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";

class FileUploader extends React.Component {
    render() {
        const { onDrop } = this.props;
        return (
            <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png"]}
                maxFileSize={5242880}
            />
        );
    }
}

FileUploader.propTypes = {
    onDrop: PropTypes.func.isRequired,
};

export default FileUploader;
