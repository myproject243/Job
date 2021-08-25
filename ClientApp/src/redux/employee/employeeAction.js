import { CREATE_EMPLOYEE_FAILURE,UPLOAD_FILE_SUCCESS,UPLOAD_FILE_FAILURE,UPLOAD_RESUME_FAILED, UPLOAD_RESUME_SUCCESS,
    FETCH_ALL_EMPLOYEE_ERROR,FETCH_ALL_EMPLOYEE_REQUEST, FETCH_ALL_EMPLOYEE_SUCCESS,DOWNLOAD_RESUME_SUCCESS, DOWNLOAD_RESUME_FAILED
   } from "./employeeActionTypes"

import { genericCall, postCall } from "../gateway"

 
export const fetchAllEmployeesRequest= error => {
    return {
        type : FETCH_ALL_EMPLOYEE_REQUEST ,
    }
}
export const fetchAllEmployeesError= error => {
    return {
        type : FETCH_ALL_EMPLOYEE_ERROR ,
        payload : error
    }
}

export const fetchAllEmployeeSuccess = data => {
    return {
        type : FETCH_ALL_EMPLOYEE_SUCCESS ,
        payload : data
    }
}
export const uploadStatusSuccess = data => {
    return {
        type : UPLOAD_RESUME_SUCCESS ,
        payload : data
    }
}
export const uploadStatusFailed = error => {
    return {
        type : UPLOAD_RESUME_FAILED ,
        payload : error
    }
}


export const downloadResumeSuccess = error => {
    return {
        type : DOWNLOAD_RESUME_SUCCESS ,
        payload : error
    }
}
export const downloadResumeFailed = error => {
    return {
        type : DOWNLOAD_RESUME_FAILED ,
        payload : error
    }
}

export  const   fetchAllEmployees  =  () => {
    return async (dispatch) => {
        dispatch(fetchAllEmployeesRequest)
        let response = await genericCall('api/candidate', 'get')
        if( response && (response.status === 200)){
                        dispatch(fetchAllEmployeeSuccess(response.data))
                        }
        else {
                 dispatch(fetchAllEmployeesError(response.error))
             }
        }
    }

    export const uploadResume =  (file, fileName) => {
        return async (dispatch) => {
                const formData = new FormData();
                formData.append("formFile", file);
                formData.append("FileName", fileName);
                try {
                    const res = await genericCall("api/candidate/UploadResume/", formData, 'post') // axios.post("https://localhost:44315/api/candidate/UploadResume/", formData);
                    console.log(res);
                    if(res && (res.status == 201)) {
                        dispatch(uploadStatusSuccess('success'))
                    }
                    else
                    dispatch(uploadStatusFailed('error occoured in upload, check logs!'))
                }
                catch(ex){
                    console.log(ex);
                    dispatch(uploadStatusFailed(ex || ex.message))
                }
            }
        }


export const downloadCandidateResume = (cId) =>
{
    return async (dispatch) => {
        try {
            const res = await genericCall("/" + cId + ".docx", 'get') 
            console.log(res);
            if(res && (res.status == 200)) {
                dispatch(downloadResumeSuccess('success'))
            }
            else  if(res.status == 404) {
                dispatch(downloadResumeSuccess('File with the candidate Id is not avaialble'))
            }
            else
            dispatch(downloadResumeFailed('error occoured in upload, check logs!'))
        }
        catch(ex){
            console.log(ex);
            dispatch(downloadResumeFailed(ex || ex.message))
        }
    }
}

export const createEmployeeFailure = error => {
    return {
        type : CREATE_EMPLOYEE_FAILURE,
        payload : error
    }
}
export const uploadFileSuccess = data => {
    return {
        type : UPLOAD_FILE_SUCCESS,
        payload : data
    }
}

export const uploadFileFailure = error => {
    return {
        type : UPLOAD_FILE_FAILURE,
        payload : error
    }
}


export const uploadFile = async (file, fileName) => {
    return async (dispatch) => {
        console.log(file);
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("formName", fileName);
        try {
            const res = await genericCall("candidate/UploadResume/", formData, 'post');
            console.log(res);
            if(res && (res.status == 201)){
                dispatch(uploadFileSuccess('success'))
            }
            else{
                dispatch(uploadFileFailure(res.error))
            }
        }
        catch(ex){
            console.log(ex);
            alert(ex);
        }
    }
 }