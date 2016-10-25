var arrayLength = +process.argv[2];
var showArray = +process.argv[3];
var arrayToSort = [];


function bubbleSort(){
  var swaped = false;
  var output = arrayToSort.slice();
  var maxUnsorted = output.length;
  do{
    swaped = false;
    for(var index = 0; index < maxUnsorted-1; index++){
      if (output[index] > output[index+1]){
        var temp = output[index];
        output[index] = output[index+1];
        output[index+1] = temp;
        swaped = true;
      }
    }
    maxUnsorted--;
  }while(swaped);

  return output; 
}

function mergeSort(inputarray){
  if (inputarray.length <= 2){
    if (inputarray.length === 2 ){
      return (inputarray[0] > inputarray [1] ? [inputarray[1],inputarray[0]] : inputarray);    
    }
    else{
      //console.log('Array lenth 1: ' + inputarray);
      return inputarray;
    }
  }

  var middle = Math.round(inputarray.length/2);
  return merge(mergeSort(inputarray.slice(0,middle)),mergeSort(inputarray.slice(middle)));
}

function merge(a,b){
  var iteratorA = 0;
  var iteratorB = 0;
  var output = [];
  var stop = true;
  do{
    if ( a[iteratorA] < b[iteratorB]) {
      output.push(a[iteratorA]);
      if (iteratorA < a.length-1) {
        iteratorA++;
      }
      else {
        while (iteratorB < b.length){
          output.push(b[iteratorB]);
          iteratorB++;
        }
        stop = false;
      }
    }
    else if (b[iteratorB] <= a[iteratorA]){
      output.push(b[iteratorB]);
      if (iteratorB < b.length-1) {
        iteratorB++;
      }
      else {
        while (iteratorA < a.length){
          output.push(a[iteratorA]);
          iteratorA++;
        }
        stop = false;
      }
    }
  }while(stop);
  return output;
}

function heapSort(){

}

function quickSort(){
  var baseIndex = Math.round(Math.floor(Math.random() * arrayLength));
  
}

function countSort(){
  var newArray = [];
  var max = getMaxOfArray(arrayToSort);
  for (var n = 0; n <= max; n++){
    newArray[n] = 0;
  }

  arrayToSort.forEach(function (current){
    newArray[current] +=1;
  });
  var output = [];
  newArray.forEach(function (current,index){

    if (current !== 0){
      for (var n =0; n < current; n++){
        output.push(index);
      }
    }
  })
  return output;

}

function rangeSort(){

}


function generateArray(){
  for (var number = 0; number < arrayLength; number++){
    arrayToSort.push(Math.round(Math.floor(Math.random() * 100)))
  }
  if (showArray) console.log(arrayToSort);
  if (showArray) console.log('Initial array \n')
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function defaultSort(){
  return arrayToSort.sort(function(a, b){return a-b});
}

function compareArrays(a,b){
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i ++)
  {
    if(a[i] !== b[i]) return false;
  }
  return true;
}


generateArray();

console.time('Count sort');
if (showArray) console.log(countSort());
console.timeEnd('Count sort');
console.log('\n');

console.time('Merge sort');
if (showArray) console.log(mergeSort(arrayToSort));
console.timeEnd('Merge sort');
console.log('\n');


console.time('Bubble sort');
if (showArray) console.log(bubbleSort());
console.timeEnd('Bubble sort');
console.log('\n');


console.time('Default JS sort');
if (showArray) console.log(defaultSort());
console.timeEnd('Default JS sort');
console.log('\n');



