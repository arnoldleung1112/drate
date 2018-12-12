import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import SelectListGroup from '../common/SelectListGroup';
// import InputGroup from '../common/InputGroup';
import logo from '../../img/logo.png'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import {addReview, getProject} from '../../actions/projectActions'
import { withRouter } from 'react-router-dom';

class CreateReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            Price:'',
            Volume:'',
            Business:'',
            BusinessRate:'',
            Tech:'',
            TechRate:'',
            Team:'',
            TeamRate:'',
            Completion:'',
            CompletionRate:'',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    componentDidMount(){
        this.props.getProject(this.props.match.params.projectid);
    }

    onChange = (e) =>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const reviewData ={
            
            Price:this.state.Price,
            Volume:this.state.Volume,
            Business:this.state.Business,
            BusinessRate:this.state.BusinessRate,
            Tech: this.state.Tech,
            TechRate:this.state.TechRate,
            Team:this.state.Team,
            TeamRate:this.state.TeamRate,
            Completion:this.state.Completion,
            CompletionRate:this.state.CompletionRate
        }
        this.props.addReview(this.props.match.params.projectid, reviewData, this.props.history);
        
    }

    render() {
        const {errors} = this.state;
        const {project} = this.props.project;
    return (
      <div className="review">
          <div className="container">
              <div className="row">
                  <div className="col-12">
                  <div className="card mb-3" >
                    <div className="card-header row">

                    <div className="col-md-2 d-none d-md-inline">
                        <img className="rounded-circle" src={project.Thumbnail} alt=""/>
                    </div>
                    
                    <div className="col-md-4">
                        <h3>
                        {project.title}
                        </h3>
                        <p className="text-muted">
                            {project.slogan}
                        </p>
                    </div>
    
                    </div>
                    <div className="card-body">
                    
                    <p>
                    {project.desc}
                    </p>
                    <div className="badge badge-secondary mr-3">tag 1</div>
                    <div className="badge badge-secondary mr-3">tag 2</div>
                    <div className="badge badge-secondary mr-3">tag 3</div>
                    </div>
                </div>
                  </div>
              </div>
              {/* end of header card row */}
              <div className="row">
                <div className="col-8 m-auto">
                    <h1 className="display-4 text-center">
                                Add Review
                                <p className="lead text-center">
                                    Give us your best analysis and prediction!
                                    <small className="d-block pb-3">
                                    * are required fields
                                    </small>
                                </p>
                    </h1>
                </div>
              </div>
                  
                {/* end of header */}

                {/* start of submit form */}
                
                <div className="col-8 m-auto">

                    

                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup 
                        placeHolder="* Predicted Price "
                        name="Price"
                        value={this.state.Price}
                        onChange={this.onChange}
                        error={errors.Price}
                        info="Predicted price"
                    />
                    <TextFieldGroup 
                        placeHolder="* Predicted Volume "
                        name="Volume"
                        value={this.state.Volume}
                        onChange={this.onChange}
                        error={errors.Volume}
                        info="Predicted Volume"
                    />

                    <Tabs>
                        <TabList>
                        <Tab>BUSINESS USE CASE</Tab>
                        <Tab>TECHNOLOGY</Tab>
                        <Tab>TEAM</Tab>
                        <Tab>COMPLETION</Tab>
                        </TabList>

                        <TabPanel>
                            <TextFieldGroup 
                                placeHolder="* Business rating out of 5 "
                                name="BusinessRate"
                                value={this.state.BusinessRate}
                                onChange={this.onChange}
                                error={errors.BusinessRate}
                                info="Business Rating out of 5 "
                            />
                            <TextAreaFieldGroup
                                placeholder="Analysis of business use case"
                                name="Business"
                                value={this.state.Business}
                                onChange={this.onChange}
                                error={errors.Business}
                                info="Analysis of business use case"
                            />
                        </TabPanel>
                        <TabPanel>
                            <TextFieldGroup 
                                placeHolder="* Technology rating out of 5 "
                                name="TechRate"
                                value={this.state.TechRate}
                                onChange={this.onChange}
                                error={errors.TechRate}
                                info="Technology Rating out of 5 "
                            />
                            <TextAreaFieldGroup
                                placeholder="Analysis of Technology"
                                name="Tech"
                                value={this.state.Tech}
                                onChange={this.onChange}
                                error={errors.Tech}
                                info="Analysis of Technology use case"
                            />
                        </TabPanel>
                        <TabPanel>
                            <TextFieldGroup 
                                placeHolder="* Team rating out of 5 "
                                name="TeamRate"
                                value={this.state.TeamRate}
                                onChange={this.onChange}
                                error={errors.TeamRate}
                                info="Team Rating out of 5 "
                            />
                            <TextAreaFieldGroup
                                placeholder="Analysis of Team"
                                name="Team"
                                value={this.state.Team}
                                onChange={this.onChange}
                                error={errors.Team}
                                info="Analysis of Team"
                            />
                        </TabPanel>
                        <TabPanel>
                            <TextFieldGroup 
                                placeHolder="* Completion rating out of 5 "
                                name="CompletionRate"
                                value={this.state.CompletionRate}
                                onChange={this.onChange}
                                error={errors.CompletionRate}
                                info="Completion Rating out of 5 "
                            />
                            <TextAreaFieldGroup
                                placeholder="Analysis of Completion"
                                name="Completion"
                                value={this.state.Completion}
                                onChange={this.onChange}
                                error={errors.Completion}
                                info="Analysis of Completion"
                            />
                        </TabPanel>

                    </Tabs>
 
                    
                    <input type="submit" value="Submit" className='btn btn-info btn-block mt-4'/>
                        
                </form>

                </div>
                
                
          </div>
      </div>

    )
  }
}
CreateReview.propTypes ={
    project:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    addReview: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired
}

const mapStatetoProps = state=>({
            project:state.project,
            errors: state.errors,

})


export default connect(mapStatetoProps,{addReview, getProject})(withRouter(CreateReview))
