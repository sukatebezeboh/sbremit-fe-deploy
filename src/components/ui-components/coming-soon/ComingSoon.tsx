import React from 'react'
import styled  from "styled-components";
import './ComingSoon.css';

const Container = styled.div`
    width: 100%;
    position: fixed;
    margin-bottom: 100px;
    top: 0;
    left: 0;
    /* background: rgba(57, 124, 93, 0.21); */
    background: linear-gradient(90deg, rgba(23,24,24,0.1259278711484594) 0%, rgba(57,124,80,0.2270483193277311) 35%, rgba(124,109,57,0.15066001400560224) 100%);;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.7px);
    -webkit-backdrop-filter: blur(15.7px);
    border: 1px solid rgba(57, 124, 93, 0.06);
    pointer-events: none;
    z-index: 999;
    .text {
        color: #007B5D ;
        text-align: center;
        padding: 10px;
    }

`
const ComingSoon = () => {
    return (
        <Container>
            <div className="text">
                Going Live Soon 
            </div>
        </Container>
    )
}

export default ComingSoon
