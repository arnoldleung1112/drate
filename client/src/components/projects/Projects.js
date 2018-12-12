import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProjects } from '../../actions/projectActions';
import logo from '../../img/logo.png'
import ProjectItem from './ProjectItem'

class Projects extends Component {
  componentDidMount(){
    this.props.getProjects();
  }
  render() {
    const {projects,errors} = this.props.project;
    console.log(projects);

    const projectContent = projects.map(project => <ProjectItem key={project._id} Project={project}/>)


    return (
      <div>
        <div className="container">
          <div className="row">

              <div className="col-md-3">
                {/* search bar here */}

                <div className="card">
                  <div className="card-body">

                    <p>Search:</p>
                    <input className="mb-3" type="text"/>
                    
                    <p>Categlory</p>
                    <input className="mb-3" type="text"/>

                    <p>Platform</p>
                    <input className="mb-3" type="text"/>

                    <button className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              <div className="col-md-2">
              </div>
              {/* search bar ends here */}
              </div>
              
              <div className="col-md-9">
                {/* item starts here */}


                {projectContent}
                
                {/* item ends here */}
              </div>
         
          </div>
        </div>
      </div>
    )
  }
}

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjects })(Projects);