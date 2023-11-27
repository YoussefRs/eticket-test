import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, userOrdersReducer, userReducer } from './reducers/userReducer';


const middleware = [thunk]

const reducer = combineReducers({
    user: userReducer,
    forgetPassword: forgotPasswordReducer,
    orders: userOrdersReducer,
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;