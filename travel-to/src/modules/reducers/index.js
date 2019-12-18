import { combineReducers } from 'redux';
import user from './user'
import trip from './trip'
export default combineReducers({
    user,
    trip
})