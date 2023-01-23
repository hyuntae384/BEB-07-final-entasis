const dataToArray = (formatHis,order) => {
    const resultArray =[]
    formatHis
        .map((item) => item[order])
        .forEach((item) => 
            resultArray.push(item));
        return resultArray;
    };
export default dataToArray