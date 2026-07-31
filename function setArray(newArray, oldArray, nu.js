function setArray(newArray, oldArray, num1) {
    for(let i=0; i<oldArray.length-1;i++) {
        newArray[0] = num1;
        newArray[i+1] = oldArray[i];
    }
    return newArray;

}

console.log(setArray([], [1,2,3], 99));

