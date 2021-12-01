import React, { useState } from 'react'
import styled from 'styled-components';

const Toggle = styled.div`
    .filter__item {
        padding: 5px 15px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;
        background: white;
        margin-right: 10px;
        transition: background 0.2s ease-in-out;
        border: 1px solid lightgray;
    }
    .filter__item_is-active {
        background: #047b5d2b;
    }
    .filter__item_is-active .filter__label {
        color: #007B5D;
    }
    .filter__item_is-active .filter__label_internet::before {
    }
    .filter__input {
    flex-shrink: 0;
    }
    .filter__label {
    cursor: pointer;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    margin-right: 30px;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    flex-shrink: 1;
    }
    .filter__label::before {
    content: "";
    display: block;
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-right: 30px;
    transition: background 0.2s ease-in-out;
    }
    .filter__label_internet::before {
    width: 26px;
    height: 22px;
    }

    .input {
    display: inline-flex;
    align-items: center;
    }
    .input__label {
    cursor: pointer;
    flex-shrink: 0;
    }
    .input_disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
    user-select: none;
    }
    .input_toggle .input__label {
    width: 35px;
    height: 18px;
    box-sizing: border-box;
    position: relative;
    border-radius: 100px;
    transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
    border: 2px solid lightgray;
    background: lightgray;
    }
    .input_toggle .input__label::before {
    content: "";
    position: absolute;
    top: calc(50% - 12px / 2);
    left: 2px;
    width: 12px;
    height: 12px;
    display: block;
    flex-shrink: 0;
    border-radius: 50%;
    background: white;
    transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;
    }
    .input_toggle .input__source {
    display: none;
    opacity: 0;
    visibility: hidden;
    }
    .input_toggle .input__source:checked ~ .input__label::before {
        transform: translateX(calc(100% + 4px));
    }
    .input_toggle .input__source:checked ~ .input__label {
        border: 2px solid #007B5D;
        background: #007B5D;
    }
    .input_toggle .input__source:checked ~ .input__label::before {
        background: white;
    }
    .input_toggle.input_theme_light .input__source:checked ~ .input__label {
        border: 2px solid #007B5D;
        background: #007B5D;
    }
    .input_toggle.input_theme_light .input__source:checked ~ .input__label::before {
        background: white;
    }

    @media only screen and (max-width: 900px) { 
        .filter__item {
            padding: 5px 10px;
            width: 100%;
        }
        .filter__label {
            font-size: 12px;
            text-align: left;
            padding-left: 5%;
            ::before {
                display: none;
            }
        }
        .filter__input {
            height: 10px;
        }
    }

`

const FancyToggle = ({ label, isActive, setIsActive }: any) => {
    console.log(isActive);
    
    return (
        <Toggle>
            <div className={`filter__item ${isActive && 'filter__item_is-active'}`} onClick={setIsActive}>
                <div className="filter__input input input_toggle input_theme_light">
                    <input
                        className="input__source"
                        type="checkbox"
                        name="filter-toggle"
                        checked={isActive}
                    />
                    <label className="input__label" />
                </div>
                <label
                className="filter__label filter__label_internet"
                htmlFor={label}
                >
                    {label}
                </label>
            </div>
        </Toggle>

    )
}

export default FancyToggle
