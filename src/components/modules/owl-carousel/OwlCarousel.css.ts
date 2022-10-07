import styled from "styled-components";

export default styled.div`

    /**
    * @source: https://codepen.io/hanieldaniel/pen/omdKoO
    */
    &.video-section .item{
        opacity:0.4;
        transition:.4s ease all;
        margin:0 20px;
        transform:scale(.8);
    }

    @media(max-width:1000px){
     &.video-section .item{margin:0; transform:scale(.9)}
    }

    &.video-section .active .item{
        opacity:1;
        transform:scale(1);
    } 

    body{
    /* margin:80px 0 0 0; */
    }

    &.video-section .owl-item {
        -webkit-backface-visibility: hidden;
        -webkit-transform: translateZ(0) scale(1.0, 1.0);
    }

    &.video-section video{
        max-width:100%;
        height:auto;
        margin: auto;
        display: block;
    }

    .plyr__video-wrapper {
        max-height: 800px;
        video {
            height: 100%;
            width: auto;
        }
    }

    .owl-nav {
        display: flex;
        justify-content: space-around;

        button {
            &.owl-prev, &.owl-next {
                font-size: xx-large;
            }
        }
    }

`