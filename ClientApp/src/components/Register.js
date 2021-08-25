import React, { useState } from 'react';

const Register = () => {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword : "",
        mobilenumber : "",
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            alert('submitted')
           // sendDetailsToServer()    
        } else {
            alert('Passwords do not match')
           // props.showError('Passwords do not match');
        }
    }

    return(
        <div className="centerAlign card col-12 col-lg-4 login-card mt-2 hv-center">
            <form style={{ margin: "15px" }}>

        <div>
              <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group text-left">
                <label htmlFor="exampleInputMobilenumber">Mobile Number</label>
                    <input type="text" 
                        className="form-control" 
                        id="mobilenumber" 
                        placeholder="mobile number"
                        value={state.mobilenumber}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}>
                    Register
                </button>
            </form>

        </div>
    )

}

export default Register