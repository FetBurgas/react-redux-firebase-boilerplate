import {
  FETCH_FIREBASE_STORE,
} from '../actions/types';


export default function (state = null, action) {
    switch (action.type) {
    case FETCH_FIREBASE_STORE:
        return action.payload;
    default:
        return state;
    }
}
