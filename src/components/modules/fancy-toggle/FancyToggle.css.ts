import styled from "styled-components";

export default styled.div`
display: inline-block;
.filter__item {
    padding: 5px 15px;
    width: fit-content;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    background: white;
    margin-right: 10px;
    transition: background 0.2s ease-in-out;
    border: 1px solid lightgray;
    border-radius: 15px;
    position: relative;

    &.is-disabled {
        opacity: 0.4;
    }
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
margin-right: 10px;
display: inline-flex;
align-items: center;
white-space: nowrap;
width: 100%;
flex-shrink: 1;
}
.filter__label::before {
content: "";
display: none;
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
    /* display: none; */
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    cursor: pointer;
    display: inline-block;
    z-index: 1;
    /* visibility: hidden; */
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
