import React, { useEffect } from 'react';
import moment from 'moment';
import { format, formatRelative, lightFormat } from 'date-fns';

export const validateABN = (abn: number) => {
    const ABN = abn.toString()
    var weightedSum = 0;
    var weight = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    console.log(ABN, 'ABN')

    for (var i = 0; i < weight.length; i++) {
        weightedSum += (parseInt(ABN[i]) - ((i === 0) ? 1 : 0)) * weight[i];
    }
    return ((weightedSum % 89) === 0) ? true : false
}

export const renderTime = (fromDate: any, toDate: any, format?: any) => {
    if (!toDate) {
        toDate = '';
    }

    if (moment(fromDate).isValid() && !moment(toDate).isValid()) {
        return `${moment(fromDate).format('DD MMM')}`
    }

    if (moment(fromDate).isValid() && moment(toDate).isValid()) {
        let yearEnd = moment().endOf("year").toISOString();
        let monthEnd = moment(fromDate).endOf("month").toISOString();

        let item: any = moment(toDate).diff(moment(fromDate), 'months', true);
        let item_year: any = moment(toDate).diff(moment(fromDate), 'years', true);

        let monthDiff = parseInt(item.toString());
        let yearDiff = parseInt(item_year.toString());

        if (yearDiff > 0 || moment(toDate).isAfter(yearEnd) || moment(toDate).isAfter(yearEnd)) {
            return `${moment(fromDate).format('DD MMM YY')} - ${moment(toDate).format('DD MMM YY')}`
        }
        if (monthDiff > 0 || moment(toDate).isAfter(monthEnd)) {
            return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD MMM')}`
        }
        return `${moment(fromDate).format('DD MMM')} - ${moment(toDate).format('DD MMM')}`
    }
}

export const renderTimeWithFormat = (fromDate: any, toDate: any, format: any) => {
    if (!toDate) {
        toDate = '';
    }

    if (moment(fromDate, format).isValid() && !moment(toDate, format).isValid()) {
        return `${moment(fromDate, format).format('DD MMM')}`
    }

    if (moment(fromDate, format).isValid() && moment(toDate, format).isValid()) {
        let yearEnd = moment().endOf("year").toISOString();
        let monthEnd = moment(fromDate, format).endOf("month").toISOString();

        let item: any = moment(toDate, format).diff(moment(fromDate, format), 'months', true);
        let item_year: any = moment(toDate, format).diff(moment(fromDate, format), 'years', true);

        let monthDiff = parseInt(item.toString());
        let yearDiff = parseInt(item_year.toString());

        if (yearDiff > 0 || moment(toDate, format).isAfter(yearEnd) || moment(toDate, format).isAfter(yearEnd)) {
            return `${moment(fromDate, format).format('DD MMM YY')} - ${moment(toDate, format).format('DD MMM YY')}`
        }
        if (monthDiff > 0 || moment(toDate, format).isAfter(monthEnd)) {
            return `${moment(fromDate, format).format('DD MMM')} - ${moment(toDate, format).format('DD MMM')}`
        }
        return `${moment(fromDate, format).format('DD MMM')} - ${moment(toDate, format).format('DD MMM')}`
    }
}


export const renderTimeWithCustomFormat = (fromDate: any, toDate: any, format: any, formatSet?: any, text?: string) => {

    if (!toDate) {
        toDate = '';
    }

    if (moment(fromDate, format).isValid() && !moment(toDate, format).isValid()) {
        return `${moment(fromDate, format).format(formatSet[0])}`
    }

    if (moment(fromDate, format).isValid() && moment(toDate, format).isValid()) {
        let yearEnd = moment().endOf("year").toISOString();
        let monthEnd = moment(fromDate, format).endOf("month").toISOString();

        let item: any = moment(toDate, format).diff(moment(fromDate, format), 'months', true);
        let item_year: any = moment(toDate, format).diff(moment(fromDate, format), 'years', true);

        let monthDiff = parseInt(item.toString());
        let yearDiff = parseInt(item_year.toString());

        if (yearDiff > 0 || moment(toDate, format).isAfter(yearEnd) || moment(toDate, format).isAfter(yearEnd)) {
            if (formatSet[2]) {
                if (moment(fromDate, format).isSame(moment(toDate, format))) {
                    return moment(fromDate, format).format(formatSet[1])
                }
            }
            return `${moment(fromDate, format).format(formatSet[1])} - ${moment(toDate, format).format(formatSet[1])}`
        }
        if (monthDiff > 0 || moment(toDate, format).isAfter(monthEnd)) {
            if (formatSet[2]) {
                if (moment(fromDate, format).isSame(moment(toDate, format))) {
                    return moment(fromDate, format).format(formatSet[0])
                }
            }
            return `${moment(fromDate, format).format(formatSet[0])} - ${moment(toDate, format).format(formatSet[0])}`
        }
        if (formatSet[2]) {
            if (moment(fromDate, format).isSame(moment(toDate, format))) {
                return moment(fromDate, format).format(formatSet[0])
            }
        }
        return `${moment(fromDate, format).format(formatSet[0])} - ${moment(toDate, format).format(formatSet[0])}`
    }

    return text || 'Choose';
}


export const getSearchParamsData = (location?: any) => {
    const params = new URLSearchParams(location?.search);
    const specializationString = params.get('specializationId')
    const specializationArray = specializationString?.split(',');
    const tradeIdArray = params.get('tradeId') ? [params.get('tradeId')] : null;
    const jobTypesArray = params.get('jobTypes') ? [params.get('jobTypes')] : null;
    const queryParamsData: any = {
        page: Number(params.get('page')),
        isFiltered: params.get('isFiltered') === "true",
        isFilterOn: params.get('isFilterOn'),
        tradeId: tradeIdArray,
        specializationId: specializationArray,
        lat: Number(params.get('lat')),
        long: Number(params.get('long')),
        defaultLat: Number(params.get('defaultLat')),
        defaultLong: Number(params.get('defaultLong')),
        addres: params.get('addres'),
        address: params.get('address'),
        from_date: params.get('from_date'),
        to_date: params.get('to_date'),
        jobResults: params.get('jobResults'),
        heading: params.get('heading'),
        jobTypes: jobTypesArray,
        searchJob: params.get('searchJob')?.replaceAll("xxx", "&"),
        min_budget: Number(params.get('min_budget')),
        max_budget: Number(params.get('max_budget')),
        pay_type: params.get('pay_type'),
        sortBy: Number(params.get('sortBy'))
    }
    return queryParamsData;
}


export const updateQueryStringParameter = ({ uri, key, value }: any) => {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

export const randomColors = () => {
    var colors: any = [];
    while (colors.length < 100) {
        do {
            var color = Math.floor((Math.random() * 1000000) + 1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    return colors;
}

export const formatDateTime = (seconds: any, type: string) => {
    let formattedDate: any = '';
    const date = new Date(seconds);
    if (type === 'day') {
        let date2 = new Date(seconds);
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        if (JSON.stringify(currentDate) == JSON.stringify(date2)) {
            formattedDate = "Today";
        } else {
            formattedDate = moment(date).format('DD MMM YYYY');
            // formattedDate = format(date, 'd MMM yyyy');
        }
    } else if (type === 'time') {
        // formattedDate = lightFormat(date, 'HH:mm');
        formattedDate = moment(date).format('HH:mm');
    } else if (type === 'date') {
        // formattedDate = lightFormat(date, 'M/d/yyyy');
        formattedDate = moment(date).format('M/D/YYYY');
    } else if (type === 'inboxTime') {
        let date2 = new Date(seconds);
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        if (JSON.stringify(currentDate) == JSON.stringify(date2)) {
            formattedDate = moment(date).format('HH:mm');
        } else {
            formattedDate = moment(date).format('M/D/YY');
        }
    }
    return formattedDate;
}

export const formatNotificationTime = (updatedAt: any, type: string) => {
    let formattedDate: any = '';
    const date = new Date(updatedAt);
    if (type === 'day') {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        if (JSON.stringify(currentDate) == JSON.stringify(date)) {
            formattedDate = moment(updatedAt).format('HH:mm');
        } else if (updatedAt) {
            formattedDate = moment(updatedAt).format('M/D/YYYY HH:mm');
        } else {
            formattedDate = moment(updatedAt).format('HH:mm');
        }
    }
    // console.log('formattedDate: ', formattedDate);
    return formattedDate;
}

export const AsyncImage = (props: any) => {
    const [loadedSrc, setLoadedSrc] = React.useState(null);
    React.useEffect(() => {
        setLoadedSrc(null);
        if (props.src) {
            const handleLoad = () => {
                setLoadedSrc(props.src);
            };
            const image = new Image();
            image.addEventListener('load', handleLoad);
            image.src = props.src;
            return () => {
                image.removeEventListener('load', handleLoad);
            };
        }
    }, [props.src]);
    if (loadedSrc === props.src) {
        return (
            <img {...props} alt='set-load-images' />
        );
    }
    return null;
};

// const JOB_STATUS = {
//     OPEN: 1,
//     ACTIVE: 2,
//     CANCELLED: 3,
//     EXPIRED: 4, 
//     COMPLETED: 5, 
//     NEED_APPROVAL: 6, 
//     APPROVED: 7,
//     PENDING_CANCELATION: 9,
//     PENDING_DISPUTE: 10,
//     PENDIND_CHANGE_REQUEST: 11,
//     CHANGE_REQUEST_ACCEPTED: 12,
//     CHANGED_REQUEST_DENIED:13,
//     APPROVED_CANCELLATION: 14,
//     APPROVED_CHANGE_REQUEST: 15, 
//     DISPUTE_RESOLVED: 16
// }

// const NOTIFICATION_TYPE = {
//     TRADIE: 1,
//     BUILDER: 2,
//     JOB: 3,
//     PAYMENT: 4,
//     DISPUTES: 5,
//     REVIEW_TRADIE: 7,
//     REVIEW_BUILDER: 8,
//     QUESTION: 9,
//     OPEN_OPPOSITE_USER_REVIEW_LIST: 10,
//     TERM_AND_CONDITION: 11,
//     JOB_DASHBOARD: 12, //With status key
//     BLOCK_ACCOUNT: 13,
//     MARK_MILESTONE: 14,
//     JOB_HOMEPAGE: 15, //tradeid and specialization id
//     SELF_REVIEW_LIST_OPEN: 16
//     TRADIE_RECEIVE_VOUCH: 17
//     ADMIN_NOTIFICATION: 18
//     PRIVACY_POLICY: 19
// }
//      extra_data => JOB_SATUS=INACTIVE: 

const isJson = (data: any) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

export const onNotificationClick = (notification: any) => {
    const { notificationType, user_type, receiverId, senderId, jobId } = notification;
    let extra_data = isJson(notification?.extra_data);
    console.log('extra_data: ', extra_data);

    switch (Number(notificationType)) {
        case 1: //TRADIE
            if (user_type == 1) {
                return `/tradie-info?tradeId=${receiverId}`;
            } else {
                return `/tradie-info?tradeId=${senderId}&hideInvite=true`;
            }
        case 2: //BUILDER
            if (user_type == 1) {
                return `/builder-info?builderId=${senderId}`;
            } else {
                return `/builder-info?builderId=${receiverId}`;
            }
        case 3: //JOB
            if (user_type == 1) {
                return `/job-details-page?jobId=${jobId}&redirect_from=jobs`;
            } else {
                let urlEncode: any = `?jobId=${jobId}&status=${extra_data?.jobStatusText}&tradieId=${senderId}&edit=true` // &activeType=active
                return `/job-detail?${urlEncode}`;
            }
        case 4: //PAYMENT
            return '/payment-history';
        case 5: //DISPUTES
            if (user_type == 1) {
                return `/job-details-page?jobId=${jobId}&redirect_from=jobs`;
            } else {
                let urlEncode: any = `?jobId=${jobId}&status=${extra_data?.jobStatusText}&tradieId=${senderId}&edit=true&activeType=active`
                return `/job-detail?${urlEncode}`;
            }
        case 7: //REVIEW_TRADIE
            return `/jobs?active=past&jobId=${jobId}`;
        case 8: //REVIEW_BUILDER
            return `/review-builder?jobId=${jobId}`;
        case 9: //QUESTION
            if (user_type == 1) {
                return `/job-details-page?jobId=${jobId}&tradeId=${extra_data?.tradeId}&specializationId=${extra_data?.specializationId}&openQList=true`;
            } else {
                let urlEncode: any = `?jobId=${jobId}&status=${extra_data?.jobStatusText}&openQList=true`
                return `/job-detail?${urlEncode}`;
            }
        case 10: //OPEN OPPOSITE USER REVIEW LIST
            if (user_type == 1) {//tradieId builderId in extra_data
                return `/builder-info?builderId=${extra_data?.builderId}`;
            } else {
                return `/tradie-info?tradeId=${extra_data?.tradieId}`;
            }
        case 11: //TERM_AND_CONDITION
            return `/update-user-info?menu=tnc`;
        case 12: //JOB_DASHBOARD
            if (user_type == 1) {
                const type = +extra_data?.redirect_status;
                return type === 1 ? `/past-jobs` : type === 2 ? `/active-jobs` : type === 3 ? '/new-jobs' : '/active-jobs';
            } else {
                const type = +extra_data?.redirect_status;
                return `/jobs?active=${type === 1 ? `past` : type === 2 ? `active` : type === 3 ? 'applicant' : 'active'}`;
            }
        case 13: //BLOCK_ACCOUNT
            return '/';
        case 14: //MARK_MILESTONE
            if (user_type == 1) {
                if (extra_data?.jobStatusText === 'COMPLETED') {
                    return `/job-details-page?jobId=${jobId}&redirect_from=jobs`;
                } else {
                    return `/mark-milestone?jobId=${jobId}&redirect_from=jobs`;
                }
            } else {
                if (extra_data?.jobStatusText === 'COMPLETED') {
                    let urlEncode = `?jobId=${jobId}&status=${extra_data?.jobStatusText}&tradieId=${senderId}&edit=true&activeType=past`
                    return `/job-detail?${urlEncode}`;
                } else {
                    return `/jobs?active=active&jobId=${jobId}&markMilestone=true`;
                }
            }
        case 15: //JOB_HOMEPAGE
            if (user_type == 1) {
                return `/job-details-page?jobId=${jobId}&tradeId=${extra_data?.tradeId}&specializationId=${extra_data?.specializationId}`;
            } else {
                return '/';
            }
        case 16: //SELF_REVIEW_LIST_OPEN
            if (user_type == 1) {
                return `/tradie-info?tradeId=${receiverId}`;
            } else {
                return `/builder-info?builderId=${receiverId}`;
            }
        case 17: //TRADIE_RECEIVE_VOUCH
            if (user_type == 1) {
                return `/tradie-vouchers?tradieId=${receiverId}`;
            } else {
                return '/'
            }
        case 18: //ADMIN_NOTIFICATION_ANNOUNCEMENT
            return `/admin-announcement-page?admin_notification_id=${extra_data?.admin_notification_id}`;
        case 19: //PRIVACY_POLICY
            return `/update-user-info?menu=pp`;
        default:
            return '/';
    }
}