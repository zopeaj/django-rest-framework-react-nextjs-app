import { initialState } from "./product.state";

export default function products(state=initialState, action) {
  let productList = state.slice();

  switch(action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.product];

    case 'UPDATE_PRODUCT':
      let productUpdate = productList[action.index]
      productUpdate.name = action.product.name;
      productUpdate.category = action.product.category;
      productUpdate.product_image = action.product.product_image;

      productList.splice(action.index, 1, productUpdate);
      return productList;

    case 'DELETE_PRODUCT':
      productList.splice(action.index, 1);
      return productList;

    case 'FETCH_PRODUCTS':
      return [...state, action.products];

    default:
      return state;
  }

}
