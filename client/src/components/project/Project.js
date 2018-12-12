import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner'
import {getProject} from '../../actions/projectActions'
import logo from '../../img/logo.png'
import Reviews from './ReviewFeed'
import StarRatings from 'react-star-ratings';

class Project extends Component {
    componentDidMount(){
        this.props.getProject(this.props.match.params.projectId);
    }
  
    render() {
        const { project} = this.props.project;

    return (
      <div className="project">
        <div className="container">
            <div className="row">
                {/* left column */}
            <div className="col-md-8">
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
                      <Link to={`/reviewResult/${project._id}`}>Result</Link>
                  </div>

                  <div className="col-md-2 d-none d-md-block text-center">
                    <div className="h-50">
                      <h4>{project.avgBusinessRate && project.avgBusinessRate.toPrecision(2)}</h4>
                      <p className="small"> BUSINESS </p> 
                    </div>
                    <div className="h-50">
                      <h4>{project.avgTechRate && project.avgTechRate.toPrecision(2)} </h4>
                    <p className="small"> TECHNOLOGY</p> 
                    </div>
                  </div>
                  <div className="col-md-2 d-none d-md-block text-center">
                    <div className="h-50">
                      <h4> {project.avgTeamRate && project.avgTeamRate.toPrecision(2)}  </h4>
                    <p className="small"> TEAM</p> 
                    </div>
                    <div className="h-50">
                      <h4>{project.avgCompletionRate && project.avgCompletionRate.toPrecision(2)} </h4>
                    <p className="small"> COMPLETION</p> 
                    </div>
                  </div>
                  
                </div>
                <div className="card-body">
                  
                  <p>
                  {project.desc}
                  </p>
                  <div className="badge badge-secondary mr-3">ERC20</div>
                  <div className="badge badge-secondary mr-3">GAMING</div>
                  <div className="badge badge-secondary mr-3">FINANCE</div>
                </div>
              </div>
              {/* end of top card */}
                <div>
                    <h1>
                    Ratings/Reviews
                    </h1>
                    <Link to={`/create-review/${project._id}`} className="btn btn-primary mb-3"> Submit your review </Link>
                    <Reviews project={project}/>
                </div>
            </div>
                {/* end of left column */}

                {/* right column */}
                <div className="col-md-4">
                    <div className="card p-3 mb-3 text-center">
                        <h4 className="mx-auto">
                            aggregate rating
                        </h4>
                        <h1 className="mx-auto">
                        <StarRatings
                            rating={project.avgBusinessRate && (project.avgBusinessRate + project.avgTeamRate + project.avgTechRate+project.avgCompletionRate) /4}
                            starRatedColor="blue"
                            numberOfStars={5}
                            name='rating'
                        />
                            {((project.avgBusinessRate + project.avgTeamRate + project.avgTechRate+project.avgCompletionRate) /4).toPrecision(2)}
                        </h1>
                        <h4 className="mx-auto">
                            aggregate target price
                        </h4>
                        <h1 className="mx-auto">
                            {project.avgPrice && project.avgPrice.toPrecision(2)} USD
                        </h1>
                        <h4 className="mx-auto">
                            aggregate target Volume
                        </h4>
                        <h1 className="mx-auto">
                            {project.avgVolume && project.avgVolume.toPrecision(2)} M USD
                        </h1>
                        <p className="text-muted mx-auto">
                            average of {project.Review && project.Review.length} reviews
                        </p>
                    </div>
                    <div className="card mb-3">
                        <div className="row p-3">
                            <h2 className="p-3">
                                Basic Info
                            </h2>
                        </div>
                        <div className="row p-3">
                            <div className="col-6">
                                Token  
                            </div>
                            <div className="col-6">
                                {project.Token}
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-6">
                            ICOPrice  
                            </div>
                            <div className="col-6">
                                {project.ICOPrice}
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-6">
                            Platform  
                            </div>
                            <div className="col-6">
                                {project.Platform}
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-6">
                            Country  
                            </div>
                            <div className="col-6">
                                {project.Country}
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-6">
                            Whitepaper  
                            </div>
                            <div className="col-6">
                                {project.Whitepaper}
                            </div>
                        </div>
                        

            
                    </div>
                </div>
                {/* end of right column */}
            </div>
        </div>
      </div>
    )
  }
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    getProject: PropTypes.func.isRequired
}

const mapStatetoProps = (state)=>({
    project:state.project,
    getProject: state.getProject
})

export default connect(mapStatetoProps,{getProject})(Project);
