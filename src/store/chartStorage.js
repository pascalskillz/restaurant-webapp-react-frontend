const storageName = "chartLocal";



export default {
    addItem(key, value) {
        console.log(`key${key},value${value}`);
        let itemList = JSON.parse(localStorage.getItem(storageName));
        itemList = itemList==null?[]:itemList;
        console.log(itemList[key]);
        if (itemList == null || itemList[key] === undefined) {
            itemList.push(value);
        } else {
            itemList[key].price += 1;
        }
        localStorage.setItem(storageName, JSON.stringify(itemList));
    },


    // Get new item list after updatein the items
    updateItem(key) {
      // Get the whole list in the localss
      let itemList = JSON.parse(localStorage.getItem(storageName));
      itemList.remove();

    },

    // delete all the items in the cash
    clearChart(){
        localStorage.setItem(storageName,JSON.stringify({}));
    },


    // get all the items in the cache
    getList() {
      let itemList = JSON.parse(localStorage.getItem(storageName));
      // fix all allItemsArr is null
      if (itemList === null) {
        this.clearChart();
      }
      return JSON.parse(localStorage.getItem(storageName));
    }
};