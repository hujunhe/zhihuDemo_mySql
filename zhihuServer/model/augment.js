//判断参数类型
module.exports = aug;
function aug(data,result){
  for(let i = 0; i < data.length; i++){
    let _data = data[i];
    for (var tmp in _data) {

      if(typeof(_data[tmp]) !== tmp || _data[tmp] == null || _data[tmp] == undefined){
        result.send({
          message:'参数类型错误',
          success:false
        });
        return false;
      }
    }
  }
  return true;
}
