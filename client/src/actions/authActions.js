
import axios from 'axios' 
import { GET_ERRORS, SET_CURRENT_USER } from './type'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//register user
export const registerUser = (userData,history) => dispatch => {
    axios.post('/api/users/register',userData)
    .then(res=> history.push('/login'))
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    )
}

export const loginUser = userData => dispatch => {

    axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;  
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>{
        
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );

}


// set logged in user
export const setCurrentUser = decoded => dispatch => {
    console.log(decoded);
    if (decoded.balance){
        axios.get('/api/users/current')
        .then(res=>{
            decoded.balance = res.data.balance;
            dispatch({
                type: SET_CURRENT_USER,
                payload: decoded
            })
    }).catch(err => console.log(err))
        
    }else{
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
    }
}

export const logoutUser = () => dispatch =>{
    //remove token from local Store
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    //set current user to {} which will set is Authenticated to false
    dispatch(setCurrentUser({}));
}
