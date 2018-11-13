import React, { Component } from 'react'
import Moment from 'react-moment'
import {deleteExperience} from '../../actions/profileAction'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Experience extends Component {
    onClick = (id)=>{
        this.props.deleteExperience(id);
    }
  render() {
    
    const experience = (this.props.experience === undefined) ? null: this.props.experience.map(exp=>(
            <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={()=>{this.onClick(exp._id)}}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    
    return (
       <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}



export default connect(null,{deleteExperience})(Experience);