import React, { useEffect, useState } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import remove from "../../../assets/images/icon-close-1.png";
import addMedia from "../../../assets/images/add-image.png";
import { onFileUpload } from '../../../redux/auth/actions';

interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}
//  ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {

const UploadMedia = ({ data, stepCompleted, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    const [localFiles, setLocalFiles] = useState({});
    const [update, forceUpdate] = useState({});
    const [filesUrl, setFilesUrl] = useState([
        'https://appinventiv-development.s3.amazonaws.com/SampleVideo_1280x720_1mb.mp4',
        'https://appinventiv-development.s3.amazonaws.com/sample_png_file.png',
        'https://appinventiv-development.s3.amazonaws.com/sample_png_file.png',
        'https://appinventiv-development.s3.amazonaws.com/sample_png_file.png',
        'https://appinventiv-development.s3.amazonaws.com/sample_png_file.png',
        'https://appinventiv-development.s3.amazonaws.com/sample_jpg_file.jpg'
    ] as any);

    useEffect(() => {
        // console.log({ localFiles }, '-in use effect');
        console.log({ filesUrl, localFiles });
    }, [localFiles, filesUrl]);

    const removeFromItem = (index: any) => {
        console.log('before ---', { filesUrl, index });
        filesUrl.splice(index, 1);
        console.log('after ---', { filesUrl, index });
        setFilesUrl(filesUrl);
        Array.isArray(update) ? forceUpdate([]) : forceUpdate({});
    }

    const onFileChange = async (e: any) => {
        const formData = new FormData();
        const newFile = e.target.files[0];
        console.log({ newFile });
        var fileType = newFile?.type?.split('/')[1];
        console.log({ fileType });
        const docTypes: Array<any> = ["jpeg", "jpg", "png", "pdf", "doc", "mp4", "wmv", "avi"];
        var selectedFileSize = newFile?.size / 1024 / 1024;
        console.log({ docTypes, selectedFileSize });
        if (docTypes.indexOf(fileType) < 0 || (selectedFileSize > 10)) {
            alert('The file must be in proper format or size')
            return;
        }
        formData.append('file', newFile);
        const res = await onFileUpload(formData)
        if (res.success) {
            console.log({ res });
            let link: string = res.imgUrl;
            setFilesUrl((prev: Array<any>) => [...prev, link]);
            setLocalFiles((prev: any) => ({ ...prev, newFile }));
        }
    }

    // - Image formats: Jpeg, jpg and png
    // - File formats: pdf, doc (word documents)
    // - Image/File Max size: 10 MB
    // - Max Images/Files : 6
    // - Video formats: MP4, WMV and AVI
    // - Video Max Size: 20 MB
    // - Max Video : 2

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_6">
                                <div className="relate">
                                    <button
                                        onClick={() => { handleStepForward(6) }}
                                        className="back"></button>
                                    <span className="title">Video upload or add photos</span>
                                </div>
                                <p className="commn_para">
                                    {'Record a short video or add photos to demonstrate your job and any unique requirements.'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_12">
                            <div className="upload_img_video">
                                {filesUrl?.length ?
                                    filesUrl.map((item: any, index: number) => (
                                        <figure className="img_video">
                                            <img src={item} alt="media" />
                                            <img
                                                onClick={() => { removeFromItem(index) }}
                                                src={remove} alt="remove" className="remove" />
                                        </figure>
                                    ))
                                    : null}

                                {filesUrl?.length < 6 ? (
                                    <React.Fragment>
                                        <label className="upload_media" htmlFor="upload_img_video">
                                            <img src={addMedia} alt="" />
                                        </label>
                                        <input
                                            onChange={onFileChange}
                                            type="file"
                                            accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                                            style={{ display: "none" }}
                                            id="upload_img_video"
                                        />
                                    </React.Fragment>
                                ) : null}
                            </div>
                        </div>

                        <div className="form_field">
                            <button
                                onClick={() => { handleStepForward(14) }}
                                className="fill_btn full_btn">Submit</button>
                            {/* className="fill_btn full_btn disable_btn">Submit</button> */}
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default UploadMedia
