import {useState} from 'react';
import Constants from '../../../utils/constants';

interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    tradeListData: Array<any>,
    trade: string,
    specialization: Array<string>
}

const Specialization = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [specialization, setSpecialization] = useState(props.specialization);

    const changeHandler = (id: string) => {
        setSpecialization((prevData: Array<string>) => {
            const newData = [...prevData];
            const itemIndex = newData.indexOf(id);
            if(newData.indexOf(id) < 0) {
                newData.push(id);
            } else {
                newData.splice(itemIndex, 1);
            }
            return newData;
        })
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!specialization?.length) {
            newErrors.specialization = Constants.errorStrings.specializationEmpty;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            props.updateSteps(props.step + 1, {specialization})
        }
    }

    const specializationList = props.tradeListData.find(i => i._id === props.trade)?.specialisations;

    return (
        <div className="form_wrapper tags_wrap">
            <form onSubmit={onSubmit}>
                {!!errors.specialization && <span className="error_msg">{errors.specialization}</span>}
                <ul>
                    {specializationList?.map((item: any) => {
                        const active = specialization.indexOf(item._id) >= 0;
                        return (
                            <li className={active ? 'active': ''} onClick={() => changeHandler(item._id)}>{item.name}</li>
                        )
                    })}
                </ul>
                <div className="form_field">
                    <button className="fill_btn">Next</button>
                </div>
            </form>
        </div>
    )
}

export default Specialization
