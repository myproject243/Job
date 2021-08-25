import  { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS,
    Authenticate_User_Success,Authenticate_User_Failure, Logout_User,Reset_LoginForm, 
   } from "./userTypes"
import { genericCall, postCall } from "../gateway"

export const fetchUsersRequest = () => {
    return {
        type : FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess =   users => {
    return {
        type : FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = error => {
    return {
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}
export const logonUser = (user, tokenValue) => {
    return {
        type: Authenticate_User_Success,
        payload: user,
       // tokenValue : tokenValue
    }
}

export const authenticateUserFailure = (error) => {
    return {
        type: Authenticate_User_Failure,
        payload: error
    }
}
export const authenticateUsers = (loginInfo) => {
    return async (dispatch) => {
        dispatch(fetchUsersRequest)
        let response = await genericCall('users/authenticate', loginInfo, 'post')
        if( response && (response.status === 200)){
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        localStorage.setItem('userId', response.data.id);
                        localStorage.setItem('userName', response.data.username);
                        dispatch(logonUser(response.data), token)
                        }
        else if(response && (response.status === 500)){
            dispatch(authenticateUserFailure(response.error))
        }
           else{
               let e = response === undefined ? 'some error' : response.error !== undefined ? response.error : 'some error'
                        console.log(e)
                        dispatch(authenticateUserFailure( `Username and password didn't match`))
            }
        }
    }
    
    export const logoutUser = () => {
        return async (dispatch) => {
            dispatch(fetchUsersRequest)
            var response = await postCall('users/logout?token=' + localStorage.getItem('token'), 'ss')
            console.log('response after logout is ...')
            console.log(response)
            if(response.status === 200) {
                dispatch( {type: Logout_User})
              }
            else{
                console.log(response.error)
            }
        }
    }

    export const resetLogin =() => {
        return (dispatch) => {
            dispatch({type:Reset_LoginForm})
        }
    }