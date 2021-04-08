import { useState } from 'react';
import { setShowToast } from '../../../redux/common/actions';
import { onFileUpload } from '../../../redux/auth/actions';

import removeFile from '../../../assets/images/icon-close-1.png';
import jpegFile from '../../../assets/images/jpeg.png';
import jpgFile from '../../../assets/images/jpg.png';
import pngFile from '../../../assets/images/png.png';
import pdfFile from '../../../assets/images/pdf.png';
interface Propstype {
    updateSteps: (num: number, data: any) => void,
    step: number,
    tradeListData: Array<any>,
    trade: string,
    qualification: Array<any>
}

const AddQualification = (props: Propstype) => {
    const [qualification, setQualification] = useState(props.qualification);

    const changeHandler = (id: string) => {
        setQualification((prevData: Array<any>) => {
            const newData = [...prevData];
            const item = newData.find(i => i.qualification_id === id)
            const itemIndex = newData.indexOf(item);
            if (!item) {
                newData.push({ qualification_id: id, url: '' });
            } else {
                newData.splice(itemIndex, 1);
            }
            return newData;
        })
    }

    const onFileChange = async (e: any, id: string) => {
        const newData = [...qualification];
        const item = newData.find(i => i.qualification_id === id)
        if (!item) {
            return
        }
        const formData = new FormData();
        const newFile = e.target.files[0]
        formData.append('file', newFile);
        var fileType = newFile.type.split('/')[1]
        const docTypes: Array<any> = ["jpeg", "jpg", "png", "pdf"]
        console.log(newFile, 'ok', newFile.type, 'ok', fileType)
        if (docTypes.indexOf(fileType) < 0) {
            alert('The file must be in proper format or size')
            return;
        }
        const res = await onFileUpload(formData)
        if (res.success) {
            const item = newData.find(i => i.qualification_id === id)
            item.url = res.imgUrl
            console.log(newData, 'image upload done')
            setQualification(newData)
        }
    }

    const removeFileHandler = (id: string) => {
        const newData = [...qualification];
        const item = newData.find(i => i.qualification_id === id)
        item.url = ''
        setQualification(newData)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        const newData = [...qualification]
        const item = newData.find(i => i.url === '')
        const itemIndex = newData.indexOf(item)
        console.log(qualification, item, itemIndex, 'okk')
        if (!qualification.length) {
            setShowToast(true, "Please add atleast one qualification.")
        } else if (itemIndex >= 0) {
            setShowToast(true, "Please upload all selected documents.")
        } else {
            props.updateSteps(props.step + 1, { qualification })
        }
    }

    const qualificationList = props.tradeListData.find(i => i._id === props.trade)?.qualifications

    const fileDetails = (item: any) => {
        var fileArray = item.url.replace(/^.*[\\\/]/, '').split('.');
        const type = fileArray[1].toLowerCase();
        switch (type) {
            case "jpeg":
                return { fileName: fileArray[0], fileType: jpegFile };
            case "jpg":
                return { fileName: fileArray[0], fileType: jpgFile };
            case "png":
                return { fileName: fileArray[0], fileType: pngFile };
            case "pdf":
                return { fileName: fileArray[0], fileType: pdfFile };
            default:
                return null;
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="choose_qf">
                    {/* <div className="f_spacebw">
                        <div className="checkbox_wrap agree_check">
                            <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf1" />
                            <label htmlFor="qf1">White Card</label>
                        </div>
                        <div className="upload_img_video">
                            <label className="upload_btn" htmlFor="upload_img_video">Upload</label>
                                <input type="file" className="none" id="upload_img_video" />

                            <div className="file_upload_box">
                                <span className="close">
                                    <img src={removeFile} />
                                </span>
                                <span className="file_icon">
                                    <img src={fileIcon} />
                                </span>
                                <div className="file_details">
                                    <span className="name">Image</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {qualificationList ? qualificationList?.map((item: any) => {
                        const isChecked = qualification.find((i: any) => i.qualification_id === item._id);
                        const docDetails = isChecked?.url && fileDetails(isChecked);
                        return (
                            <div className="f_spacebw">
                                <div className="checkbox_wrap agree_check">
                                    <input className="filter-type filled-in" type="checkbox"
                                        checked={isChecked ? true : false} name={item.name} id={item.name}
                                        onChange={() => changeHandler(item._id)} />
                                    <label htmlFor={item.name}>{item.name}</label>
                                </div>
                                {isChecked?.url ?
                                    (<div className="file_upload_box">
                                        <span className="close" onClick={() => removeFileHandler(item._id)}>
                                            <img src={removeFile} />
                                        </span>
                                        <span className="file_icon">
                                            <img src={docDetails?.fileType} />
                                        </span>
                                        <div className="file_details">
                                            <span className="name">{docDetails?.fileName}</span>
                                        </div>
                                    </div>) :
                                    (<div className="upload_img_video">
                                        <label className="upload_btn" htmlFor={item.name + 'upload'}>Upload</label>
                                        <input type="file" className="none" id={item.name + 'upload'}
                                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                                            disabled={!!isChecked ? false : true} onChange={(e) => onFileChange(e, item._id)} />
                                    </div>)}
                            </div>
                        )
                    }) : <li className='active'>No Data Found</li>}
                </div>

                <div className="form_field">
                    <button className="fill_btn">Next</button>
                </div>
            </form>
        </div>
    )
}

export default AddQualification


{/* <label className={`upload_btn ${!isChecked ? "disable" : ""}`} htmlFor={item.name + 'upload'}>Upload</label> */ }

