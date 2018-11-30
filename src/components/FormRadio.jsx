import React from 'react'

const FormRadio = ({ label, options, name, value, isError, ...rest }) => {
  return (
    <div>
      <span>{label} : </span>
      <br />
      {options.map((option, i) => (
        <div key={i}>
          <label>
            <input
              value={i}
              type="radio"
              name={name}
              checked={value && Number(value) === i && true}
              {...rest}
              className={isError ? 'error' : ''}
            />
            {option}
          </label>
          <br />
        </div>
      ))}
    </div>
  )
}

export default FormRadio
