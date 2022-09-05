import React from 'react'
import IRadioCardWrapper from './IRadioCardWrapper'
import Label from './RadioCardWrapper.css'

const RadioCardWrapper = ({ name, children, id, isChecked, value, isRecommended, clickHandler, selectedConfig }: IRadioCardWrapper) => {
  return (
    <Label htmlFor={name}>
      <div className={`radio-card ${ isChecked && ( selectedConfig?.className || "selected-rc-green")} ${ isRecommended && "is-recommended" }`} onClick={() => clickHandler()}>
          <div className="inp-container">
              <input type="radio" name={name} id={id} checked={isChecked} value={value} />
              <span className="checkmark"></span>
          </div>
          <div className="content-container">
              {children}
          </div>
      </div>
  </Label>
  )
}

export default RadioCardWrapper
