import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: 98px;
    overflow-y: hidden;
    padding: 20px 0px;
    position: fixed;
    top: 0;
    z-index: 100;
    
    .logo {
        img {
            top: 20px;
        }
    }
    .navs {
        display: grid;
        grid-template-columns: repeat( 4, 1fr);
        padding-top: 10px;
        .nav {
            font: normal normal normal 20px/24px Montserrat;
            color: #424242;
            cursor: pointer;
        }
        .nav.selected {
            font: normal normal bold 20px/24px Montserrat;
            color: #007B5D;
            span {
                width: fit-content;
                display: inline-block;
                &::after {
                    content: '';
                    display: block;
                    width: 20px;
                    height: 2px;
                    background: #007B5D;
                    margin: 5px auto;
                    border-radius: 1px;
                }
            }
        }

    }

    .btns {
        margin: 0px;
        padding-right: 100px;
        white-space: nowrap;
        button, a {
            float: right;
            margin: 0px 10px;
            padding: 0px;
        }
        .sign-up{
            border: 2px solid #007B5D;
            border-radius: 8px;
            width: 180px;
            height: 48px;
            background: transparent;
            font: normal normal normal 20px/24px Montserrat;
            color: #007B5D;
            :hover{
                background: #007B5D;
                color: white;
            }
        }
        a.sign-in {
            margin-top: 15px;
        }
        a{
            font: normal normal normal 20px/24px Montserrat;
            letter-spacing: 0px;
            margin: 0px 15px 0px;
            display: inline-block;
            float: right;
            text-decoration: none;
            color: #007B5D;
        }
    }

    .menu {
        z-index: 2;
        float: right;
        img {
            width: 30px;
            height: 35px;
            margin-top: 10px;
        }
    }


    @media only screen and (max-width: 900px) {
        .btns {
            padding-right: 20px;
        }
    }
`