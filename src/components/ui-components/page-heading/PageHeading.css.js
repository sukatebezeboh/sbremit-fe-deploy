import styled from 'styled-components';

const style = (back) => styled.div`
    display: grid;
    grid-template-columns: ${back ? '4fr 90fr' : ''};
    img.back {
        height: 20px;
        margin-top: 20px;
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
        width: 90%;
        margin-top: 100px;
        div {
            >.heading {
                font-size: 18px;
            }
            >.subheading {
                font-size: 14px;
                margin-bottom: -20px;
            }
        }
        
    }
`

export default style;
