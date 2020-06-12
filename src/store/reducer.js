

let defaultState = {
    list:[]
}
let  Chart = {
   Num:0,
   Item:[],
}


export default ( state = defaultState , action) => {
    switch(action.type){
        case 'add_Item':
            let checkList = defaultState.list
            console.log("action:"+action.value)
            checkList.push(action.value)
            return Object.assign({}, defaultState, { list: [...checkList] })
        // case 'removeItem':
        //     let checkList = defaultState.list
        //     console.log("action:"+action.value)
        //     checkList.push(action.value)
        //     return Object.assign({}, defaultState, { list: [...checkList] })
        // case 'editItem' :
        //     let checkList = defaultState.list
        //     console.log("action:"+action.value)
        //     checkList.push(action.value)
        //     return Object.assign({}, defaultState, { list: [...checkList] })
        // default:
            return state
    }
}

