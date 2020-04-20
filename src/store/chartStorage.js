const storageName = "chartLocal";



export default {

    addItem(key, value) {
        console.log(`key${key},value${value}`);
        let itemList = localStorage.getItem(storageName);
        itemList = itemList==null?[]:JSON.parse(itemList);
        const exist = this.checkExist(key,itemList);
        if (itemList == null || exist === -1) {
            itemList.push(value);
        } else {
            itemList[exist].price += 1;
        }
        localStorage.setItem(storageName, JSON.stringify(itemList));
    },

    checkExist(key,List) {
        for (const item in List) {
            if( List[item].id === key){
              return item;
            }
        }
        return -1;
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