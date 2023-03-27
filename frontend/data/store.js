import { combineReducers } from 'redux';
import user from "./user/user.reducers";
import products from "./product/product.reducers";

const app = combineReducers({
  user, products
})

export default app;

