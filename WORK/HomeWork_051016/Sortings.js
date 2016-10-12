var arrayLength = +process.argv[2];
var arrayToSort = [];


function bubbleSort(){

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

  var middle = Math.floor(inputarray.length/2);
  return merge(mergeSort(inputarray.slice(0,middle)),mergeSort(inputarray.slice(middle)));
}

function merge(a,b){
  console.log('Array A: ' + a);
  console.log('Array B: ' + b);

  var iteratorA = 0;
  var iteratorB = 0;
  var output = [];
  var stop = true;
  while(stop){
    if (a[iteratorA] === undefined || b[iteratorB] === undefined){
      if(a[iteratorA] === undefined ){
        output.push(b[iteratorB]);
        iteratorB++;
      }
      else{
        output.push(a[iteratorA]);
        iteratorA++;
      }
      stop = false;
    }

    if ( a[iteratorA] <= b[iteratorB]) {
      output.push(a[iteratorA]);
      iteratorA++;
    }
    if ( b[iteratorB] <= a[iteratorA]) {
      output.push(b[iteratorB]);
      iteratorB++;

    }
  }
  return output;
}

function heapSort(){

}

function quickSort(){

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
  console.log(arrayToSort);
  console.log('Initial array \n')
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}


generateArray();

console.time('Count sort');
console.log(countSort());
console.timeEnd('Count sort');
console.log('\n');

console.time('Merge sort');
console.log(mergeSort(arrayToSort));
console.timeEnd('Merge sort');
console.log('\n');


console.time('Default JS sort');
console.log(arrayToSort.sort(function(a, b){return a-b}));
console.timeEnd('Default JS sort');
console.log('\n');



