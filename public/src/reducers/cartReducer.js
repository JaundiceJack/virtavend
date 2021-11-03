import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../actions/types.js';

const initialCart = {
  items: [],
  shippingAddress: {},
  savedPaymentMethod: ''
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
      return { ...state,
        items: state.items.filter(item => item.product !== action.payload)
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state,
        shippingAddress: action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state,
        savedPaymentMethod: action.payload
      }
    default:
      return state
  }
}
