const storageName = "chartLocal";


// function Item(key,num,value){
//    var o = new Object();
//    o.key = key;
//    o.num = num;
//    o.value = value;
//    return o;
// }

export default {
    addItem(key, value) {
      console.log(`key${key},value${value}`);
      let itemList = JSON.parse(localStorage.getItem(storageName));
      itemList = itemList==null?[]:itemList;
      if (itemList == null || itemList[key] === undefined) {
          itemList.push(value);
      } else {
        itemList[key].price += 1;
      }
      localStorage.setItem(storageName, JSON.stringify(itemList));
    },
    getList() {
      return JSON.parse(localStorage.getItem(storageName));
    }
};