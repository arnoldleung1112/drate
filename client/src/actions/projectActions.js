import {GET_PROJECTS, GET_PROJECT, GET_ERRORS, SET_CURRENT_USER} from "./type"
import axios from 'axios';

export const getProjects = ()=> dispatch =>{
    axios.get('/api/projects/all')
    .then(res=> dispatch({
        type: GET_PROJECTS,
        payload: res.data
    }))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
} 


export const addProject = (projectData,history)=> dispatch =>{
    axios.post('/api/projects',projectData)
    .then(res=> {
      axios.get('api/users/current')
      .then( res=> dispatch({
        type:SET_CURRENT_USER,
        payload: res.data
      })).catch(err => console.log(err))
      
      history.push('/projects')
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
} 

export const getProject = (id)=> dispatch =>{
  axios.get(`/api/projects/${id}`)
  .then(res=> dispatch({
      type: GET_PROJECT,
      payload: res.data
  }))
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
} 

export const addReview = (projectid, reviewData ,history) => dispatch => {
  axios.post(`/api/projects/reviews/${projectid}`,reviewData)
    .then(res=> history.push(`/projects/${projectid}`))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
}