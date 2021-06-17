import React, { SyntheticEvent, useEffect, useState } from 'react';
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
//@ts-ignore
import FsLightbox from 'fslightbox-react';

interface Proptypes {
    jobName?: string;
    title?: string;
    para?: string;
    hasDescription?: boolean;
    data: any;
    stepCompleted: Boolean;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
}

const imageFormats: Array<any> = ["jpeg", "jpg", "png"];
const videoFormats: Array<any> = ["mp4", "wmv", "avi"];
const docTypes: Array<any> = ["jpeg", "jpg", "png", "mp4", "wmv", "avi", "pdf", "doc", "docx", "msword"];
const docformats: Array<any> = ["pdf", "doc", "docx", "msword"];

// 'https://appinventiv-development.s3.amazonaws.com/SampleVideo_1280x720_1mb.mp4'
// 'https://appinventiv-development.s3.amazonaws.com/sample_jpg_file.jpg'

const UploadMedia = ({ jobName, title, para, hasDescription, data, stepCompleted, handleStepForward, handleStepComplete, handleStepBack }: Proptypes) => {
    const [localFiles, setLocalFiles] = useState({});
    const [update, forceUpdate] = useState({});
    const [filesUrl, setFilesUrl] = useState([] as any);
    const [description, setDescription] = useState('');
    const [submitClicked, setSubmitClicked] = useState(false);
    const [toggler, setToggler] = useState(false);
    const [selectedSlide, setSelectSlide] = useState(1);



    useEffect(() => {
        if (stepCompleted) {
            setFilesUrl(data?.urls);
            setSubmitClicked(true);
        }
    }, [stepCompleted, data]);

    const checkErrors = () => {
        if (!filesUrl?.length) {
            return true;
        }

        if (hasDescription && !description) {
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
            let check_type: any = imageFormats.includes(fileType) ? 1 : videoFormats.includes(fileType) ? 2 : ["doc", "docx", "msword"].includes(fileType) ? 3 : 4
            setFilesUrl((prev: Array<any>) => [...prev, {
                "mediaType": check_type,
                "link": link
            }]);
            setLocalFiles((prev: any) => ({ ...prev, [filesUrl?.length]: URL.createObjectURL(newFile) }));
        }
    }


    const setItemToggle = (index: any) => {
        setToggler((prev: boolean) => !prev);
        setSelectSlide(index + 1);
    }

    const renderbyFileFormat = (item: any, index: any) => {
        let split_item_format = item.split('.');
        let get_split_fromat = split_item_format[split_item_format.length - 1];

        let split_item_name = item.split('/');
        let get_split_name = split_item_name[split_item_name.length - 1];
        let image_render: any = null;
        if (get_split_fromat) {
            if (imageFormats.includes(get_split_fromat)) {
                image_render = <img onClick={() => { setItemToggle(index) }} title={get_split_name} src={item} alt="media" />
            }

            if (videoFormats.includes(get_split_fromat)) {
                image_render = <img onClick={() => { setItemToggle(index) }} title={get_split_name} src={videoThumbnail} alt="media" style={{ padding: '17px' }} />
            }

            if (docformats.includes(get_split_fromat)) {
                image_render = <img title={get_split_name} src={docThumbnail} alt="media" />
            }

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

    const renderFilteredItems = () => {
        let sources: any = [];
        let types: any = [];

        if (filesUrl?.length) {
            filesUrl.forEach((item: any) => {
                if (item?.mediaType === 2) {
                    sources.push(item.link);
                    types.push('video');
                }
                if (item?.mediaType === 1) {
                    sources.push(item.link);
                    types.push('image');
                }
                if (item?.mediaType === 3) {
                    sources.push(docThumbnail);
                    types.push('image');
                }
            })
        }

        return { sources, types };
    }

    const { sources, types } = renderFilteredItems();
    return (
        <div className={`app_wrapper${jobName ? ' padding_0' : ''}`}>
            <div className={`section_wrapper${jobName ? ' padding_0' : ''}`}>
                <div className="custom_container">

                    <FsLightbox
                        toggler={toggler}
                        slide={selectedSlide}
                        sources={sources}
                        types={types}
                    />

                    <div className="form_field">
                        <div className="flex_row">
                            <div className={`flex_col_sm_${jobName ? '7' : '6'}`}>
                                <div className="relate">
                                    <button
                                        onClick={() => { hasDescription ? handleStepBack() : handleStepForward(6) }}
                                        className="back"></button>
                                    <span className={jobName ? "xs_sub_title" : "title"}>{jobName || 'Video upload or add photos'}</span>
                                </div>
                                {title && <span className="sub_title">{title}</span>}
                                <p className="commn_para">
                                    {para || "Record maximum 2 short videos or 6 doc files/images to demonstrate your job and any unique requirements."}
                                    {/* {para || 'Record a short video or add photos to demonstrate your job and any unique requirements.'} */}
                                </p>
                            </div>
                            {!jobName && !filesUrl?.length ? (
                                <div className="flex_col_sm_5 text-right">
                                    <span
                                        onClick={() => {
                                            handleStepForward(14)
                                        }}
                                        className="link">
                                        {'Skip'}
                                    </span>
                                </div>
                            ) : null}
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
                    <div className="flex_row">
                        <div className="flex_col_sm_8">
                            {hasDescription && <div className="form_field">
                                <label className="form_label">Photo description</label>
                                <div className="text_field">
                                    <input type="text" placeholder="The item has.." value={description} onChange={({ target: { value } }: any) => setDescription(value)} />
                                </div>
                                <span className="error_msg">{submitClicked && !description ? 'Description is required' : ''}</span>
                            </div>}
                            <div className="form_field">
                                <button
                                    onClick={() => {
                                        setSubmitClicked(true);
                                        handleStepComplete({
                                            urls: filesUrl,
                                            description: hasDescription ? description : undefined,
                                        })
                                    }}
                                    className={`fill_btn full_btn btn-effect ${checkErrors() ? 'disable_btn' : ''}`}>
                                    {'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default UploadMedia
