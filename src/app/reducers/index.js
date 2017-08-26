import { combineReducers } from 'redux';
import UserReducer from './firebase_user_reducer';
import RekoReducer from './firebase_reko_reducer';
import StoreReducer from './firebase_store_reducer';

const rootReducer = combineReducers({
    currentUser: UserReducer,
    rekos: RekoReducer,
    myStore: StoreReducer,
});

export default rootReducer;
