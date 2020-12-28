import React from 'react'
import { asset } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';
import style from './Dashboard.css';

const Body = style();

const Dashboard = () => {
    const transactions = [{},{},{},{},{},{},{},{},{},{}];

    return (
        <Body>
            <NavBar />
            <div className="dash">
                <div className="heading">Dashboard</div>
                <div className="subheading">View recent transactions and analytics</div>
                <div className="transactions">
                    <div> 
                        <div className="green-txt">10</div>  
                        <div>Complete Transactions</div>
                    </div>
                    <div> 
                        <div className="yellow-txt">2</div>  
                        <div>Pending Transactions</div>
                    </div>
                    <div> 
                        <div className="red-txt">1</div>  
                        <div>Cancelled Transactions</div>
                    </div>
                    <div className="green-bg start-transfer"> 
                        <div> <img src={asset('icons', 'add.svg')} alt=""/> </div>  
                        <div> Start new transfer</div>
                    </div>
                </div>
                <div className="t-history">Transaction History <span>(13)</span></div>
                {transactions.map(transaction => <div className="history">
                    <div className="up">
                        <div><img src={asset('images', 'noimage.png')} alt=""/></div>
                        <div>
                            <div>20 Nov 2020</div>
                            <div>To <b>Ifepade Adewunmi</b></div>
                        </div>
                        <div><span>Pending</span></div>
                        <div>
                            <div>51,585.92 NGN</div>
                            <div>100 GBP</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="down">
                        <div>Transaction #: <span>SBR334908</span></div>
                        <div>
                            <span><img src={asset('icons', 'reload.svg')} alt="resend"/> Resend</span> 
                            <span><img src={asset('icons', 'show.svg')} alt="view"/> View details</span>
                        </div>
                    </div>
                </div>)}
                <div className="pagination">
                    <img src={asset('icons', 'prev.svg')} alt="prev"/> 
                    <span className="active green-bg white-txt">1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <img src={asset('icons', 'next.svg')} alt="next"/>
                 </div>
            </div>
        </Body>
    )
}

export default Dashboard;
