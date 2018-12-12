import React from 'react'
import ReviewItem from './ReviewItem'

function ReviewFeed(props) {
    const {project} = props;
    
    
       const reviewContent = project.Review && project.Review.map( review => {
            return (
                <div key={review._id}>
                    
                    <ReviewItem review={review} projectid={project._id}/>
                </div>
            )
        })
    

  return (
      
    <div>
      {reviewContent}
    </div>
  )
}

export default ReviewFeed
