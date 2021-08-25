import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import employeeReducer from './employee/employeeReducer'

const rootReducer = combineReducers(
    {
        employees : employeeReducer,
        user : userReducer
    }
)
 
export default rootReducer