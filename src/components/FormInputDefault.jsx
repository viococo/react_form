import React from 'react'

const FormInputDefault = ({ label, isError, ...rest }) => {
  return (
    <div>
      <label>
        <span className={isError ? 'error' : ''}>{label} : </span>
        <input {...rest} />
      </label>
    </div>
  )
}

export default FormInputDefault
