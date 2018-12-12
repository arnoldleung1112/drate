import React, { Component } from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {getCurrentProfile, DeleteAccount} from '../../actions/profileAction'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick = ()=>{
      this.props.DeleteAccount();
    }

    render() {
      const { user } = this.props.auth;
      const { profile, loading } = this.props.profile;
      
      let dashBoardContent;

      if(profile === null || loading){
        dashBoardContent = <Spinner />;
      } else {
        //chekc if logged in user has profile data
        if(Object.keys(profile).length > 0){
          dashBoardContent=(
              <div>
                <p className="lead text-muted">
                  Welcome  <Link to= {`/profile/${profile.handle}`}>{user.name}</Link>
                </p>

                <div className="card mb-3">
                  <div className="card-body">
                    <h2>Account</h2>
                    <p> BALANCE: {user.balance} DRT </p>
                  </div>
                </div>
                
                <h2> Porfile </h2>
                <ProfileActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
              <div style={{ marginBottom: '60px' }} />
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
              
            </div>
            ) 
        } else{
          dashBoardContent=(
            <div>
              <p className="lead text-muted">Welcome {user.name}</p>
              <p>You do not have a profile, please setup one</p>
              <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile</Link>
            </div>
          )
        }
      }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ( {
  profile: state.profile,
  auth: state.auth
})

Dashboard.proTypes={
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired
}

export default connect(mapStatetoProps, {getCurrentProfile, DeleteAccount})(Dashboard)