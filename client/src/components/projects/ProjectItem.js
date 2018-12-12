import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validations/is-empty';
import StarRatings from 'react-star-ratings';

class ProjectItem extends Component {
  render() {
    const { Project} = this.props;

    return (
      <div className="card mb-3" >
                <div className="card-header row">

                  <div className="col-md-2 d-none d-md-inline">
                    <img className="rounded-circle" src={Project.Thumbnail} alt=""/>
                  </div>
                  
                  <div className="col-md-4">
                    <Link to={`/projects/${Project._id}`}>
                      <h3>
                        {Project.title}
                      </h3>
                    </Link>
                    
                    <p className="text-muted">
                        {Project.slogan}
                    </p>
                    
                    
                  </div>
                  
                  <div className="col-md-2 d-none d-md-block text-center mt-auto mb-auto">
                      <h4>{Project.Jackpot} DRT</h4>
                      <p>JACKPOT</p>
                  </div>
                  
                  <div className="col-md-2 d-none d-md-block text-center">
                    <div className="h-50">
                      <h4>{Project.avgBusinessRate.toPrecision(2)}</h4>
                      
                      <p className="small"> BUSINESS </p> 
                    </div>
                    <div className="h-50">
                      <h4>{Project.avgTechRate.toPrecision(2)} </h4>
                    <p className="small"> TECHNOLOGY</p> 
                    </div>
                  </div>
                  <div className="col-md-2 d-none d-md-block text-center">
                    <div className="h-50">
                      <h4> {Project.avgTeamRate.toPrecision(2)}  </h4>
                    <p className="small"> TEAM</p> 
                    </div>
                    <div className="h-50">
                      <h4>{Project.avgCompletionRate.toPrecision(2)} </h4>
                    <p className="small"> COMPLETION</p> 
                    </div>
                  </div>
                  
                </div>
                <div className="card-body">
                  
                  <p>
                  {Project.desc}
                  </p>
                </div>
              </div>
    )
  }
}

ProjectItem.propTypes = {
  Project: PropTypes.object.isRequired
};

export default ProjectItem;
