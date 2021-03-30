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