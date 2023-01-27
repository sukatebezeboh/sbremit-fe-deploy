import styled from "styled-components";

export default styled.div`

.toast-wrapper{
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
}

@keyframes slide_in {
0% {
    right: -500px;
}
100% {
    right: 20px;
}
}

@keyframes slide_out {
0% {
    right: 20px;
}
100% {
    right: -500px;
}
}

@keyframes slide_in_from_top {
0% {
    top: -50vh;
}
100% {
    top: 50vh;
    margin-top: -50%;
}
}

@keyframes slide_out_to_top {
0% {
    top: 50vh;
}
100% {
    top: -500px;
}
}
.animate-in {
display: grid;
-webkit-animation: slide_in 0.8s ease forwards ;
animation: slide_in 0.8s ease forwards;
}
.animate-out {
display: grid;
-webkit-animation: slide_out 0.8s ease forwards;
animation: slide_out 0.8s ease forwards;
/* animation-delay: 10s; */
}

.animate-in-from-top {
display: grid;
-webkit-animation: slide_in_from_top 0.8s ease forwards ;
animation: slide_in_from_top 0.8s ease forwards;
}
.animate-out-to-top {
display: grid;
-webkit-animation: slide_out_to_top 0.8s ease forwards;
animation: slide_out_to_top 0.8s ease forwards;
/* animation-delay: 10s; */
}

`