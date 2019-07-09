import Item1 from '../../images/headphone.jpg'
import Item2 from '../../images/shoes.jpg'
import Item3 from '../../images/watch.jpg'
import Item4 from '../../images/sunglass1.jpg'
import Item5 from '../../images/jeans.jpg'
import Item6 from '../../images/alexa.jpg'
import { ADD_TO_CART,REMOVE_ITEM,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Beats', desc: "Connect your smartphone to this headset using Bluetooth or a 3.5-mm auxiliary cable and get grooving.", price:1999,img:Item1},
        {id:2,title:'Nike', desc: "DOWNSHIFTER 9 Running Shoes For Men  (White, Grey)", price:3246,img: Item2},
        {id:3,title:'Civo', desc: "38044PP01 Trendies Analog Watch - For Men#JustHere",price:1356,img: Item3},
        {id:4,title:'Ray-Ban', desc: "Mirrored Round Sunglasses (41)  (Blue)", price:6540,img:Item4},
        {id:5,title:'Wrong', desc: "Men Blue Slim Fit Mid-Rise Clean Look Stretchable Jeans", price:1559,img: Item5},
        {id:6,title:'Alexa', desc: "Amazon Echo - Smart speaker with Alexa | Powered by Dolby – Grey",price:7999,img: Item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
