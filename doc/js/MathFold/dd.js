module.exports ={
  a: '我时module.export',
  toRepeatArray: function(arr){
    console.log(arr);
    var reset = {};
    arr.forEach(element => {
      if(!reset[element]){
        reset[element] = 1;
      }
    });

    return Object.keys(reset);
  }
}