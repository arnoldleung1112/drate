
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {loginUser} from '../../actions/authActions'
import {connect} from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
class Login extends Component {

  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      errors:''
    };
  }

  handleOnChange=(e)=>{
    
    this.setState(
      {
        [e.target.name]:e.target.value
      }
    )
  }

  onSubmit = (e)=>{
    e.preventDefault();
    const newUser = {
      email:this.state.email,
      password:this.state.password,
 
    };
    this.props.loginUser(newUser);

  }

  componentDidMount(){
    //if we are logged in redirect to dashboard
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    };
    }


  render() {
    const {errors} = this.state


    return (
    <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>
          <form onSubmit={this.onSubmit}>

            <TextFieldGroup 
            name="email"
            placeHolder="email" 
            type="email" 
            value={this.state.email} 
            onChange={this.handleOnChange} 
            error = {errors.email}
            />

            <TextFieldGroup 
            name="password"
            placeHolder="password" 
            type="password" 
            value={this.state.password} 
            onChange={this.handleOnChange} 
            error = {errors.password}
            />

                     
          <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

const mapStatetoProps = (state)=>({
  auth: state.auth,
  errors: state.errors
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStatetoProps, {loginUser})(Login);