import moment from 'moment';

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

export const renderTime = (fromDate: any, toDate: any) => {
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

// export const renderTimeWithFormat = (fromDate: any, toDate: any, format?: any) => {
//     if (moment(fromDate, format).isValid() && !moment(toDate, format).isValid()) {
//         return `${moment(fromDate, format).format('DD MMM')}`
//     }

//     if (moment(fromDate, format).isValid() && moment(toDate, format).isValid()) {
//         let yearEnd = moment().endOf("year").toISOString();
//         let monthEnd = moment(fromDate, format).endOf("month").toISOString();

//         let item: any = moment(toDate, format).diff(moment(fromDate, format), 'months', true);
//         let item_year: any = moment(toDate, format).diff(moment(fromDate, format), 'years', true);

//         let monthDiff = parseInt(item.toString());
//         let yearDiff = parseInt(item_year.toString());

//         if (yearDiff > 0 || moment(toDate, format).isAfter(yearEnd) || moment(toDate, format).isAfter(yearEnd)) {
//             return `${moment(fromDate).format('DD MMM YY')} - ${moment(toDate).format('DD MMM YY')}`
//         }
//         if (monthDiff > 0 || moment(toDate, format).isAfter(monthEnd)) {
//             return `${moment(fromDate, format).format('DD MMM')} - ${moment(toDate, format).format('DD MMM')}`
//         }
//         return `${moment(fromDate, format).format('DD MMM')} - ${moment(toDate, format).format('DD MMM')}`
//     }
// }

export const renderTimeWithFormat = (fromDate:any, toDate:any, format:any) => {

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

export const getSearchParamsData = (location?: any) => {
    const params = new URLSearchParams(location?.search);
    const specializationString = params.get('specializationId')
    const specializationArray = specializationString?.split(',');
    const tradeIdArray = params.get('tradeId') ? [params.get('tradeId')] : null;
    const jobTypesArray = params.get('jobTypes') ? [params.get('jobTypes')] : null;
    const queryParamsData: any = {
        page: Number(params.get('page')),
        isFiltered: params.get('isFiltered') === "true",
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
        searchJob: params.get('searchJob'),
        max_budget: Number(params.get('max_budget')),
        pay_type: params.get('pay_type'),
        sortBy: Number(params.get('sortBy'))
        //Array.isArray(params.get('jobTypes'))
    }
    return queryParamsData;
}