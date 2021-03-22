import { useState } from 'react';
import Constants from '../../../utils/constants';
import { setShowToast } from '../../../redux/common/actions'
interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    tradeListData: Array<any>,
    trade: string,
}

const SelectCategories = (props: Propstype) => {
    const [trade, setTrade] = useState(props.trade);

    const onClick = (item: string) => {
        setTrade(item)
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (trade) {
            props.updateSteps(props.step + 1, { trade })
        } else {
            setShowToast(true, "Please select your sphere")
        }
    }

    return (
        <div className="select_sphere form_wrapper">
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
