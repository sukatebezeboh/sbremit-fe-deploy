import styled from "styled-components";

export default styled.div`

main {
	height: 100vh;
	width: 100%;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

main #errorText {
	font-size: 26px;
	margin: 50px 0;
    color: grey;
}

span {
    &#g1, &#g2 {
        max-width: 180px;
        display: inline-block;
        overflow: hidden;
        img {

        }
    }
}
main #errorLink {
	font-size: 20px;
	border: 1px solid;
	text-decoration: none;
	transition: all 0.5s ease-in-out;
    margin: 10px 0px;
    padding: 13px 20px;
    font: normal normal normal 18px/22px Montserrat;
    letter-spacing: 0.45px;
    color: #424242;
    background: #FCD20F 0% 0% no-repeat padding-box;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}

main #errorLink:hover, main #errorLink:active {
	color: #fff;
	background: #000;
}

main #g6219 {
	transform-origin: 85px 4px;
	animation: an1 12s .5s infinite ease-out;
}

@keyframes an1 {
	0% {
		transform: rotate(0);
	}

	5% {
		transform: rotate(3deg);
	}

	15% {
		transform: rotate(-2.5deg);
	}

	25% {
		transform: rotate(2deg);
	}

	35% {
		transform: rotate(-1.5deg);
	}

	45% {
		transform: rotate(1deg);
	}

	55% {
		transform: rotate(-1.5deg);
	}

	65% {
		transform: rotate(2deg);
	}

	75% {
		transform: rotate(-2deg);
	}

	85% {
		transform: rotate(2.5deg);
	}

	95% {
		transform: rotate(-3deg);
	}

	100% {
		transform: rotate(0);
	}
}
`