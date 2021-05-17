import React, { useEffect, useState } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import remove from "../../../assets/images/icon-close-1.png";
import addMedia from "../../../assets/images/add-image.png";
import videoThumbnail from '../../../assets/images/add-video.png';
import docThumbnail from '../../../assets/images/add-document.png'
import { onFileUpload } from '../../../redux/auth/actions';
import { setShowToast } from '../../../redux/common/actions';

interface Proptypes {
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}

const imageFormats: Array<any> = ["jpeg", "jpg", "png"];
const videoFormats: Array<any> = ["mp4", "wmv", "avi"];
const docTypes: Array<any> = ["jpeg", "jpg", "png", "mp4", "wmv", "avi"];
const docformats: Array<any> = ["pdf", "doc", "docx"];

// 'https://appinventiv-development.s3.amazonaws.com/SampleVideo_1280x720_1mb.mp4'
// 'https://appinventiv-development.s3.amazonaws.com/sample_jpg_file.jpg'

const UploadMedia = ({ data, stepCompleted, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    const [localFiles, setLocalFiles] = useState({});
    const [update, forceUpdate] = useState({});
    const [filesUrl, setFilesUrl] = useState([] as any);

    useEffect(() => {
        if (stepCompleted) {
            setFilesUrl(data?.urls)
        }
    }, [stepCompleted, data]);

    const checkErrors = () => {
        if (!filesUrl?.length) {
            return true;
        }
        return false;
    }

    const removeFromItem = (index: any) => {
        filesUrl.splice(index, 1);
        setFilesUrl(filesUrl);
        Array.isArray(update) ? forceUpdate([]) : forceUpdate({});
    }

    const onFileChange = async (e: any) => {
        const formData = new FormData();
        const newFile = e.target.files[0];

        if (filesUrl?.length === 6) {
            setShowToast(true, "Max files upload limit is 6.")
            return;
        }

        let filesUrlClone: any = filesUrl;
        
        let countVideoFormats = filesUrlClone.map((item: any) => {
            let split_items = item.link.split('.');
        
            let format_split_items = split_items[split_items?.length - 1];
            
            if (videoFormats.includes(format_split_items)) {
                return format_split_items;
            }
        }).filter((item: any) => item !== undefined);
        
        var fileType = (newFile?.type?.split('/')[1])?.toLowerCase();
        var selectedFileSize = newFile?.size / 1024 / 1024; // size in mib

        if (docTypes.indexOf(fileType) < 0 || (selectedFileSize > 10)) {
            setShowToast(true, "The file must be in proper format or size.")
            return;
        }

        if (imageFormats.includes(fileType) && selectedFileSize > 10) { // image validations
            setShowToast(true, "The image file size must be below 10 MB.")
            return;
        }

        // if (docformats.includes(fileType) && selectedFileSize > 10) { // doc validations
        //     setShowToast(true, "The file size must be below 10 MB.")
        //     return;
        // }

        if (videoFormats.includes(fileType)) { // video validations
            if (selectedFileSize > 10) {
                setShowToast(true, "The video file size must be below 20 MB.")
                return;
            }
            if (countVideoFormats?.length > 1) {
                setShowToast(true, "Max video file upload limit is 2.")
                return;
            }
        }

        formData.append('file', newFile);
        const res = await onFileUpload(formData)
        if (res.success) {
            let link: string = res.imgUrl;
            let check_type: any = imageFormats.includes(fileType) ? 1 : 2;
            // let check_type: any = imageFormats.includes(fileType) ? 1 : videoFormats.includes(fileType) ? 2 : ["doc", "docx"].includes(fileType) ? 3 : 4
            setFilesUrl((prev: Array<any>) => [...prev, {
                "mediaType": check_type,
                "link": link
            }]);
            setLocalFiles((prev: any) => ({ ...prev, newFile }));
        }
    }

    const renderbyFileFormat = (item: any, index: any) => {
        let split_item_format = item.split('.');
        let get_split_fromat = split_item_format[split_item_format.length - 1];

        let split_item_name = item.split('/');
        let get_split_name = split_item_name[split_item_name.length - 1];
        let image_render: any = null;
        if (get_split_fromat) {
            if (imageFormats.includes(get_split_fromat)) {
                image_render = <img title={get_split_name} src={item} alt="media" />
            }

            if (videoFormats.includes(get_split_fromat)) {
                image_render = <img title={get_split_name} src={videoThumbnail} alt="media" style={{ padding: '17px' }} />
            }

            // if (docformats.includes(get_split_fromat)) {
            //     image_render = <img title={get_split_name} src={docThumbnail} alt="media" />
            // }

            return (
                <figure className="img_video">
                    {image_render}
                    <img
                        onClick={() => { removeFromItem(index) }}
                        src={remove} alt="remove" className="remove" />
                    {/* <span style={{ fontSize: '10px' }}>{get_split_name}</span> */}
                </figure>
            )
        }
    }

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
                                    filesUrl.map((item: any, index: number) => (renderbyFileFormat(item.link, index)))
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
                    </div>
                    <div className="form_field">
                        <button
                            onClick={() => {
                                console.log({ filesUrl })
                                handleStepComplete({
                                    urls: filesUrl
                                })
                            }}
                            className={`fill_btn full_btn ${checkErrors() ? 'disable_btn' : ''}`}>
                            {'Submit'}
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default UploadMedia
