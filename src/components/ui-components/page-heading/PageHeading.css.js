import styled from 'styled-components';

const style = (back) => styled.div`
    display: grid;
    grid-template-columns: ${back ? '4fr 90fr' : ''};
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
        width: 90%;
        margin-top: 100px;
        div {
            >.heading {
                /* font-size: 18px; */
                background: #fff;
                position: fixed;
                width: 100%;
                top: 0;
                left: 0;
                height: 60px;
                font: normal normal normal 17px/12px Montserrat;
                color: #424242;
                padding: 22px;
                padding-left: 38px;
            }
            >.subheading {
                font-size: 14px;
                margin-bottom: -20px;
            }
        }
        img.mobile-back{
            display: inline-block;
            height: 20px;
            margin-top: 20px;
            position: fixed;
            top: 2px;
            z-index: 3;
            left: 15px;
            width: 13px;
            height: 13px;
        }
        
    }
`

export default style;
