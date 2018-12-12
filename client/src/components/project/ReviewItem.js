import React from 'react'
import {Link} from 'react-router-dom'

export default function ReviewItem(props) {
    const {review, projectid} = props;
  return (
    <div className="card mb-3" >
                
                <div className="card-body row">
                  <div className="col-md-2 d-none d-md-inline text-center">
                    <img className="rounded-circle" src={review.avatar} alt=""/>
                    <p>{review.name}</p>
                  </div>
                  
                  <div className="col-md-4">
                    <Link to={`/projects/reviews/${projectid}/${review._id}`}>
                      details
                    </Link>
                    
                    <p className="text-muted">
                        PRICE: {review.Price}
                    </p>
                    <p className="text-muted">
                        Volume: {review.Volume}
                    </p>
                  </div>

                  <div className="col-md-3 d-none d-md-block text-center">
                    <div className="h-50">
                      <h4>{review.BusinessRate}</h4>
                      <p className="small"> BUSINESS </p> 
                    </div>
                    <div className="h-50">
                      <h4> {review.TechRate}</h4>
                    <p className="small"> TECHNOLOGY </p> 
                    </div>
                  </div>
                  <div className="col-md-3 d-none d-md-block text-center">
                    <div className="h-50">
                      <h4>{review.TeamRate} </h4>
                    <p className="small"> TEAM </p> 
                    </div>
                    <div className="h-50">
                      <h4>{review.CompletionRate}</h4>
                    <p className="small"> COMPLETION</p> 
                    </div>
                  </div>
                 
                </div>
    </div>

  )
}
