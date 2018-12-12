import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../img/logo.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {getProject} from '../../actions/projectActions'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class Review extends Component {

componentDidMount(){
    this.props.getProject(this.props.match.params.projectId);
}

  render() {
    const {project,errors} = this.props.project
    const review = project.Review && project.Review.filter( review => review._id == this.props.match.params.reviewId)[0]
    console.log(review);
    return (
      <div className="Review">
        <div className="container">
          {/* start of top card */}
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
                  
                  <div className="col-md-2 d-none d-md-block text-center mt-auto mb-auto">
                      <h4>{project.Jackpot} DRT</h4>
                      <p>JACKPOT</p>
                  </div>


                  <div className="col-md-2 d-none d-md-block text-center">
                    <div className="h-33">
                      <h4>{project.avgBusinessRate && project.avgBusinessRate.toPrecision(2)} </h4>
                      <p className="small"> BUSINESS</p> 
                    </div>
                    <div className="h-33">
                      <h4>{project.avgTechRate && project.avgTechRate.toPrecision(2)}</h4>
                    <p className="small"> TECHNOLOGY  </p> 
                    </div>
                    <div className="h-33">
                      <h4>{project.avgPrice && project.avgPrice.toPrecision(2)} USD </h4>
                    <p className="big"> PRICE</p> 
                    </div>
                  </div>
                  <div className="col-md-2 d-none d-md-block text-center">
                    <div className="h-33">
                      <h4>{project.avgTeamRate && project.avgTeamRate.toPrecision(2)}</h4>
                    <p className="small"> TEAM  </p> 
                    </div>
                    <div className="h-33">
                      <h4>{project.avgCompletionRate && project.avgCompletionRate.toPrecision(2)} </h4>
                    <p className="small"> COMPLETION</p> 
                    </div>
                    <div className="h-33">
                      <h4>{project.avgVolume && project.avgVolume.toPrecision(2)} M USD</h4>
                    <p className="big"> Volume </p> 
                    </div>
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
        
        {/* end of top card */}
        <div className="row m-auto">
          <div className="col-12 m-auto text-center p-3 ">
            
              <h2>Target Price:  {review && review.Price} USD</h2>
              <h2>Target Volume: {review && review.Volume} M USD</h2>
    
          </div>
          <div className="col-2 text-center">
            <img className="rounded-circle" src={review && review.avatar} alt=""/>
            <h4> {review && review.name}</h4>
          </div>
            <div className="col-8 m-auto">
            <Tabs>
                        <TabList>
                        <Tab>BUSINESS USE CASE</Tab>
                        <Tab>TECHNOLOGY</Tab>
                        <Tab>TEAM</Tab>
                        <Tab>COMPLETION</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="p-3">
                              <h4>Business Use case rating: {review && review.BusinessRate}</h4>
                            </div>
                            <div>
                              <p className="text-muted small">Analysis:</p>
                              <p>{review && review.Business}</p>
                            </div>
                        </TabPanel>
                        <TabPanel>
                        <div className="p-3">
                              <h4>Technology rating: {review && review.TechRate}</h4>
                            </div>
                            <div>
                              <p className="text-muted small">Analysis:</p>
                              <p>{review && review.Tech}</p>
                            </div>
                        </TabPanel>
                        <TabPanel>
                        <div className="p-3">
                              <h4>Team rating: {review && review.TeamRate}</h4>
                            </div>
                            <div>
                              <p className="text-muted small">Analysis:</p>
                              <p>{review && review.Team}</p>
                            </div>
                        </TabPanel>
                        <TabPanel>
                        <div className="p-3">
                              <h4>Completion rating: {review && review.CompletionRate}</h4>
                            </div>
                            <div>
                              <p className="text-muted small">Analysis:</p>
                              <p>{review && review.Completion}</p>
                            </div>
                        </TabPanel>

                    </Tabs>    
            </div>
                    
          </div>
        </div>
                   
 
      
      </div>
    )
  }
}

Review.propTypes ={
  project:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
  getProject:PropTypes.func.isRequired
}

const mapStatetoProps = state=>({
          project:state.project,
          errors: state.errors,

})


export default connect(mapStatetoProps,{getProject})(Review)
