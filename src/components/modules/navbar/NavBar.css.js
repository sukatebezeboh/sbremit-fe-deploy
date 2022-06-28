import styled from 'styled-components'

const Bar = styled.div.attrs(props => ({
    className: props.className
}))`
    box-shadow: 0px 2px 4px #CCCCCC80;
    height: 110px;
    background: #FFFFFF;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 30px 5.1%;
    display: grid;
    grid-template-columns: 85fr 15fr;
    cursor: default;
    span {
        display: inline-block;
    }
    .hamburger {
        margin-top: 14px;
        height: 26px;
        width: 30px;
        padding: 0px;
        span {
            width: 30px;
            height: 4px;
            background: #007B5D;
            border-radius: 3px;
            position: relative;
        }
        span:first-child{
            top: -10px;
        }
        span:nth-child(2) {
            top: -18px;
        }
        span:last-child{
            width: 20px;
            top: -26px;
        }
    }
    .logo {
        img{
            height: 49px;
            margin-left: 24.5%;
            /* position: relative;
            top: -16px; */
        }
    }
    >div.right-opt {
        position: relative;
        width: 100%;
        text-align: right;
        white-space: nowrap;
        .notif{
            cursor: pointer;
            >img{
                width: 30px;
                height: 30px;
                color: #A3A3A3;
            }
            span {
                width: 10px;
                height: 10px;
                background: #CF0921;
                border-radius: 50%;
                position: relative;
                top: -24px;
                left: -14px;
            }
        }
        .dropdown {
            text-align: left;
            width: 460px;
            position: absolute;
            left: -296px;
            top: 65px;
            background: #FFFFFF;
            border-radius: 15px;
            box-shadow: 0px 1px 16px #CCCCCC80;
            padding: 5px 0;
            z-index: 2;
            white-space: normal;
            ::before{
                content: '';
                width: 0px;
                height: 0px;
                border-style: solid;
                border-width: 0px 10px 15px 10px;
                border-color: transparent transparent white transparent;
                outline-width: 10px;
                outline-color: black;
                display: inline-block;
                position: relative;
                top: -18px;
                right: 30%;
                float: right;
                border-radius: 15px;
            }
            .notif-head {
                padding: 20px 30px 10px;
                font: normal normal normal 17px/12px Montserrat;
                color: #424242;
            }
            .notif-body {
                display: grid;
                grid-template-columns: 1fr 5fr;
                margin: 11px 30px;
                border-bottom: 1px solid #f8f8f9;
                height: 60px;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                div {
                    div:first-child {
                        font: normal normal normal 13px/24px Montserrat;
                        color: #424242;
                    }
                    div:last-child {
                        font: normal normal normal 11px/13px Montserrat;
                        color: #A3A3A3;
                    }
                }
                &.read {
                    opacity: 0.5;
                }
                :last-child {
                    border-bottom: none;
                }
            }
            hr {

                border-top: 1px solid #f8f8f9;
            }
            .notif-more {
                display: inline-block;
                width: 100%;
                padding: 20px;
                text-align: center;
                font: normal normal normal 12px/13px Montserrat;
                color: #007B5D;
            }
        }
        .profile-dropdown {
            top: 47px;
            .notif-body {
                img {
                    width: 44px;
                    height: 44px;
                }
                div {
                    div:first-child {
                        font: normal normal normal 17px/28px Montserrat!important;
                        color: #000000;
                    }
                    div:last-child {
                        font: normal normal normal 13px/16px Montserrat;
                    }
                }
            }
            .notif-option {
                font: normal normal normal 13px/24px Montserrat;
                color: #4D565C;
                display: grid;
                grid-template-columns: 2fr 15fr;
                padding: 10px 0px;
                cursor: pointer;
                >div {
                    img {
                        width: 16px;
                        height: 16px;
                        float: right;
                        margin-top: 5px;
                    }
                    padding-left: 20px;
                    margin-top: -10px;
                    :last-child {
                        margin-left: -5px;
                        b{
                            color: #007B5D;
                        }
                    }
                }
            }
        }
        .pic {
            margin-left: 10%;
            position: relative;
            top: 5px;
            margin-right: 10px;
            cursor: pointer;

            img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
            }
        }
        .name {
            font: normal normal normal 20px/24px Montserrat;
            color: #424242;
            position: relative;
            top: -10px;
            cursor: pointer;
        }
        .arrow-down {
            cursor: pointer;
            img {
                width: 24px;
                height: 14px;
                margin-left: 160.5%;
                position: relative;
                top: -10px;
            }
        }
    }
    @media only screen and (max-width: 1444px) { 
        grid-template-columns: 78fr 29fr;
        .pic{
            margin: 0%;
        }
    }
    @media only screen and (max-width: 900px) { 
        grid-template-columns: 1fr 1fr;
        height: 60px;
        padding: 15px 3%;

        >div.right-opt {
            transform: scale(0.65, 0.65);
            top: -12px;
            .pic {
                margin-left: 5.5%;
            }
        }
        .hamburger {
            margin-top: 0px;
            transform: scale(0.5, 0.5);
        }
        .logo {
            img{
                height: 27px;
                margin-left: 10%;
                /* top: -32px; */
            }
        }
        .dropdown {
            /* box-shadow: -100px 70000010px 1px 70000000px #aaaaaa80!important; */
            z-index: +50;
        }

        .arrow-down {
            margin-left: -30px;
        }
        grid-template-columns: 1fr 1.5fr!important;
        /* .right-opt {
            width: 200px;
            all: unset;
            div.profile-dropdown {
                width: 410px;
                text-align: left;
                
            }
            .notif {
                
                all: unset;
                background: green;
                display: block !important;
                div.dropdown.notif-dropdown {
                    background: lightgrey;
                    position: absolute;
                    width: 275%;
                    top: -20px;
                    left: -140%;
                    height: 155vh;
                    border-radius: none;
                    .notif-head {
                        box-shadow: 0px 2px 4px #CCCCCC80;
                        height: 92px;
                        padding: 40px 20px;
                    }
                    :before{
                        all:unset;
                    }
                }
            }
        } */

        .desktop-hide .notif {
            background: white;
            position: fixed;
            width: 100%;
            height: 130vh;
            padding-bottom: 30vh;
            left: 0;
            padding-top: 50px;
            z-index: +2;
            margin-top: -40px;
            overflow-y: scroll;
            .page-heading {
                opacity: 1 !important;
                .heading{
                box-shadow: 0px 2px 4px #CCCCCC80;
            }}
            .unread {
                    :before{
                        content: '';
                        width: 3px;
                        height: 3px;
                        border-radius: 50% ;
                        background: #FCD20F;
                        float: left;
                        position: absolute;
                        z-index: -1;
                        margin-top: 22px;
                        margin-left: -10px;
                    }
                }
                .read{
                    
                }
            .notif-body {
                display: grid;
                grid-template-columns: 1fr 5fr;
                margin: 7px 15px;
                border-bottom: 1px solid #f8f8f9;
                height: 60px;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                
                div {
                    div:first-child {
                        font: normal normal normal 13px/24px Montserrat;
                        color: #424242;
                    }
                    div:last-child {
                        font: normal normal normal 11px/13px Montserrat;
                        color: #A3A3A3;
                    }
                }
                :nth-child(4), :nth-child(5) {
                    /* opacity: 0.5; */
                }
                :last-child {
                    /* border-bottom: none; */
                }
            }
            hr {

                border-top: 1px solid #f8f8f9;
            }
            .notif-more {
                display: inline-block;
                width: 100%;
                padding: 20px;
                text-align: center;
                font: normal normal normal 12px/13px Montserrat;
                color: #A3A3A3;
                position: fixed;
                bottom: 0px;
                background: white;
            }
        }
        
    }
    
`
export default Bar;
