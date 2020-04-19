const storageName = "chartLocal";



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
    // Get new item list after updatein the items
    updateItem(key) {
      // Get the whole list in the localss
      let itemList = JSON.parse(localStorage.getItem(storageName));
      itemList.remove();

    },

    // delete all the items in the cashe
    clearChart(){
        localStorage.setItem(storageName,JSON.stringify([]));
    },

    // delete some special items
    deleteItem(key) {

    },
    getList() {
      let itemList = JSON.parse(localStorage.getItem(storageName));
      // fix all allItemsArr is null
      if (itemList === null) {
        this.clearChart();
      }
      return JSON.parse(localStorage.getItem(storageName));
    }

};