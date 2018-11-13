import React from 'react'
import classnames from 'classnames'
import propTypes from 'prop-types'

var TextAreaFieldGroup = ({
    name,
    placeHolder,
    value,
    error,
    info,
    onChange
}) => {
  return (
    <div className="form-group">
            <textarea 
              className={classnames("form-control form-control-lg", 
                        {"is-invalid":error}
                        )}
              placeholder={placeHolder}
              value={value} 
              onChange={onChange} 
              name={name} 
              />
              { info && <small className="form-text text-muted"> {info} </small> }
              { error && (<div className="invalid-feedback"> {error} </div>)}
    </div>
    )
}

TextAreaFieldGroup.propTypes ={
    name: propTypes.string.isRequired,
    placeHolder: propTypes.string,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    onChange: propTypes.func.isRequired,

}



export default TextAreaFieldGroup;