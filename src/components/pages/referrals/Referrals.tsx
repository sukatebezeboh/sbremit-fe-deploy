import NavBar from 'components/modules/navbar/NavBar'
import _env from 'env'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserReferrals } from 'redux/actions/actions'
import styled from 'styled-components'
import { paths } from 'util/paths'
import { asset, copyToClipBoard, getPercentage, getUserDefaultCurrency, getValueFromArray } from '../../../util/util'


const Div = styled.div`
* {
	
	box-sizing: border-box;
}

.sidebar {
	position: relative;
	min-width: 350px;
	@media only screen and (max-width: 900px) {
		position: static;
	}
	.invite-text {
		text-align: center;
		margin: 20px auto;
		font-size: large;
		color: dimgray;
		line-height: 2;
		/* text-shadow: 1px 1px 1px grey; */
		.info {
			background: #5f899220;
			color: #5f8992;
			font-size: 14px;
			font-weight: 500;
			text-shadow: none;
			a {
				border-bottom: 1px dotted;
			}
			.info-icon {
				background: #5f8992;
				padding: 0px 7px;
				line-height: 0px;
				border-radius: 50%;
				.fa-info {
					color: white;
					line-height: 0;
				}
			}
		}
	}
}
.coupon-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: fit-content;
	max-width: fit-content;
	padding: 10px 10px;
	background-color: white;
	color: lightgrey;
	/* position: fixed; */
	z-index: 1;
	/* min-width: 100%;	 */

	@media only screen and (max-width: 900px) {
		position: static;
		margin: 0 auto;
	}
}
.background {
	width: 430px;
	height: 520px;
	position: absolute;
	transform: translate(-50%,-50%);
	left: 50%;
	top: 50%;
	.shape {
		height: 200px;
		width: 200px;
		position: absolute;
		border-radius: 50%;
	}
}
.shape {
	&:first-child {
		background: linear-gradient( #1845ad, #23a2f6 );
		left: -80px;
		top: -80px;
	}
	&:last-child {
		background: linear-gradient( to right, #ff512f, #f09819 );
		right: -30px;
		bottom: -80px;
	}
}
.wrapper {
	background-color: rgba(255,255,255,0.13);
	border-radius: 10px;
	backdrop-filter: blur(10px);
	border: 2px solid rgba(255,255,255,0.1);
	/* box-shadow: 0 0 40px rgba(8,7,16,0.6); */
	position: relative;
	width: 350px;
	/* padding: 30px; */
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.img-area {
		background-color: rgba(255,255,255,0.13);
		border-radius: 10px;
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255,255,255,0.1);
		box-shadow: 0 0 10px rgba(8,7,16,0.6);
		height: 150px;
		width: 150px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.name {
		font-size: 23px;
		font-weight: 500;
		color: grey;
		margin: 10px 0 5px 0;
	}
	.code {
		
		font-weight: 900;
		font-size: 30px;
		padding: 0px;
		margin: 0px;
		line-height: 1;
	}
	.social-icons {
		margin: 15px 0 25px 0;
	}
	.icon {
		&:hover {
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				border-radius: 50%;
				background: #ecf0f3;
				box-shadow: inset -3px -3px 7px #ffffff, inset 3px 3px 5px #ceced1;
			}
		}
	}
	.buttons {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
}
.social-icons {
	.share-text {
		color: grey;
	}
	a {
		background-color: rgba(255,255,255,0.13);
		border-radius: 10px;
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255,255,255,0.1);
		box-shadow: 0 0 10px rgba(8,7,16,0.6);
		position: relative;
		height: 40px;
		width: 40px;
		margin: 0 5px;
		display: inline-flex;
		text-decoration: none;
		border-radius: 50%;
		&:hover {
			border: 2px solid rgba(255,255,255,0.5);
		}
		i {
			position: relative;
			z-index: 3;
			text-align: center;
			width: 100%;
			height: 100%;
			font-size: 20px;
			line-height: 40px;
		}
		&:nth-last-child(1) {
			i {
				color: #13d151;
			}
		}
		&:nth-last-child(2) {
			i {
				color: #e6ba12;
			}
		}
		&:nth-last-child(3) {
			i {
				color: #1da9e9;
			}
		}
		&:nth-last-child(4) {
			i {
				color: #f23400;
			}
		}
	}
}
.buttons {
	button {
		margin-top: 5px;
		background-color: rgba(255,255,255,0.13);
		border-radius: 10px;
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255,255,255,0.1);
		box-shadow: 0 0 2px rgba(8,7,16,0.6);
		position: relative;
		width: 100%;
		border: none;
		outline: none;
		padding: 12px 0;
		color: #d0d1d6;
		color: grey;
		font-size: 17px;
		font-weight: 400;
		border-radius: 5px;
		cursor: pointer;
		z-index: 4;
		&:hover {
			box-shadow: 2px 1px 6px 4px solid black;
			background-color: whitesmoke;
		}
		&:first-child {
			margin-right: 10px;
		}
		&:last-child {
			margin-left: 10px;
		}
	}
}
.img-area {
	.inner-area {
		height: calc(100% - 25px);
		width: calc(100% - 25px);
		border-radius: 50%;
	}
}
.inner-area {
	img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
		object-fit: cover;
	}
}


.page-content {
	display: grid;
	grid-template-columns: 0fr 1fr;
	grid-gap: 10%;

	@media only screen and (max-width: 900px) {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}

	.card {
			width: 100%;
			min-height: 140px;
			box-shadow: 0px 10px 12px #CCCCCC80;
			padding: 15px 30px 30px;
			border-radius: 15px;
			background: #fff;
			margin-bottom: 10px;
		}
	.referred-users {
		.card {
			width: 100%;
			min-height: 140px;
			box-shadow: 0px 10px 12px #CCCCCC80;
			padding: 15px 30px 30px;
			border-radius: 15px;
			background: #fff;
			margin-bottom: 10px;
		}

		.overview {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax( 100px, 300px));
			
			box-sizing: border-box;
			grid-gap: 5%;
			padding: 15px;

			@media only screen and (max-width: 900px) {
				margin-left: auto;
				margin-right: auto;
				max-width: 700px;
			}
			.overview-line {
				text-align: center;
				max-width: 300px;
				.value{
                        font: normal normal 600 40px/40px Montserrat;
                        color: #007B5D;
                        margin-top: 5px;
						small {
							font-size: 30px;
						}
                    }
				.key {
					font: normal normal normal 16px/19px Montserrat;
					color: #A3A3A3;
					margin-top: 20px;
				}
			}
		}

		.user-card {
			width: 100%;
			max-width: 900px;
			min-height: 140px;
			box-shadow: 0px 1px 1px #CCCCCC80;
			border: 1px solid lightgrey;
			padding: 15px 30px 30px;
			border-radius: 5px;
			background: #fff;
			margin: 30px 0px;
			display: grid;
			grid-template-columns: 0fr 1fr;
			grid-gap: 10px;
			.left {
				.round-container {
					width: 60px;
					height: 60px;
					border: 1px solid lightgrey;
					background: white;
					padding: 10px;
					border-radius: 50%;
					img {
						width: 100%;
					}
				}
			}

			.right {
				.user {
					font-size: x-large;
					color: #A3A3A3;
					text-transform: uppercase;
				}
				.value {
					color: dimgrey;
					display: grid;
					grid-template-columns: 1fr 0fr;
					width: fit-content;
					.top {
						padding: 10px 10px 0px 0px;
					}
					.bottom {
						white-space: nowrap;
						padding: 10px;
						background: #007B5D23;
						&.they-earn {
							background: none;
							padding: 10px 2px;
						}
					}
				}
			}

			.details { 

				.labels { 
					height: fit-content;
					text-align: right;
					.label { 
						/* float: right; */
						text-transform: capitalize;
						display: inline-block;
						padding: 10px;
						text-align: center;
						&.success {
							background: #007B5D20;
							color: #007B5D;
						}

						&.warning {
							background: #fc890f20;
							color: #fc890f;
						}

						&.danger {
							background: #CF092120;
							color: #CF0921;
						}
						&.info {
							background: #5f899220;
							color: #5f8992;
						}
					}
					
				}

				.notice { 
					color: grey;
				}

				.percentage { 

				}

				.bar { 
					width: 100%;
					background: #007B5D20;
					height: 5px;
					border-radius: 10px;
					&:before {
						content: '';
						width: var(--percentage-width);
						height: 3px;
						background: #007B5D;
						display: inline-block;
						position: relative;
						top: -12px;
						border-radius: 10px;
					}
				}
			}

		}

		.no-invites {
			padding: 50px 10%;
			
			.text {
				color: grey;
				font-size: 30px;
			}
		}
	}	
}

`

const Referrals = () => {

  const user = useSelector((state: any) => state.auth.user);
  const appValues = useSelector((state: any) => state.appValues)
  const referralSettings = getValueFromArray('settings', 'name', appValues?.values?.data || []);
  const [referralDetails, setReferralDetails] = useState({
	  count: 0,
	  referredUsers: []
  })

  useEffect(() => {
	getUserReferrals(setReferralDetails)
  }, [])
  

  const getAccruedBonus = ( users: any ) => {
	const filteredUsers = users?.filter((user: any) => (user.useStatus === "Active" && isNotAwaiting(user, referralSettings)))

	return filteredUsers?.length * referralSettings?.data?.referrerDiscountValue;
  }



  function isNotAwaiting(user: any, referralSettings: any) {
	return Number(getPercentage(user?.[`cummulative${getUserDefaultCurrency(user, appValues)}Transfer`], referralSettings?.data?.referralActivationAmount )) >= 100
  }
  
  const getShareReferralText = (extraText = '') => {
	  return encodeURIComponent(
		`SB REMIT is a cheap, fast and secure way of sending money to Africa. 
		It even gets better - you can earn ${getUserDefaultCurrency(user, appValues, true)}${referralSettings?.data?.referredUserDiscountValue} when you sign-up with my referral link and make a successful transfer.

		${extraText}
		`
	  )
  }

  return (
    <Div>
        <NavBar />

        <div className="page-content">

			<div className='sidebar'>

				<div className="coupon-container card">
						<div className="wrapper">
							<div className="img-area">
							<div className="inner-area">
								<img src={asset('icons', 'coupons.png')} alt="coupon" />
							</div>
							</div>

							<div className="name">Your referral code</div>
							<h1 className="code green-txt cursor-pointer" onClick={() => copyToClipBoard(user?.referral?.code)}>
								{user?.referral?.code} <i className="far fa-copy"></i>
								<br />
								<br />
							</h1>
							<div className="social-icons">

								<div className="share-text">
									Share this code on:	
									<br />
									<br />
								</div>
							
								{/* <a href="https://facebook.com/" target="_blank" className="facebook" rel="noreferrer"><i className="fab fa-facebook"></i></a> */}
								<a href={`https://twitter.com/intent/tweet?url=${_env.APP_HOST}${paths.SIGN_UP}?referral=${user?.referral?.code}&text=${getShareReferralText()}&via=sbremit&hashtags=SBRemit`} target="_blank" className="twitter" rel="noreferrer"><i className="fab fa-twitter"></i></a> 
								{/* <a href="https://instagram.com/" target="_blank" className="insta" rel="noreferrer"><i className="fab fa-instagram"></i></a>  */}
								<a href={`https://api.whatsapp.com/send?text=${getShareReferralText(_env.APP_HOST+paths.SIGN_UP+'?referral=' + user?.referral?.code)}`} target="_blank" className="yt" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>

							</div>

							<div className="d-block text-align-center">
								<div> - or - </div>
								<a href={`${_env.APP_HOST}${paths.SIGN_UP}?referral=${user?.referral?.code}`} target="_blank" rel='noreferrer' className="green-txt">
									{_env.APP_HOST}{paths.SIGN_UP}?referral={user?.referral?.code}
								</a>
								<br />
							</div>
							<div className="buttons">
								<button onClick={() => copyToClipBoard(`${_env.APP_HOST}${paths.SIGN_UP}?referral=${user?.referral?.code}`)}>Copy</button>
							</div>

							<br />
							<br />
							<div className="invite-text">
								<div className="info">
									<span className="info-icon"><i className="fas fa-info"></i></span> Tap any icon above to send them your unique code: {user?.referral?.code}
								</div>
								<br />
								<div>
									- You receive {getUserDefaultCurrency(user, appValues, true)}{referralSettings?.data?.referrerDiscountValue} when they send over {getUserDefaultCurrency(user, appValues, true)} {referralSettings?.data?.referralActivationAmount}. 
								</div>
								{Boolean(Number(referralSettings?.data?.referredUserDiscountValue)) && <div>
									- They also get a {getUserDefaultCurrency(user, appValues, true)}{referralSettings?.data?.referredUserDiscountValue} reward for using your referral code.
								</div>}
								<br />
								<div className="info no-bg">
									<span className="info-icon"><i className="fas fa-info"></i></span><Link to={paths.LEGAL + "/terms"}> Terms and conditions apply </Link>
								</div>
							</div>

						</div>
						
				</div>
			</div>

		  <div className="referred-users">

				<div className="overview">

					<div className="overview-line">
						<div className="card">
							<div className='key'>Total users referred</div>
							<div className="value yellow-txt"> {referralDetails?.count} </div>
						</div>
					</div>

					<div className="overview-line">
						<div className="card">
							<div className='key'> Accrued bonus</div>
							<div className="value green-txt"> {getAccruedBonus(referralDetails?.referredUsers)} <small>{getUserDefaultCurrency(user, appValues)}</small></div>
						</div>
					</div>
					

				</div>
				
				{
					referralDetails?.referredUsers?.map((referredUser: any) => {
						let percentage = Number(getPercentage(referredUser?.[`cummulative${getUserDefaultCurrency(referredUser, appValues)}Transfer`], referralSettings?.data?.referralActivationAmount ));
						percentage = percentage > 100 ? 100 : percentage;

						return (
						<div className="user-card">
							<div className="left">
								<div className="round-container">
									<img src={asset('icons', isNotAwaiting(referredUser, referralSettings) ? 'thin-green-tick.png' : 'waiting.png')} alt="check mark" />
								</div>
							</div>
							<div className="right">
								<div className="user">
									{referredUser.firstName} {referredUser.lastName}
								</div>
		
								<div className="value">
									<div className="top">You earn{referredUser?.useStatus === "Used" ? 'ed' : ''}</div>
									<div className="bottom green-txt">{referralSettings?.data?.referrerDiscountValue} {getUserDefaultCurrency(user, appValues)}</div>
								</div>
								<div className="value italicize">
									<div className="top">They earn{referredUser?.useStatus === "Used" ? 'ed' : ''}</div>
									<div className="bottom they-earn">{referralSettings?.data?.referredUserDiscountValue} {getUserDefaultCurrency(referredUser, appValues)} too</div>
								</div>
							</div>
		
							<div className="details grid-col-span-2">
								<div className="labels py-5">
		
									<div className="label info sentence-case">
										{
											isNotAwaiting(referredUser, referralSettings) ?
											'Reward activated' :
											`${percentage}% spent till activation`
										}
									</div>

									{
								referredUser?.useStatus === "Used" ?
									 <div className="label danger">
										Used
									</div> :
									
									isNotAwaiting(referredUser, referralSettings) ?
										<div className="label success">
											Active
										</div> :
										<div className="label warning">
											Awaiting activation
										</div>							
									}
		
									
								</div>
		
								<div className="bar-container" dangerouslySetInnerHTML={{__html: `
									<div class="bar" style="--percentage-width: ${percentage}%">
									</div>
								`}}>
								</div>
								
							</div>
						</div>
					)})
			}

			<div className="no-invites">
				<div className="text">
					Refer a friend and earn £{referralSettings?.data?.referrerDiscountValue}
				</div>
			</div>
		  </div>

        </div>
    </Div>
  )
}

export default Referrals


