import styled from 'styled-components';

const style = (back) => styled.div`
    display: grid;
    grid-template-columns: ${back ? '4fr 90fr' : ''};
    margin-bottom: 50px;
    img.back {
        height: 20px;
        margin-top: 20px;
        display: inline-block!important;
    }
    .mobile-back {
        display: none;
    }
    div {
        >.heading {
            font: normal normal 600 25px/40px Montserrat;
            color: #424242;
        }
        >.subheading {
            font: normal normal normal 20px/30px Montserrat;
            color: #A3A3A3;
        }
    }
    
    @media only screen and (max-width: 900px) { 
        div {
            >.heading {
                font: normal normal 600 26px/40px Montserrat;
            }
            >.subheading {
                font: normal normal normal 20px/30px Montserrat;
                color: #A3A3A3;
            }
        }
        img.back {
            height: 15px;
            margin-top: 11px;
            display: inline-block!important;
        }
    }
`

export default style;
