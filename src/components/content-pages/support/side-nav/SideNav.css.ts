import styled from "styled-components";

export default styled.div`
width: 383px;
height: 100%;
background: #FFFFFF 0% 0% no-repeat padding-box;
position: fixed;
top: 90px;
padding: 40px 0px;
z-index: 101;
ul {
    list-style: none;
    padding-left: 20px;
    li.section-nav {
        font: normal normal normal 14px Montserrat;
        color: #1F1F1F;
        margin: 20px;
        cursor: pointer;
        padding-left: 13px;
        &.selected{
            font: normal normal bold 14px Montserrat;
            color: #007B5D;
            border-left: 4px solid #007B5D;
        }
    }
}
.contact {
    display: none;
    position: fixed;
    bottom: 0;
    padding: 40px 20px 40px 40px ;
    h4 {
        color: #1F1F1F;
    }
    .info {
        margin-top: 20px;
        .text {
            font: normal normal normal 14px/30px Montserrat;
            color: #A3A3A3;
        }
        .value {
            font: normal normal normal 14px/32px Montserrat;
            color: #424242;
            display: grid;
            grid-template-columns: 0fr 1fr;;
            img {
                width: 24px;
                height: 24px;
                margin-right: 20px;
            }
            .value-text {
                display: inline-block;

            }
        }
    }
}
`