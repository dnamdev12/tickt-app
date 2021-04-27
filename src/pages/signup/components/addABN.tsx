import { useState } from 'react';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import { validateABN } from '../../../utils/common';

interface Propstype {
    onSubmitSignup: (data: any) => void,
}

const AddABN = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [ABN, setAbn] = useState<any>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const inputVal = e.target.value;
        let inputVal = e.target.value.replaceAll(' ', '');
        console.log(inputVal, inputVal.length, ABN, "okok")
        if (regex.numeric.test(inputVal) || !inputVal) {
            if (inputVal.length === 2) {
                if (inputVal.length < ABN.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2);
                    setAbn(inputVal);
                    return;
                } else if (inputVal.length == ABN.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 1);
                    setAbn(inputVal);
                    return;
                }
            }

            if (inputVal.length >= 2 && inputVal.length < 5) {
                inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, inputVal.length);
                setAbn(inputVal);
                return;
            }

            if (inputVal.length === 5) {
                if (inputVal.length == ABN.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 4);
                } else if (inputVal.length < ABN.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5);
                } else {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " ";
                }
                setAbn(inputVal);
                return;
            }

            if (inputVal.length === 8) {
                if (inputVal.length == ABN.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 7);
                } else if (inputVal.length < ABN.replaceAll(' ', '').length) {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 8);
                } else {
                    inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 8) + " ";
                }
                setAbn(inputVal);
                return;
            }

            if (inputVal.length > 5 && inputVal.length < 8) {
                inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, inputVal.length);
                setAbn(inputVal);
                return;
            }

            if (inputVal.length > 8) {
                inputVal = inputVal.slice(0, 2) + " " + inputVal.slice(2, 5) + " " + inputVal.slice(5, 8) + " " + inputVal.slice(8, inputVal.length);
            }
            setAbn(inputVal)
        }
        // const key = inputVal.charCodeAt(inputVal.length - 1)
        // if ((key == NaN || inputVal == "") && abn.length === 1) {
        //     setAbn('');
        //     return;
        // }
        // if ((key > 47 && key < 58) || key === 8) {
        //     e.preventDefault();
        //     setAbn(e.target.value)
        // }

        // if (e.target.value.length > 11) { previous dual msg 
        //     return;
        // }
        // setAbn(e.target.value)
    }


    const validateForm = () => {
        const newErrors: any = {};
        if (!ABN) {
            newErrors.abn = Constants.errorStrings.abnEmpty;
        } else {
            const abnRegex = new RegExp(regex.abn);
            if (!abnRegex.test(ABN.replaceAll(' ', ''))) {
                newErrors.abn = Constants.errorStrings.abnErr
            }
            if (!validateABN(ABN.replaceAll(' ', ''))) {
                newErrors.abn = Constants.errorStrings.abnErr
            }
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const abn = ABN;
            props.onSubmitSignup({ abn })
        }
    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Australian business number</label>
                    <div className="text_field">
                        {/* <input type="number" placeholder="Enter Australian business number" value={abn} name="abn" onChange={changeHandler} /> */}
                        <input type="text" placeholder="51 824 753 556" value={ABN} onChange={changeHandler} maxLength={14} />
                    </div>
                    {!!errors.abn && <span className="error_msg">{errors.abn}</span>}
                </div>

                <div className="form_field">
                    <button className="fill_btn">Next</button>
                </div>
            </form>
        </div>
    )
}

export default AddABN
