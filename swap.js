function swapArray(array, index1, index2) {
    let temp = array[index1]; 
    array[index1] = array[index2];
    array[index2] = temp;

    return array;
}

function reverseArray(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let temp = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = temp;
    }
    return array;
}

console.log(swapArray([4,1,5,1,6,1,7,1,7,34,7,32,7,2,762,1,6,126],1,10));
console.log(reverseArray([1, 2, 3, 4, 5]));


