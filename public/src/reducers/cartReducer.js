import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types.js';

const initialCart = {
  items: [],
}

export const cartReducer = (state = initialCart, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const clickedItem = action.payload;
      const alreadyAdded = state.items.find( item =>
        item.product === clickedItem.product );
      // If item already in cart, replace it to update quantity, else add it to items
      if (alreadyAdded) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product === alreadyAdded.product ? clickedItem : item
          )
        }
      }
      else { return { ...state, items: [...state.items, clickedItem] } };
    case CART_REMOVE_ITEM:
      return { ...state }
    default:
      return state
  }
}
