import React, { useState } from 'react';
import { onFileUpload } from '../../../redux/auth/actions';
import { setShowToast } from '../../../redux/common/actions';
//@ts-ignore
import FsLightbox from 'fslightbox-react';

import addMedia from "../../../assets/images/add-image.png";
import close from '../../../assets/images/icon-close-1.png';

const imageFormats: Array<any> = ["jpeg", "jpg", "png"];

const LodgeDispute = (props: any) => {
    const [filesUrl, setFilesUrl] = useState([] as any);
    const [localFiles, setLocalFiles] = useState({});

    const [update, forceUpdate] = useState({});
    const [toggler, setToggler] = useState(false);
    const [selectedSlide, setSelectSlide] = useState(1);

    const removeFromItem = (index: any) => {
        filesUrl.splice(index, 1);
        setFilesUrl(filesUrl);
        Array.isArray(update) ? forceUpdate([]) : forceUpdate({});
    }

    const onFileChange = async (e: any) => {
        const formData = new FormData();
        const newFile = e.target.files[0];

        if (filesUrl?.length === 2) {
            setShowToast(true, "Max files upload limit is 2.")
            return;
        }

        var fileType = (newFile?.type?.split('/')[1])?.toLowerCase();
        var selectedFileSize = newFile?.size / 1024 / 1024; // size in mib

        if (imageFormats.indexOf(fileType) < 0 || (selectedFileSize > 10)) {
            setShowToast(true, "The file must be in proper format or size.")
            return;
        }

        if (imageFormats.includes(fileType) && selectedFileSize > 10) { // image validations
            setShowToast(true, "The image file size must be below 10 MB.")
            return;
        }

        formData.append('file', newFile);
        const res = await onFileUpload(formData)
        if (res.success) {
            let link: string = res.imgUrl;
            let check_type: any = 1;
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
            return (
                <figure className="img_video">
                    {image_render}
                    <img
                        onClick={() => { removeFromItem(index) }}
                        src={close} alt="remove" className="remove" />
                    {/* <span style={{ fontSize: '10px' }}>{get_split_name}</span> */}
                </figure>
            )
        }
    }

    const checkErrors = () => {
        return true;
    }

    const handleSubmit = async () => {
    }

    const renderFilteredItems = () => {
        let sources: any = [];
        let types: any = [];

        if (filesUrl?.length) {
            filesUrl.forEach((item: any) => {
                if (item?.mediaType === 1) {
                    sources.push(item.link);
                    types.push('image');
                }
            })
        }

        return { sources, types };
    }

    const { sources, types } = renderFilteredItems();
    return (
        <div className="flex_row">
            <div className="flex_col_sm_8">
                <div className="relate">
                    <button
                        onClick={() => { props.setIdVerifClicked(false) }}
                        className="back"></button>
                    <span className="xs_sub_title">
                        {'Add your ID photo'}
                    </span>
                </div>
                {/* <span className="sub_title">Lodge dispute</span> */}
                <p className="commn_para">Make sure the lighting is good and put the front side the of the ID into the frame and then click Take a Photo</p>

                <FsLightbox
                    toggler={toggler}
                    slide={selectedSlide}
                    sources={sources}
                    types={types}
                />
            </div>

            <div className="flex_col_sm_9">
                <div className="form_field">
                    {/* <span className="error_msg">
                        {"error detail"}
                    </span> */}
                </div>
            </div>
            <div className="flex_col_sm_12">
                <div className="upload_img_video">
                    {filesUrl?.length ?
                        filesUrl.map((item: any, index: number) => (renderbyFileFormat(item.link, index)))
                        : null}

                    {filesUrl?.length < 3 ? (
                        <React.Fragment>
                            <label className="upload_media" htmlFor="upload_img_video">
                                <img src={addMedia} alt="" />
                            </label>
                            <input
                                onChange={onFileChange}
                                type="file"
                                accept="image/png,image/jpg,image/jpeg"
                                style={{ display: "none" }}
                                id="upload_img_video"
                            />
                        </React.Fragment>
                    ) : null}
                </div>
                <button
                    onClick={handleSubmit}
                    className={`fill_btn full_btn btn-effect ${checkErrors() ? 'disable_btn' : ''}`}>
                    {'Submit'}
                </button>
            </div>
        </div>
    )
}

export default LodgeDispute;