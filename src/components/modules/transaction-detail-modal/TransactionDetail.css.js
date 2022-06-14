import styled from 'styled-components'


export default styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: ${(document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth) + 1000}px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1;

    .overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 150vh;
        z-index: -1;
    }

    .disable {
        opacity: 0.2;
        pointer-events: none;
    }
    .is-resending {
        transition: 3s ease-out;
        transform: rotateZ(-720deg);
    }
    .modal {
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 75%;
        background: #fff;
        margin: 47px auto;
        padding: 60px 0px 30px;
        .head {
            border-bottom: 1px solid #f7f6f7;
            display: grid;
            grid-template-columns: 3fr 3fr 4fr;
            width: 85%;
            margin: 0px auto;
            padding: 20px 0px;
            .t-id {
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
                span {
                    color: #424242; 
                }
            }
            .status {
                span {
                    display: inline-block;
                    background: #FCD20F 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    font: normal normal normal 13px Montserrat;
                    color: #FFFFFF;
                    padding: 7px 15px;
                    /* height: 30px; */
                }
            }
            .close {
                text-align: right;
                font: normal normal normal 26px/24px Montserrat;
                color: #A3A3A3;
                cursor: default;
            }
        }

        .sub {
            display: grid;
            grid-template-columns: 3fr 2fr;
            margin: 30px auto;
            width: 85%;
            .name {
                display: grid;
                grid-template-columns: 1fr 5fr 2fr;
                background: #FFFFFF 0% 0% no-repeat padding-box;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                padding: 30px;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                >div {
                    :nth-child(2) {
                        div {
                            :first-child {
                                font: normal normal normal 16px Montserrat;
                                color: #A3A3A3;
                                margin-bottom: 10px;
                            }
                            :last-child {
                                font: normal normal normal 20px Montserrat;
                                color: #424242;
                            }
                        }
                    }
                    :last-child {
                        div {
                            text-align: right;
                            :first-child {
                                font: normal normal normal 20px Montserrat;
                                color: #424242;
                            }
                            :last-child {
                                font: normal normal normal 16px Montserrat;
                                color: #A3A3A3;
                            }
                        }
                    }
                }
            }

            .actions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                >div, a.export {
                    border-radius: 15px;
                    width: 124px;
                    height: 124px;
                    text-align: center;
                    margin: auto;
                    padding-top: 26px;
                    div {
                        font: normal normal normal 16px/44px Montserrat;
                    }
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
                .export {
                    color: #A3A3A3;
                    border: 2px solid #A3A3A3;
                }
                .cancel {
                    color: #CF0921;
                    border: 2px solid #CF0921;

                }
                .resend {
                    color: #007B5D;
                    border: 2px solid #007B5D;
                }
            }
        }

        .timeline {
            background: #007B5D 0% 0% no-repeat padding-box;
            box-shadow: 0px 2px 4px #CCCCCC80;
            padding: 30px 6%;
            margin-bottom: 50px;
            .bar {
                height: 8px;
                width: 80%;
                border-radius: 15px;
                background: #3f896f;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 0fr;
                padding: 0px;
                margin: auto;
                .point {
                    background: #fff;
                    width: 4px;
                    height: 4px;
                    border-radius: 15px;
                    margin: 2px;
                }
                .point-1 {
                    width: 43px;
                    height: 6px;
                }
                .point-complete {
                    width: 100%;
                    height: 6px;
                }
            }
            .point-labels {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                margin-top: 20px;
                >div {
                    width: 200%;
                    padding-left: 0px;
                    margin-left: -50%;
                    text-align: center;
                    div:first-child {
                        font: normal normal normal 16px/16px Montserrat;
                        color: #FFFFFF;
                    }
                    div:last-child{
                        font: normal normal normal 13px/18px Montserrat;
                        color: #A3A3A3;
                        /* width: 300px; */
                    }
                }
            }
        }

        .details {
            display: grid;
            grid-template-columns: 3fr 2.3fr;
            width: 90% ;
            margin: 0px auto 50px;
            .recipient-details {
                margin-left: 25px;
            }
            hr {
                margin: 20px 0px;
                border: 1px solid #f8f7f8;
            }
            >div {
                background: #FFFFFF 0% 0% no-repeat padding-box;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                width: 90%;
                padding: 50px;
                margin: auto;
                .heading {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    .title {
                        font: normal normal normal 20px/24px Montserrat;
                        color: #A3A3A3;
                    }
                    .update {
                        text-align: right;
                        font: normal normal normal 16px/19px Montserrat;
                        color: #007B5D;
                    }
                }
                .row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin: 5px 0px;
                    font: normal normal normal 16px/44px Montserrat;
                    .left {
                        color: #A3A3A3;
                    }
                    .right {
                        text-align: right;
                        color: #424242;
                    }
                }
            }
        }
    }
    .green {
        color: #007B5D;
    }

    @media only screen and (max-width: 900px) { 
        padding: 0px;
        background: #FFF;
        height: 100%;
        position: fixed;
        overflow-y: scroll;;;
        .modal{
            margin: 0px;
            width: 100%;
            box-shadow: none;
            overflow-y: hidden;
            .head {
                display: none;
            }
            .sub {
                grid-template-columns: 1fr;
                margin: 5px auto;
                .name {
                    padding: 15px 10px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    >div{
                        img:nth-child(1){
                            width: 30px;
                            height: 30px;
                        }
                        :nth-child(2){
                            div {
                                :first-child{
                                    font: normal normal normal 8px Montserrat;
                                    margin-bottom: 5px;
                                }
                                :last-child{
                                    font: normal normal normal 11px Montserrat;
                                }
                            }
                        }
                        :nth-child(3){
                            div{
                                font: normal normal normal 8px Montserrat !important;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
                .actions {
                    grid-template-columns: 1fr 1fr 1fr;
                    padding-left: 60%;
                    >div {
                        text-align: center;
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                        padding-top: 5px;
                        border-width: 1px !important;

                        img {
                            width: 21px;
                            height: 21px;
                            filter: invert(0%) sepia(21%) saturate(28%) hue-rotate(346deg) brightness(204%) contrast(97%);
                            
                        }
                        div {
                            margin-top: -3px;
                            font: normal normal normal 10px Montserrat;
                        }
                    }
                    .export {
                    }
                    .resend {
                        color: white;
                        border: 2px solid #007B5D;
                        background: #007B5D;
                        :hover {
                            color: #007B5D;
                            background: white;
                            cursor: pointer;
                            img {
                                filter: none;

                            }
                        }
                    }
                }
            }
            .timeline {
                display: none;
            }
            .details {
                grid-template-columns: 1fr;
                grid-gap: 15px;
                width: 100%;
                >div {
                    padding: 15px 20px;
                    .heading {
                        .title {
                            font: normal normal normal 13px/16px Montserrat;
                        }
                        .update {
                            font: normal normal normal 11px/14px Montserrat;
                        }
                    }
                    .row {
                        font: normal normal normal 11px/22px Montserrat;
                    }
                }
                .recipient-details {
                    margin-left: auto;

                }
                .transfer-details {

                }
            }
        }
        .mobile-modal {

            div.status {
                span {
                    position: absolute;
                    top: 20px;
                    left: 82% ;
                    z-index: 3;
                    /* width: 54px;
                    height: 16px; */
                    display: inline-block;
                    display: inline-block;
                    background: #FCD20F 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    font: normal normal normal 8px Montserrat;
                    color: #FFFFFF;
                    padding: 3px 10px;
                }
            }
            div.view-details {
                font: normal normal normal 8px/44px Montserrat;
                color: #A3A3A3;
                position: absolute;
                top: 140px;
                left: 6%;
            }
        }

        .timeline-modal-container {
            .overlay {
                position: fixed;
                top: 0px;
                left: 0px;
                z-index: 3;
                width: 100%;
                background: #000000;
                opacity: 0.3;
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
                height: 130vh;
            }
            .timeline-modal {
                width: 80%;
                background: #007B5D;
                /* box-shadow: 0px 2px 4px #CCCCCC80; */
                border-radius: 8px;
                height: 330px;
                margin: auto auto;
                position: fixed;
                top: 175px;
                left: 10%;
                display: block;
                z-index: 3;
                padding: 30px 50px;
                .timeline {
                    display: grid;
                    grid-template-columns: 1fr 4fr;
                    grid-gap: 10%;
                    .bar {
                        width: 5px;
                        height: 244px;
                        background: #3f896f;
                        display: grid;
                        grid-template-rows: 1fr 1fr 1fr 0fr;
                        grid-gap: 0px;
                        .point {
                            background: #fff;
                            width: 2px;
                            height: 2px;
                            border-radius: 15px;
                            margin: 2px;
                        }
                        .point-1 {
                            width: 3px;
                            height: 100%;
                        }
                    }
                    .point-labels {
                        display: grid;
                        grid-template-rows: 1fr 1fr 1fr 0fr;
                        >div {
                            width: 250px;
                            div:first-child {
                                font: normal normal normal 13px/14px Montserrat;
                                color: #FFFFFF;
                            }
                            div:last-child{
                                font: normal normal normal 11px/14px Montserrat;
                                color: #A3A3A3;
                            }
                        }
                    }
                }
            }
        }
    }

`
