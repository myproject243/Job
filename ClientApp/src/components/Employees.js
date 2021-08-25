import React, { useState, useEffect } from 'react'
import { connect, useDispatch} from 'react-redux'

import { fetchAllEmployees, uploadResume, downloadCandidateResume } from '../redux/employee/employeeAction'

const Employees  = (props) => {
  const[file, setFile] = useState();
  const[fileName, setFileName] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchAllEmployees())
    }, [] );

    const list = props.state.employees.allEmployeeDetails

    const uploadFile = (name) =>
    {
      dispatch(uploadResume(file, name))
    }
    const saveFile = (e) => {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
  }
  const downloadResume = (id) => 
  {
    dispatch(downloadCandidateResume(id))
  }
    return (
        <div className="input-field col s4">
            <h1>List of candidates</h1>
            {list &&
                <div>                  
                    <table id="employeeList">
                    <th key="0">
                            <td>Id</td>
                            <td>First Name</td>
                            <td>Experience</td>
                            <td>Mobile</td>
                            <td>Location</td>
                            <td>Email</td>
                            <td>Resume</td>
                            <td>Upload new</td>
                            <td>Upload new</td>
                          </th>
                        {list.map(item => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.year}</td>
                            <td>{item.mobile}</td>
                            <td>{item.location}</td>
                            <td>{item.email}</td>
                            <td><input type="button" value="download" onClick={() => downloadResume(item.id)} /></td>
                            <td>
                               <input type="file" onChange={saveFile} />
                             </td>
                             <td>
                                 <input type="button" value="upload" onClick={() => uploadFile(item.id)} />
                             </td>
                          </tr>
                        ))}
                      </table>
                </div>
              }
              { !list && 
                    <p>List is not found</p>
              }
              <div>{
                   props.state.employees.downloadResumeError &&
                    <p>
                      "Error occoured in downloading resume : " 
                      { props.state.employees.downloadResumeError}
                      
                    </p>
               }</div>
                <div>{
                   props.state.employees.uploadResumeError &&
                    <p>
                      "Error occoured in uploading resume : " 
                      { props.state.employees.uploadResumeError}
                      
                    </p>
               }</div>
         </div>
    )
}

const mapStateToProps = state => {
  return {
      state : state
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);