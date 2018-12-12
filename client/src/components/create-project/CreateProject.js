import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import SelectListGroup from '../common/SelectListGroup';
// import InputGroup from '../common/InputGroup';
import {addProject} from '../../actions/projectActions'
import { withRouter } from 'react-router-dom';


class CreateProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            slogan:'',
            desc:'',
            Token:'',
            ICOPrice:'',
            Platform:'',
            Country:'',
            Whitepaper:'',
            Thumbnail:null,
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const projectData ={
            title:this.state.title,
            slogan:this.state.slogan,
            desc:this.state.desc,
            Token:this.state.Token,
            ICOPrice: this.state.ICOPrice,
            Platform:this.state.Platform,
            Country:this.state.Country,
            Whitepaper:this.state.Whitepaper,
            Thumbnail:this.state.Thumbnail
        }
        
        this.props.addProject(projectData, this.props.history);
        
    }

    onChange = (e) =>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    
  
    onUploadImageChange = (e)=>{
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((file, i) => {
        formData.append(i, file)
        });
        
        if (files.length > 0){
            fetch('/api/util/image-upload', {
                method: 'POST',
                body: formData
              })
              .then(res => res.json({success:true}))
              .then(images => {
                this.setState({
                    ...this.state,
                    Thumbnail:images[0].secure_url
                })
              })
        }
    }
    
  render() {
    
    
    const {errors} = this.state;  
//select options for status


    const uploadImage = this.state.Thumbnail ? (
        <div className="col-4">
            <img src={this.state.Thumbnail} alt=""/>
        </div>
    ) : null;

    return (
        <div className="add-project">
        <div className="container">
            <div className="row">
                <div className="col-8 m-auto">
                    <h1 className="display-4 text-center">
                        Add Project
                        <p className="lead text-center">
                            Lets get some information to make your project
                            <small className="d-block pb-3">
                            * are required fields
                            </small>
                        </p>
                    </h1>
                        
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeHolder="* Project Name"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                                error={errors.title}
                                info="The name of your project"
                            />

                            <div className="form-group">
                                <input className="col-4" type="file" onChange={this.onUploadImageChange}/>
                                {uploadImage}
                            </div>
                            

                            <TextFieldGroup 
                                placeHolder="* Solgan"
                                name="slogan"
                                value={this.state.slogan}
                                onChange={this.onChange}
                                error={errors.title}
                                info="The slogan of your project"
                            />
                            <TextAreaFieldGroup
                                placeholder="Short Description"
                                name="desc"
                                value={this.state.desc}
                                onChange={this.onChange}
                                error={errors.desc}
                                info="Tell us a little about your project (max 200 words)"
                            />
                            <TextFieldGroup 
                                placeHolder="* Token Symbol e.g. BTC"
                                name="Token"
                                value={this.state.Token}
                                onChange={this.onChange}
                                error={errors.Token}
                                info="Token Symbol e.g. BTC"
                            />
                            <TextFieldGroup 
                                placeHolder="* ICO Price"
                                name="ICOPrice"
                                value={this.state.ICOPrice}
                                onChange={this.onChange}
                                error={errors.ICOPrice}
                                info="ICO Price"
                            />
                            <TextFieldGroup 
                                placeHolder="* Platform"
                                name="Platform"
                                value={this.state.Platform}
                                onChange={this.onChange}
                                error={errors.Platform}
                                info="Platform"
                            />
                            <TextFieldGroup
                                placeHolder="Country"
                                name="Country"
                                value={this.state.Country}
                                onChange={this.onChange}
                                error={errors.Country}
                                info="Country"
                            />
                            <TextFieldGroup
                                placeHolder="Whitepaper"
                                name="Whitepaper"
                                value={this.state.Whitepaper}
                                onChange={this.onChange}
                                error={errors.Whitepaper}
                                info="Whitepaper"
                            />
                            
                            <input type="submit" value="Submit" className='btn btn-info btn-block mt-4'/>
                        </form>
                    
                </div>
            </div>
        </div>
      </div>
    )
  }
}


CreateProject.propTypes ={
    project:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    addProject: PropTypes.func.isRequired
}

const mapStatetoProps = state=>({
            project:state.project,
            errors: state.errors
})


export default connect(mapStatetoProps,{addProject})(withRouter(CreateProject))
