import React, { ChangeEventHandler, FC, MouseEventHandler } from 'react'
import Toggle from './FancyToggle.css'

interface IFancyToggle { 
    name?: string, 
    label?: string, 
    isActive: boolean, 
    onChange?: ChangeEventHandler<HTMLInputElement>,
    disabled?: boolean
}
const FancyToggle: FC<IFancyToggle> = ({ name = 'filter-toggle', label, isActive, onChange: handleChange, disabled }) => {
    return (
        <Toggle>
            <div className={`filter__item ${disabled && 'is-disabled'} ${isActive && 'filter__item_is-active'}`} >
                {label && <label
                className="filter__label filter__label_internet"
                htmlFor={label}
                >
                    {label}
                </label>}                
                <div className="filter__input input input_toggle input_theme_light">
                    <input
                        className="input__source"
                        type="checkbox"
                        name={name}
                        checked={isActive}
                        onChange={handleChange}
                        disabled={disabled}
                    />
                    <label className="input__label" />
                </div>

            </div>
        </Toggle>

    )
}

export default FancyToggle
