import styled from 'styled-components';

const style = () => styled.div`
background: #F5F7F7;
padding: 100px auto;
margin: 0px;
min-height: 130vh;
>div{
    width: 62%;
    height: 841px;
    background: #FFFFFF;
    box-shadow: 0px 10px 12px #CCCCCC80;
    border-radius: 15px;
    margin: 50px auto;
    text-align: center;
    >div{
        >img:first-child{
            width: 214px;
            height: 50px;
            margin-top: 50px;
        }
    }
    hr{
        border: none;
        border-top: 1px solid #F0F0F0;
        border-radius: 50px;
        margin-top: 50px;
    }
    hr:nth-child(7){
        margin-top: 100px;
    }
    div.d-1 {
        font: normal normal 600 40px/40px Montserrat;
        color: #424242;
        margin-top: 100px;
    }
    div.d-2 {
        text-align: center;
        font: normal normal normal 25px/40px Montserrat;
        color: #424242;
        margin: auto;
        margin-top: 30px;
    }
    div.d-3{
        margin-top: 50px;
        button {
            background: #FCD20F 0% 0% no-repeat padding-box;
            border-radius: 8px;
            width: 400px;
            height: 80px;
            text-align: center;
            font: normal normal normal 25px/30px Montserrat;
            color: #424242;
            outline: none;
            border: none;
        }
    }
    div.d-4 {
        font: normal normal normal 20px/32px Montserrat;
        color: #424242;
        width: 422px;
        margin: auto;
        margin-top: 50px;
    }
    div.d-5 {
        font: normal normal normal 15px/19px Montserrat;
        margin-top: 38px;
        span.green {
            color: #007B5D;
        }
    }
}
`
export default style;
