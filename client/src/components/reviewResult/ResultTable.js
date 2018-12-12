import React from 'react'
import {Link} from 'react-router-dom'

function ResultTable(props) {
    const {project} = props;

    
    const reviewContent = project.Review && project.Review.map(
        (review, index) => {
         

         return   (
            <tr key={review._id}>
                <td> {index+1}</td>
                <td><Link to={`/projects/reviews/${project._id}/${review._id}`}> {review._id} </Link> </td>
                <td>{review.name}</td>
                <td>10</td>
            </tr>
       )}
    )

    

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <td>Accuracy ranking</td>
                        <td>report ID</td>
                        <td>Analyst</td>
                        <td>Reward</td>
                    </tr>
                </thead>
                <tbody>
                    {reviewContent}
                </tbody>
            </table>
        </div>
    )
}
    
export default ResultTable
