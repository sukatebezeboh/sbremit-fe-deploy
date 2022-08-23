import styled from "styled-components";

export default styled.div`
.transfer-details {
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
.part{
    background: #FFFFFF;
    box-shadow: 0px 10px 12px #CCCCCC80;
    border-radius: 15px;
    width: 100%;
    padding: 50px;
    margin: 0px auto;
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
            width: fit-content;
            float: right;
        }
    }
}
.hover-tab {
    position: absolute;
    display: none;
    width: 200px;
    background: #fff;
    box-shadow: 0px 1px 5px #CCCCCC80;
    z-index: +50;
    padding: 10px;
    cursor: pointer;
    margin-left: -80px;

    .tab-list {
        &:hover {
            background: #f8fcfb;
            color: #007B5D;
        }
    }
}
.click-hover-tab {
    cursor: pointer;
    color: #007B5D;
    font-style: oblique;
}
.click-hover-tab:hover ~ .hover-tab{
    display: inline-block!important;
}
.hover-tab:hover {
    display: inline-block!important;
}   
@media only screen and (max-width: 900px) { 
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
`