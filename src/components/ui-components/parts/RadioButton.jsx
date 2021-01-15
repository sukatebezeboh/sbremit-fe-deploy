import React from 'react'
import styled from 'styled-components';

const Button = styled.div`
    .radio-span {
            input[type=radio] {
                width: 19px;
                :before {
                    width: 19px;
                    height: 19px;
                    border-radius: 15px;
                    top: 0%;
                    left: -5%;
                    position: relative;
                    background-color: white;
                    content: '';
                    display: inline-block;
                    visibility: visible;
                    border: 1px solid #FCD20F;
                    pointer-events: none;
                    @media only screen and (max-width: 900px) { 
                        top: 15%;
                    }
                }
                :checked{
                    :after {
                        width: 11px;
                        height: 11px;
                        border-radius: 15px;
                        top: -20px;
                        left: 15%;
                        position: relative;
                        background-color: #FCD20F;
                        content: '';
                        display: inline-block;
                        visibility: visible;
                        border: 1px double #FCD20F;
                        z-index: 1;
                        pointer-events: none;
                        @media only screen and (max-width: 900px) { 
                            top: -57%;
                        }
                    }
                }
            }
            .radio-txt {
                padding: 17px 5px;
            }
        }

@media only screen and (max-width: 900px) { 
    .radio-span {
            input[type=radio] {
                width: 19px;
                :before {
                    width: 19px;
                    height: 19px;
                    border-radius: 15px;
                    top: 0%;
                }
                :checked{
                    :after {
                        width: 11px;
                        height: 11px;
                        border-radius: 15px;
                        top: -20px;
                    }
            }
            }
            
    }
}
`

function RadioButton() {
    return (
        <Button>
            <span className="radio-span">
                <input type="radio" name="gender" value="get_from_props" />
            </span>
        </Button>
    )
}

export default RadioButton
