const dataToArray = (formatHis,order) => {
    const resultArray =[]
    formatHis
        .map((item) => item[order])
        .forEach((item) => 
            resultArray.push(item));
        return resultArray;
    };
export default dataToArray

export const countNumber = (e) => {
        return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    }
