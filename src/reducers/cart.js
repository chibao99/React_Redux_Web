import { ADD_CART, DELETE_CART, UPDATE_CART } from "../constant/AlertTypes";
let data = JSON.parse(localStorage.getItem("cartReducers"));
let initialState = data ? data : [];

export default (state = initialState, action) => {
  let index = -1;
  const { type, product, quantity } = action;
  switch (type) {
    case ADD_CART:
      index = finIndex(state, product);
      if (index !== -1) {
        state[index].quantity += quantity;
      } else {
        state.push({ product, quantity });
      }
      localStorage.setItem("cartReducers", JSON.stringify(state));
      return [...state];
    case DELETE_CART:
      index = finIndex(state, product);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("cartReducers", JSON.stringify(state));
      return [...state];
    case UPDATE_CART:
      index = finIndex(state, product);
      if (index !== -1) {
        state[index].quantity = quantity;
      }
      localStorage.setItem("cartReducers", JSON.stringify(state));
      return [...state];
    default:
      return [...state];
  }
};

const finIndex = (cart, product) => {
  let index = -1;
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product._id === product._id) {
        index = i;
        break;
      }
    }
  }
  return index;
};