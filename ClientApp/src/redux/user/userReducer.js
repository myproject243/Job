const {Logout_User,FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS,
    Authenticate_User_Success, Authenticate_User_Failure, Reset_LoginForm } = require("./userTypes")


    // const[loading, setLoading] = useState(true);
    // const[user, setUser] = useState({});
    // const[error, setError] = useState('');
    // const[isAuthenticated, setAuthenticated] = useState(false);
    // const[prinicleUser, setPrinicleUser] = useState('');
    // const[token, setToken] = useState(localStorage.getItem('token'));
    // const[userId, setUserId] = useState(localStorage.getItem('userId'));

    //let userId = JSON.parse(localStorage.getItem('userId'));
    let userId = localStorage.getItem('userId');
    const initialState = userId ? { loggedIn: true, userId : userId } : {};

const userReducer = (state = initialState, action) =>
{
    switch(action.type){
        case FETCH_USERS_REQUEST :
            return {
                ...state,       // eturn state a it is, no change
                loading : true
            }
            case FETCH_USERS_SUCCESS :
                return {
                    loading: false,
                    error: '',
                    userDetails : action.payload
                }
        case FETCH_USERS_FAILURE :
            return {
                loading : false,
                userDetails: {},
                error:   action.payload
            } 
         case Authenticate_User_Success :
            return {
                loading : false,
                userDetails:  action.payload,
                isAuthenticated : true,
                prinicleUser: action.payload.username,
               // token: action.payload.token
            }
            case Authenticate_User_Failure :
                return {
                    loading : false,
                    userDetails:  {},
                    isAuthenticated : false,
                    error: action.payload
                }
             case Logout_User :
                 localStorage.removeItem('userId')
                 localStorage.removeItem('token')
                    return {
                      initialState
                    }
             case Reset_LoginForm :
                 return {
                     initialState
                 }
        default : return state
    }
}

export default userReducer