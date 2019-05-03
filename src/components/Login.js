import React, { Component } from 'react';
import AuthService from './AuthService';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn()) 
            this.props.history.replace('/');
        
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                <div className="card-group">
                    <div className="card p-4">
                    <div className="card-body">
                        <form onSubmit={this.handleFormSubmit}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="icon-user"></i>
                            </span>
                        </div>
                        <input className="form-control" name="email" type="text" placeholder="User name" 
                            onChange={this.handleChange}/>
                        </div>
                        <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="icon-lock"></i>
                            </span>
                        </div>
                        <input className="form-control" name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                        </div>
                        <div className="row">
                        <div className="col-6">
                            <input className="btn btn-primary px-4" type="submit" value="Submit"/>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-link px-0" type="button">Forgot password?</button>
                        </div>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <div className="card-body text-center">
                        <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button className="btn btn-primary active mt-3" type="button">Register Now!</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
        );
    }

    handleFormSubmit(e){
        e.preventDefault();
		
        /*this.Auth.login(this.state.email,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })*/
		try{
			//this.Auth.dialogFlowLogin(this.state.email,this.state.password)
            console.log('input request from google....');
            const urlParams = new URLSearchParams(this.props.location.search)
            const redirect_uri = urlParams.get('redirect_uri')
            const client_id = urlParams.get('client_id')
            const state = urlParams.get('state')
            const scope = urlParams.get('scope')
            const response_type = urlParams.get('response_type')


			this.Auth.login(this.state.email,this.state.password)
				.then(res =>{
				   this.props.history.replace('/');
				})
				.catch(err =>{
					alert(err);
				})
            var access_token = Math.random().toString(36).substring(10) + '_SRI_testACt1234556';
            var redirectToGoogle = 'https://oauth-redirect.googleusercontent.com/r/testsignin-bc22d#access_token=' + access_token + '&token_type=bearer&state=' + state + '&name=Srinivas&empId=300214'
            console.log('redirect_uri params...' + redirectToGoogle);
            /*fetch(redirectToGoogle, {mode: 'cors'})
                .then(response =>  response.json())
                .then(resData => console.log(resData))*/
            /*const proxyurl = "https://cors-anywhere.herokuapp.com/";
            fetch(proxyurl + redirectToGoogle)
                .then(function(data) {
                    console.log(data);
                })
                .catch(function(error) {
                    console.log(error);
                });
            */
            window.location.href = redirectToGoogle;

        } catch (error ){
		}
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}

export default Login;
