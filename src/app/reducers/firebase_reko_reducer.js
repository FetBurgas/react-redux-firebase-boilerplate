import {
  FETCH_FIREBASE_REKOS,
} from '../actions/types';


export default function (state = null, action) {
    switch (action.type) {
    case FETCH_FIREBASE_REKOS:
        return action.payload;
    default:
        return state;
    }
}
