import React, {useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const[file, setFile] = useState();
    const[fileName, setFileName] = useState();
    const[uploadStatus, setUploadStatus] = useState('');

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const uploadFile = async (e) => {
        console.log(file);
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("formName", fileName);
        try {
            const res = await axios.post("https://localhost:44315/api/candidate/UploadResume/", formData);
            console.log(res);
            if(res && (res.status == 201)){
                setUploadStatus('success')
            }
        }
        catch(ex){
            console.log(ex);
            alert(ex);
        }
    }

    return (
        <div>
            <input type="file" onChange={saveFile} />
            <input type="button" value="upload" onClick={uploadFile} />
            <div id="uploadStatus">{uploadStatus}</div>
        </div>
    )
}

export default FileUpload