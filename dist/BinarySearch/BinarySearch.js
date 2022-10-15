const binarySearch = (searchKey, arr) => {
    let lowerBound = 0;
    let upperBound = arr.length - 1;
    let curIn;
    while (true) {
        curIn = Math.trunc((lowerBound + upperBound) / 2);
        if (arr[curIn] === searchKey) {
            return curIn;
        }
        else if (lowerBound > upperBound) {
            return -1;
        }
        else {
            if (arr[curIn] < searchKey) {
                lowerBound = curIn + 1;
            }
            else {
                upperBound = curIn - 1;
            }
        }
    }
    return -1;
};
const binarySearchRecursion = (searchKey, arr) => {
    if (!arr.length)
        return -1;
    let curIn = Math.floor(arr.length - 1 / 2);
    if (searchKey === arr[curIn])
        return curIn;
    if (searchKey > arr[curIn])
        return binarySearchRecursion(searchKey, arr.slice(curIn + 1));
    if (searchKey < arr[curIn])
        return binarySearchRecursion(searchKey, arr.slice(0, curIn));
};
