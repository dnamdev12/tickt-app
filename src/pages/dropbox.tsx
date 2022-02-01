import React, { useState } from 'react';
//@ts-ignore
import DropboxChooser from 'react-dropbox-chooser';
const Dropbox = () => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className={'app_wrapper'}>
            <div className="section_wrapper">
                <div className="custom_container">
                    <button onClick={() => {
                        setShowPopup(true);
                    }}>DROPBOX</button>
                    { showPopup &&
                        <DropboxChooser
                            appKey={'it3ugo6ojzf1ed5'}
                            // success={files => this.onSuccess(files)}
                            // cancel={() => this.onCancel()}
                            multiselect={true}
                            extensions={['.mp4', 'jpeg', 'jpg']} >
                            <div className="dropbox-button">Click me!</div>
                        </DropboxChooser>
                    }
                </div>
            </div>
        </div>

    )
};

export default Dropbox;
