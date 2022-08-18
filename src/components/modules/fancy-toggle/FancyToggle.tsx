import React from 'react'
import Toggle from './FancyToggle.css'

const FancyToggle = ({ label, isActive, setIsActive }: any) => {
    return (
        <Toggle>
            <div className={`filter__item ${isActive && 'filter__item_is-active'}`} onClick={setIsActive}>
                <label
                className="filter__label filter__label_internet"
                htmlFor={label}
                >
                    {label}
                </label>                
                <div className="filter__input input input_toggle input_theme_light">
                    <input
                        className="input__source"
                        type="checkbox"
                        name="filter-toggle"
                        checked={isActive}
                    />
                    <label className="input__label" />
                </div>

            </div>
        </Toggle>

    )
}

export default FancyToggle
