import React from 'react'

const FormSelect = ({ label, options, isError, ...rest }) => {
  return (
    <div>
      <label>
        <span className={isError ? 'error' : ''}>{label} : </span>
        <select {...rest}>
          {options.map((option, i) => (
            <option value={i} key={i}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FormSelect
