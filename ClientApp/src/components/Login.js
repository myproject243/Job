import React, { useState } from 'react';
import { connect , useDispatch} from 'react-redux'
import { authenticateUsers } from '../redux/user/userAction'
import  '../w3.css'

const Login = (props) => {
    const[userName, setUserName] = useState('');
    const[password, setPassword] = useState('');

  const handleInput = (e)=>{
    setUserName(e.target.value);
  }

  const   authenticateUsersClick = () =>{
        var data = {
            "UserName" : userName,
            "Password" : password,
        }
        console.log('user login data is ...' )
        this.auth()
    }

    const changeHandler = (e) =>{
        setPassword(e.target.value);
      }

      const onLoginButtonClick = () => {
        let data = {
            "UserName" : userName,
            "Password" : password ,
        }
        if((data.UserName && data.Password) == '') {
            alert("please enter user details !");
            return
        }
        // let data = {
        //     "UserName" : "Alex",
        //     "Password" : "1234",
        // }
        props.callbackHandler(
          "Login_task",
          data,
        );
      };
      const  onResetButtonClick = () => {
        setUserName('')
        setPassword('')
          props.callbackHandler (
              "Reset_login_form"
          )
      }
   
      const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
           onLoginButtonClick()
        }
      }
      return(
            <div>
            <div className="LoginPageMain">
                <div className="w3-modal-content w3-card-4 w3-animate-zoom" ></div>
                <div className="w3-center"><br></br>
                </div>

                <div className="w3-container">
                    <div className="w3-section">
                      <background>  </background>
                      <div>
                        <h1>
                          <indent>FREE JOB SEARCH</indent>
                        </h1>
                      </div>
                        <label><b>UserName </b></label>
                        <input name="UserName"  onKeyDown={_handleKeyDown} value ={userName} onChange={handleInput}  className="w3-input w3-border w3-margin-bottom" type="text"   />
                        <label><b>Password</b></label>
                        <input name="Password"  onKeyDown={_handleKeyDown} value={password} onChange={changeHandler} class="w3-input w3-border" type="password"   />
                    </div>
                </div>
                <div >
                <button onClick={onLoginButtonClick} style={{margin:"10px"}}>Login</button>
                <button onClick={onResetButtonClick}>Reset</button>

                <div style={{color: "red", margin: "10px", fontWeight:"bold", fontSize:"25px"}}>
                    <label>{props.loginError}</label>
                </div>
            </div>
        </div>

        <div>
          
        </div>
      </div>
      )
}
export default Login