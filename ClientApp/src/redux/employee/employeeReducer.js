const { FETCH_ALL_EMPLOYEE_SUCCESS, FETCH_ALL_EMPLOYEE_ERROR, FETCH_ALL_EMPLOYEE_REQUEST,
     UPLOAD_RESUME_FAILED, UPLOAD_RESUME_SUCCESS , DOWNLOAD_RESUME_FAILED} = require("./employeeActionTypes")


 const initialState = {};

 const employeeReducer = (state = initialState, action) =>
 {
    switch(action.type){
        case FETCH_ALL_EMPLOYEE_REQUEST :
            return {
                ...state,
                loading : true
            }
            case FETCH_ALL_EMPLOYEE_SUCCESS :
                return {
                    loading: false,
                    error: '',
                    allEmployeeDetails : action.payload,
                    downloadResumeError : '',
                uploadResumeError : ''
                }
        case FETCH_ALL_EMPLOYEE_ERROR :
            return {
                loading : false,
                allEmployeeDetails: {},
                error:   action.payload,
                downloadResumeError : '',
                downloadResumeError : '',
                uploadResumeError : ''
            } 
        case UPLOAD_RESUME_SUCCESS :
            return {
                loading : false,
                ...state,
                resumeUploaded:   true,
                downloadResumeError : '',
                uploadResumeError : ''
            }
        case UPLOAD_RESUME_FAILED :
            return {
                loading : false,
                ...state,
                uploadResumeError: action.payload,
                downloadResumeError : '',
            } 
        case DOWNLOAD_RESUME_FAILED :
            return {
                loading : false,
                ...state,
                downloadResumeError: action.payload,
                uploadResumeError : ''
            } 
            
        default : return state
    }
}

export default employeeReducer