// function setArray(newArray, oldArray, num1) {
//     for(let i=0; i<oldArray.length-1;i++) {
//         newArray[0] = num1;
//         newArray[i+1] = oldArray[i];
//     }
//     return newArray;

// }

// console.log(setArray([], [1,2,3], 99));

function Punisher (arr,x) {
    for (let i=0; i<arr.length-1; i++) {
        if (i >= x) {
            arr[i] = arr[i+1];
        }
    }
    let temp = arr.pop();
    return arr;
}

console.log(Punisher([1,2,3,54,1,6,1,76,1,67,1,6,1,6], 0));
console.log(Punisher([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 6));



function sumOfArray(arr) {
    let sum = 0;
    for (let i=0; i<arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

console.log(sumOfArray([1,2,3,4,5,6,7,8,9,10]));
console.log(sumOfArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]));