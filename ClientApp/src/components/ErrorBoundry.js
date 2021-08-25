import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state ={
            hasError: false,
            stateError : ''
        }
    }

    static getDerivedStateFromError(error){
        return{
            hasError : true,
            stateError : error.toString()
        }
    }

    render() {
        if(this.state.hasError){
            return<div>
                <h1>{this.state.stateError}</h1>
                <h2>Something went wrong !</h2>
            </div> 
        }
        return this.props.children
        
    }
}


export default ErrorBoundry;