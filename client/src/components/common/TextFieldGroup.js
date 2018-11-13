import React from 'react'
import classnames from 'classnames'
import propTypes from 'prop-types'

var TextFieldGroup = ({
    name,
    placeHolder,
    value,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
  return (
    <div className="form-group">
            <input type= {type}
              className={classnames("form-control form-control-lg", 
                        {"is-invalid":error}
                        )}
              placeholder={placeHolder}
              value={value} 
              onChange={onChange} 
              name={name} 
              diabled={disabled} />
              
              { info && <small className="form-text text-muted"> {info} </small>}
              { error && (<div className="invalid-feedback"> {error} </div>)}
              
              
    </div>
    )
}

TextFieldGroup.propTypes ={
    name: propTypes.string.isRequired,
    placeHolder: propTypes.string,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    disabled: propTypes.string
}

TextFieldGroup.defaultProps ={
    type: "text"
}

export default TextFieldGroup;