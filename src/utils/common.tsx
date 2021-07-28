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
        address: params.get('address'),
        from_date: params.get('from_date'),
        to_date: params.get('to_date'),
        jobResults: params.get('jobResults'),
        heading: params.get('heading'),
        jobTypes: jobTypesArray,
        searchJob: params.get('searchJob')?.replaceAll("xxx", "&"),
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

export const AsyncImage = (props:any) => {
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