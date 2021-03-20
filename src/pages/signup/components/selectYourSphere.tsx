import { useState } from 'react';
import Constants from '../../../utils/constants';
interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    tradeListData: Array<any>,
    trade: string,
}

const SelectCategories = (props: Propstype) => {
    const [errors, setErrors] = useState<any>({});
    const [trade, setTrade] = useState(props.trade);

    const onClick = (item: string) => {
        setTrade(item)
    }

    const validateForm = () => {
        const newErrors: any = {};
        if (!trade) {
            newErrors.trade = Constants.errorStrings.sphereEmpty;
        }
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            props.updateSteps(props.step + 1, {trade})
        }
    }

    return (
        <div className="select_sphere form_wrapper">
            {!!errors.trade && <span className="error_msg">{errors.trade}</span>}
            <ul>
                {props.tradeListData.map((item) => {
                    const active = trade === item._id;
                    return (
                        <li className={active ? 'active' : ''} onClick={() => onClick(item._id)}>
                            <figure>
                                <img src={item[active ? 'selected_url' : 'unselected_url']} alt={item.trade_name} />
                            </figure>
                            <span className="name">{item.trade_name}</span>
                        </li>
                    )
                })}
            </ul>
            <button className="fill_btn" onClick={onSubmit}>Next</button>
        </div>
    )
}

export default SelectCategories
