import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addExperience} from '../../actions/profileAction'
/* TODO: Add the acction */

class AddExperience extends Component {
  constructor(Props){
    super(Props)
    this.state={
      title:'',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors:{},
      disabled: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
    
  }

  onSubmit = (e)=>{
    e.preventDefault();
      const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    
    this.props.addExperience(expData, this.props.history);
  }

  onCheck = (e)=> {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const {errors} = this.state
    return (
      <div className="section add-experience">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <Link to="dashboard" className="btn btn-light">
            Go Back
          </Link>
          <h1 className="display-4 text-center">Add Your Experience</h1>
          <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
          <small className="d-block pb-3">* = required field</small>
          <form action="add-experience" onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextFieldGroup 
                    placeHolder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                />  
            </div>
            <div className="form-group">
              <TextFieldGroup 
                    placeHolder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                />  
             </div>
            <div className="form-group">
              <TextFieldGroup 
                    placeHolder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                />
            </div>
            <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the the position"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

AddExperience.Proptypes={
  errors:Proptypes.object.isRequired ,
  addExperience: Proptypes.func.isRequired,
  profile: Proptypes.object.isRequired
}

const mapStatetoProps = (state)=> ({
  errors:state.errors,
  profile:state.profile
})

export default connect(mapStatetoProps,{addExperience})(withRouter(AddExperience));
