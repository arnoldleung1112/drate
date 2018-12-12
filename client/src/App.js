import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//redux setup
import {Provider} from 'react-redux';
import store from './store';

//components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NotFound from './components/not-found/NotFound'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import Projects from './components/projects/Projects'
import AddProject from './components/create-project/CreateProject'
import Project from './components/project/Project'
import AddReview from './components/create-review/CreateReview'
import Review from './components/review/Review'
import Imageloader from './components/imgUploader/imageUploader'
import ReviewResult from './components/reviewResult/ReviewResult'
//set auth header imports
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import {setCurrentUser, logoutUser} from './actions/authActions'
import {clearCurrentProfile} from './actions/profileAction'


//check localstore
  if(localStorage.jwtToken){
    
      //set auth token header
    setAuthToken(localStorage.jwtToken);
      //decode token
    const decoded = jwt_decode(localStorage.jwtToken);
    
      //dispatch set current user
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime = Date.now()/1000;
    
    if(decoded.exp < currentTime){
      //logout user
      store.dispatch(logoutUser());
      store.dispatch(clearCurrentProfile());
      //clear current profile
      window.location.href = '/login'
    }


}
    


class App extends Component {
  render() {



    return (
    <Provider store={store}>
     <BrowserRouter>
        <div className="App">
            < Navbar/>
                       
            < Route exact path="/" component={Landing} />
            <div className="continer">
            <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/projects" component={Projects}/>
              <Route exact path="/projects/:projectId" component={Project} />
              <Route exact path="/projects/reviews/:projectId/:reviewId" component={Review} />
              <Route exact path="/imageuploader" component={Imageloader} />
              <Route exact path="/reviewresult/:projectId" component={ReviewResult} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact path ="/feed"
                  component={Posts}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact path ="/post/:id"
                  component={Post}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact path ="/create-Project"
                  component={AddProject}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact path ="/create-review/:projectid"
                  component={AddReview}
                />
              </Switch>
              
              <Route exact path="/not-found" component={NotFound} />
            </div>
           
            < Footer />
        </div>
      </BrowserRouter>
    </Provider>
      
      
    );
  }
}

export default App;
