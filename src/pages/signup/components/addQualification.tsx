import { useState } from 'react';
import Constants from '../../../utils/constants';
import { setShowToast } from '../../../redux/common/actions';
import { onFileUpload } from '../../../redux/auth/actions';
import AuthParent from '../../../common/auth/authParent';

import removeFile from '../../../assets/images/icon-close-1.png';
import fileIcon from '../../../assets/images/file.png';
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
            console.log('updated qualificatipomns', newData)
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
        const res = await onFileUpload(formData)
        if (res.success) {
            const item = newData.find(i => i.qualification_id === id)
            item.url = res.imgUrl
            var filename = res.imgUrl.replace(/^.*[\\\/]/, '');
            console.log(newData, 'image upload done', filename)
            setQualification(newData)
        }
    }

    const removeFileHandler = (id: string) => {
        const newData = [...qualification];
        const item = newData.find(i => i.qualification_id === id)
        item.url = ''
        setQualification(newData)
    }

    console.log(qualification, 'qualification');

    const onSubmit = (e: any) => {
        e.preventDefault();
        const newData = [...qualification]
        const item = newData.find(i => i.url === '')
        const itemIndex = newData.indexOf(item)
        console.log(qualification,item, itemIndex, 'okk')
        if (!qualification.length) {
            setShowToast(true, "Please add atleast one qualification.")
        } else if (itemIndex >= 0) {
            setShowToast(true, "Please upload all selected documents.")
        } else {
            props.updateSteps(props.step + 1, { qualification })
        }
    }

    const qualificationList = props.tradeListData.find(i => i._id === props.trade)?.qualifications


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

                    {/* <div className="f_spacebw">
                        <div className="checkbox_wrap agree_check">
                            <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf2" />
                            <label htmlFor="qf2">First Aid</label>
                        </div>
                        <div className="upload_img_video">
                            <label className="upload_btn" htmlFor="upload_img_video">Upload</label>
                            <input type="file" className="none" id="upload_img_video" accept="image/jpeg,image/jpg,image/png,application/pdf" />
                        </div>
                    </div> */}
                    {qualificationList?.map((item: any) => {
                        const isChecked = qualification.find((i: any) => i.qualification_id === item._id);
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
                                            <img src={fileIcon} />
                                        </span>
                                        <div className="file_details">
                                            <span className="name">Image</span>
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
                    })}
                </div>

                <div className="form_field">
                    <button className="fill_btn">Next</button>
                </div>
            </form>
        </div>
    )
}

export default AddQualification



