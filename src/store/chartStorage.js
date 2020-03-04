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

    updateItem(key) {
      // Get the whole list in the localstorgae
      let itemList = JSON.parse(localStorage.getItem(storageName));
      itemList.remove();

    },
    /**
     * Remove some items in the localstorage
     */
    deleteItem(){

    },

    clearChart(){
        localStorage.setItem(storageName,null);
    },
    deleteItem(key) {

    },
    getList() {
      return JSON.parse(localStorage.getItem(storageName));
    }

};