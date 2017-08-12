const loadAllItems = require("../src/items");
const loadPromotions = require("../src/promotions");
module.exports = function bestCharge(selectedItems) {
  var freeAllItems = loadPromotions();
  var allItems = loadAllItems();
  var countPrice = 0;
  var countPrice_first = 0;
  var countPrice_second = 0;
  var freePrice = 0;
  var result = []

   for (var value of selectedItems){
      var a = value.split("x");
      allItems.forEach( (e)=> {
        if(e.id == a[0].trim()){
          e.num = a[1].trim();
          e.sumPrice = e.price * a[1].trim();
          result.push(e);
        }

      })
   }
  
  /*for (var i = 0; i <= allItems.length ; i++) {
    if(allItems[i].sumPrice == undefined){
      allItems.splice(i,1);
    }
  }*/

  var total = 0;
  var string = "============= 订餐明细 =============\n";
   for (var value of result){
      string += (value.name + " x " +value.num + " = " + value.sumPrice + "元" + "\n");
      countPrice += value.sumPrice;
    }

  var flag_1 = "-----------------------------------\n使用优惠:\n";
  if(countPrice > 30 ){
    countPrice_first = countPrice - 6;
    flag_1 += "满30减6元，省6元\n";
    flag_1 +="-----------------------------------\n";
    flag_1 +="总计：" + countPrice_first + "元\n";
    flag_1 +="===================================";
  }

  var arr = []
  var flag = "-----------------------------------\n使用优惠:\n指定菜品半价("
  for (var value of result){
       if(freeAllItems[1].items.includes(value.id)){
         console.log(value.name)
         value.sumPrice = parseInt(value.sumPrice) / 2;
         arr.push(value.name);
         countPrice_second += value.sumPrice;
         freePrice += value.sumPrice;
       }else{
         countPrice_second += value.sumPrice;
       }
    }
    console.log(countPrice_second);
  flag += arr.join("，");
  flag += ")，省" +freePrice + "元\n" + "-----------------------------------\n" + "总计：" + countPrice_second + "元\n";
  flag += "===================================";

  if(countPrice > 30){
    if (countPrice_first > countPrice_second){
      string += flag;
    }else {
      string += flag_1;
    }
  }else {
    if(arr.length != 0){
      string += flag;
    }else{
      string += "-----------------------------------\n";
      string += "总计：" + countPrice + "元\n";
      string += "===================================";
    }
  }

  return string;
}



