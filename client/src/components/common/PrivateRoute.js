import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'

const PrivateRoute = ({component: Component, auth, ...rest})=>(
  <Route
    {...rest}
    render = {
      props => auth.isAuthenticated === true ?
        (<Component {...props} />)
        :
        (<Redirect to="/login" />)
    }
  /> 
  )


const mappStateToProps = (state)=>({
    auth:state.auth,
});

PrivateRoute.propTypes ={
  auth: Proptypes.object.isRequired
}

export default connect(mappStateToProps,{})(PrivateRoute);