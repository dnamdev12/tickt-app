import React, { ReactElement, useState, useEffect } from 'react'
import dummy from '../../../../assets/images/u_placeholder.jpg';
import approved from '../../../../assets/images/approved.png';
import waiting from '../../../../assets/images/exclamation.png';
import close from '../../../../assets/images/icon-close-1.png';
import addMedia from "../../../../assets/images/add-image.png";
import noDataFound from "../../../../assets/images/no-search-data.png";

import { onFileUpload } from '../../../../redux/auth/actions';
import { setShowToast } from '../../../../redux/common/actions';

import { withRouter } from 'react-router-dom';

//@ts-ignore
import FsLightbox from 'fslightbox-react';

import { CancelJob } from '../../../../redux/jobs/actions';

const imageFormats: Array<any> = ["jpeg", "jpg", "png"];

const LodgeDispute = (props: any) => {
    const { item: { jobId, jobName }, history } = props;
    const [stateData, setStateData] = useState({ reason: 0, detail: '', upload: [] });
    const [errorData, setErrorData] = useState({ reason: '', detail: '', upload: '' });
    const [filesUrl, setFilesUrl] = useState([] as any);
    const [localFiles, setLocalFiles] = useState({});

    const [update, forceUpdate] = useState({});
    const [toggler, setToggler] = useState(false);
    const [selectedSlide, setSelectSlide] = useState(1);


    const { reason, detail, upload } = stateData;

    const isValid = ({ name, value, title }: any) => {
        if (name === 'reason') {
            return value === 0 ? `${title} is required.` : '';
        }
        return !value?.length ? `${title} is required.` : '';
    }

    const checkErrors = () => {
        let error_1 = isValid({ name: 'reason', value: reason, title: 'Reason' });
        let error_2 = isValid({ name: 'detail', value: detail, title: 'Detail' });

        // if (!error_1?.length && !error_2?.length) {
        if (!error_1?.length) {
            return false;
        }
        return true;
    }


    useEffect(() => {
        setErrorData((prev: any) => ({
            ...prev,
            detail: stateData?.detail?.length > 250 ? 'Maximum 250 characters are allowed.' : ''
        }))
    }, [stateData]);

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

    const handleSubmit = async () => {
        let data:any = {
            "jobId": jobId,
            "reason": reason,
        }

        if(detail?.length){
            data['note'] = detail;
        }

        let response: any = await CancelJob(data);
        if (response?.success) {
            history.push('/cancel-job-success');
        }
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
                        onClick={() => { props.backTab('cancel') }}
                        className="back"></button>
                    <span className="xs_sub_title">
                        {jobName || ''}
                    </span>
                </div>

                <span className="sub_title">
                    {'Your reason for canceling job'}
                </span>
                <p className="commn_para">
                    {'Let the tradesperson and Tickt know why you are cancelling the job.'}
                </p>

                <FsLightbox
                    toggler={toggler}
                    slide={selectedSlide}
                    sources={sources}
                    types={types}
                />

                <div className="reason_wrap">
                    <div className="f_spacebw">
                        <div className="checkbox_wrap agree_check">
                            <input
                                value={reason}
                                onClick={() => { setStateData((prev: any) => ({ ...prev, reason: 1 })) }}
                                checked={reason === 1}
                                name="Reason" className="filter-type filled-in" type="checkbox" id="reason1" />
                            <label htmlFor="reason1">
                                {'I got a better job'}
                            </label>
                        </div>
                        <div className="checkbox_wrap agree_check">
                            <input
                                value={reason}
                                onClick={() => { setStateData((prev: any) => ({ ...prev, reason: 2 })) }}
                                checked={reason === 2}
                                name="Reason" className="filter-type filled-in" type="checkbox" id="reason2" />
                            <label htmlFor="reason2">
                                {'I am not the right fit for the job'}
                            </label>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex_col_sm_9">
                <div className="form_field">
                    <label className="form_label">Details</label>
                    <div className="text_field">
                        <textarea
                            value={detail}
                            onChange={(e: any) => {
                                setStateData((prev: any) => ({ ...prev, detail: (e.target.value).trimLeft() }))
                            }}
                            placeholder="It’s really bad work, because..."></textarea>
                    </div>
                    <span className="error_msg">
                        {errorData.detail}
                    </span>
                </div>
                <button
                    onClick={handleSubmit}
                    className={`fill_btn full_btn btn-effect ${checkErrors() ? 'disable_btn' : ''}`}>
                    {'Send'}
                </button>
            </div>
        </div>
    )
}

export default withRouter(LodgeDispute);