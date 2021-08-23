import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { portfolio, portfolioModal } from '../builderInfo/builderInfo';
import { getAdminNotifType18 } from '../../redux/homeSearch/actions';
//@ts-ignore
import FsLightbox from 'fslightbox-react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';
import noData from '../../assets/images/no-search-data.png';

const AdminAnnouncementPage = (props: any) => {
    const [notifData, setNotifData] = useState('');
    const [itemsMedia, setItemsMedia] = useState([]);
    const [toggler, setToggler] = useState(false);
    const [selectedSlide, setSelectSlide] = useState<any>(1);

    useEffect(() => {
        setItems();
    }, []);

    const setItems = async () => {
        const pushNotifId = new URLSearchParams(props.location?.search)?.get('pushNotifId');

        const res = await getAdminNotifType18({ notificationId: pushNotifId });
        if (res.success) {
            setNotifData(res.result);
        }
    }

    const renderMediaItems = (itemsMedia: any) => {
        let sources: any = [];
        let types: any = [];

        if (itemsMedia?.length) {
            itemsMedia.forEach((item: any) => {
                if (item?.mediaType === 1) {
                    sources.push(item.link);
                    types.push('image');
                }
            })
        }

        return { sources, types };
    }

    const { sources, types } = renderMediaItems(itemsMedia);
    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    {props.isLoading ? (
                        <>
                            <div className="flex_row description">
                                <span className="sub_title">{`New updates on Terms of Service`}</span>
                                <p className="commn_para">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin pulvinar vehicula. Nunc dolor lorem, scelerisque sed arcu sed, tempus facilisis tellus. Etiam porttitor fringilla orci, a tempor lorem euismod quis. Maecenas velit urna, sodales consequat neque sed, vulputate consequat mauris. Donec molestie turpis eu lobortis viverra. Nam ac ex quis elit dapibus bibendum. Ut mattis, dolor at tempor venenatis, elit tortor auctor velit, a sollicitudin est orci non dolor. Sed blandit ligula in enim lobortis convallis.
                                    Aenean vel felis eu sapien imperdiet vestibulum. Pellentesque nec neque ac risus facilisis eleifend sed et nisl. Aliquam ut enim est. Duis vitae ligula urna. Aenean in tincidunt lorem. Quisque posuere mi at lectus bibendum, quis faucibus ligula egestas. Suspendisse faucibus ullamcorper ex eu faucibus.`}
                                </p>
                            </div>
                            <FsLightbox
                                toggler={toggler}
                                slide={selectedSlide}
                                sources={sources}
                                types={types}
                                key={sources?.length}
                            />
                            <div className="section_wrapper">
                                <div className="custom_container">
                                    <Carousel
                                        responsive={portfolio}
                                        showDots={false}
                                        arrows={true}
                                        infinite={true}
                                        className="portfolio_wrappr"
                                        partialVisbile
                                    >
                                        <div className="media">
                                            <figure className="portfolio_img">
                                                <img
                                                    src={portfolioPlaceholder}
                                                    alt="portfolio-images"
                                                    onClick={() => {
                                                        setToggler((prev: any) => !prev);
                                                        // setSelectSlide(`${index}`);
                                                        setSelectSlide(1);
                                                    }}
                                                />
                                            </figure>
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                        </>) : (<div className="no_record">
                            <figure className="no_img">
                                <img src={noData} alt="data not found" />
                            </figure>
                            <span>No Data Found</span>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.common.isLoading,
    }
}

export default connect(mapStateToProps, null)(AdminAnnouncementPage);
