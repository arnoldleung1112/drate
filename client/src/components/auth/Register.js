
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'

//redux setup
import { connect } from 'react-redux';
//redux actions
import {registerUser} from '../../actions/authActions'

class Register extends Component {
  constructor(){
    super();
    this.state={
      name:'',
      email:'',
      password:'',
      password2:'',
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
  }
  onSubmit = (e)=>{
    e.preventDefault();
    const newUser = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2
    };
    console.log(newUser);

    this.props.registerUser(newUser,this.props.history);
    // axios.post('/api/users/register',newUser)
    // .then(res=> console.log(res.data))
    // .catch((err)=>{
    //   console.log(err.response.data);
    //   this.setState({errors:err.response.data})

    // });



  }

  render() {
    
    const {errors} = this.state; 
    
    return (
  <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form onSubmit={this.onSubmit}>

            <TextFieldGroup 
              name="name"
              type="text"
              placeHolder="Name" 
              value={this.state.name} 
              onChange={this.handleOnChange} 
              error = {errors.name}
            />
            
            <TextFieldGroup 
              name="email"
              type="email"
              placeHolder="email" 
              value={this.state.email} 
              onChange={this.handleOnChange} 
              error = {errors.email}
              info = "This site uses Gravatar so if you want a profile image, use a Gravatar email"
            />

            <TextFieldGroup 
              name="password"
              type="password"
              placeHolder="password" 
              value={this.state.password} 
              onChange={this.handleOnChange} 
              error = {errors.password}
            />
            <TextFieldGroup 
              name="password2"
              type="password"
              placeHolder="confirm password" 
              value={this.state.password2} 
              onChange={this.handleOnChange} 
              error = {errors.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  errors:state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register))