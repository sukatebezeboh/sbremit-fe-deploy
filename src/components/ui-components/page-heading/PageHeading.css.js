import styled from 'styled-components';

const style = () => styled.div`
    >.heading {
            font: normal normal 600 25px/40px Montserrat;
            color: #424242;
    }
    >.subheading {
        font: normal normal normal 20px/30px Montserrat;
        color: #A3A3A3;
    }
    @media only screen and (max-width: 900px) { 
        width: 90%;
        margin-top: 100px;
        >.heading {
            font-size: 18px;
        }
        >.subheading {
            font-size: 14px;
            margin-bottom: -20px;
        }
    }
`

export default style;
