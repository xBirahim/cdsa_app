// reducers.js

const initialState = {
    cartItems: [],
    cartTotal: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const updatedCartItems = [...state.cartItems, action.payload];
        const updatedCartTotal = updatedCartItems.reduce(
          (total, item) => total + parseFloat(item.price),
          0
        );
        return {
          ...state,
          cartItems: updatedCartItems,
          cartTotal: updatedCartTotal,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  