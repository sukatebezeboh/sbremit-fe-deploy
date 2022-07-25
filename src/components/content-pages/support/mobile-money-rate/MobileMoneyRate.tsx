import React, { useState } from 'react'
import { asset } from '../../../../util/util';
import Body from './MobileMoneyRate.css'
import NavHeader from '../../nav-header/NavHeader';
import Table from 'components/modules/table/Table';
import { getCountryMomoData } from 'components/pages/landing-page/LandingPage.helper';
import { RESPONSIVE_TYPE_COLLAPSE_ALL } from 'components/modules/table/ITable';
import { useSelector } from 'react-redux';
import { constants } from 'util/constants';

const Support = () => {
    const [openPanels, setOpenPanels]: any = useState([]);
    const {data: servicesData} = useSelector((state:any) => state.appValues.services)


    const isPanelOpen = (panelId: number) => {
        return openPanels.includes(panelId);
    }

    const togglePanel = (panelId: number) => {
        isPanelOpen(panelId) ?
        setOpenPanels( openPanels.filter((p: number)=> p !== panelId) )
        :
        setOpenPanels( [...new Set([...openPanels, panelId])] )
    }

    

    return (
        <Body>
            <NavHeader page={''} />
            <main>
                <section className="faq" id="faq">
                    <h1>Mobile Money Rates</h1>
                    <div className="rate-txt">Mobile Money Rates For All Countries</div>
                    <div className={`content ${isPanelOpen(0) || " collapsed"}`}>
                        <div className="body">
                            <h3>Cameroon</h3>
                            <div className="details">
                                <div className="compare" id="compare">
                                    <div className="section-inner">
                                        <h2 className="heading">MTN</h2>
                                        <div className="table">
                                            <Table
                                                rows = {getCountryMomoData(servicesData?.[constants.CAMEROON_MTN_SERVICE_RATE_INDEX]).rows}
                                                headings={getCountryMomoData(servicesData?.[constants.CAMEROON_MTN_SERVICE_RATE_INDEX]).heading}
                                                config={{
                                                    customClassName: 'landing-page-table landing-page-compare-features-table',
                                                    cellSpacing: 0,
                                                    cellPadding: 0,
                                                    responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL,
                                                    targetHeadingLineForMobileResponsiveness: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a href="https://mtn.cm/momo/fees/" className="align-center is-link green-txt light-green-bg br-10 mt-20 mx-auto fit-content p-5 px-10" target="_blank" rel="noopener noreferrer">Click here for more information</a>
                                <div className="compare" id="compare">
                                    <div className="section-inner">
                                        <h2 className="heading">ORANGE</h2>
                                        <div className="table">
                                            <Table
                                                rows = {getCountryMomoData(servicesData?.[constants.CAMEROON_MTN_SERVICE_RATE_INDEX]).rows}
                                                headings={getCountryMomoData(servicesData?.[constants.CAMEROON_MTN_SERVICE_RATE_INDEX]).heading}
                                                config={{
                                                    customClassName: 'landing-page-table landing-page-compare-features-table',
                                                    cellSpacing: 0,
                                                    cellPadding: 0,
                                                    responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL,
                                                    targetHeadingLineForMobileResponsiveness: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a href="https://www.orange.cm/fr/tarification-orange-money.html" className="align-center is-link green-txt light-green-bg br-10 mt-20 mx-auto fit-content p-5 px-10" target="_blank" rel="noopener noreferrer">Click here for more information</a>
                            </div>
                        </div>

                        <div className="open">
                            <img onClick={() => togglePanel(0)} src={asset('icons', `${isPanelOpen(0) ? "sort-up.png" : "sort-down.png"}`)} alt="close" />
                        </div>
                    </div>

                    <div className={`content ${isPanelOpen(1) || " collapsed"}`}>
                        <div className="body">
                            <h3>Kenya</h3>
                            <div className="details">No Data Yet</div>
                        </div>

                        <div className="open">
                            <img onClick={() => togglePanel(1)} src={asset('icons', `${isPanelOpen(1) ? "sort-up.png" : "sort-down.png"}`)} alt="close" />
                        </div>
                    </div>


                    <div className={`content ${isPanelOpen(2) || " collapsed"}`}>
                        <div className="body">
                            <h3>Tanzania</h3>
                            <div className="details">
                                <div className="compare" id="compare">
                                    <div className="section-inner">
                                        <h2 className="heading">MPESA</h2>
                                        <div className="table">
                                            <Table
                                                rows = {getCountryMomoData(servicesData?.[constants.TANZANIA_MPESA_SERVICE_RATE_INDEX]).rows}
                                                headings={getCountryMomoData(servicesData?.[constants.TANZANIA_MPESA_SERVICE_RATE_INDEX]).heading}
                                                config={{
                                                    customClassName: 'landing-page-table landing-page-compare-features-table',
                                                    cellSpacing: 0,
                                                    cellPadding: 0,
                                                    responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL,
                                                    targetHeadingLineForMobileResponsiveness: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open">
                            <img onClick={() => togglePanel(2)} src={asset('icons', `${isPanelOpen(2) ? "sort-up.png" : "sort-down.png"}`)} alt="close" />
                        </div>
                    </div>

                    <div className={`content ${isPanelOpen(3) || " collapsed"}`}>
                        <div className="body">
                            <h3>Uganda</h3>
                            <div className="details">
                                <div className="compare" id="compare">
                                    <div className="section-inner">
                                        <h2 className="heading">MTN</h2>
                                        <div className="table">
                                            <Table
                                                rows = {getCountryMomoData(servicesData?.[constants.UGANDA_MTN_SERVICE_RATE_INDEX]).rows}
                                                headings={getCountryMomoData(servicesData?.[constants.UGANDA_MTN_SERVICE_RATE_INDEX]).heading}
                                                config={{
                                                    customClassName: 'landing-page-table landing-page-compare-features-table',
                                                    cellSpacing: 0,
                                                    cellPadding: 0,
                                                    responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL,
                                                    targetHeadingLineForMobileResponsiveness: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a href="https://www.mtn.co.ug/insight/mobile-money-tariffs/" className="align-center is-link green-txt light-green-bg br-10 mt-20 mx-auto fit-content p-5 px-10" target="_blank" rel="noopener noreferrer">Click here for more information</a>
                                <div className="compare" id="compare">
                                    <div className="section-inner">
                                        <h2 className="heading">AIRTEL</h2>
                                        <div className="table">
                                            <Table
                                                rows = {getCountryMomoData(servicesData?.[constants.UGANDA_AIRTEL_SERVICE_RATE_INDEX]).rows}
                                                headings={getCountryMomoData(servicesData?.[constants.UGANDA_AIRTEL_SERVICE_RATE_INDEX]).heading}
                                                config={{
                                                    customClassName: 'landing-page-table landing-page-compare-features-table',
                                                    cellSpacing: 0,
                                                    cellPadding: 0,
                                                    responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL,
                                                    targetHeadingLineForMobileResponsiveness: 1
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="open">
                            <img onClick={() => togglePanel(3)} src={asset('icons', `${isPanelOpen(3) ? "sort-up.png" : "sort-down.png"}`)} alt="close" />
                        </div>

                    </div>
                </section>

            </main>
        </Body>
    )
}

export default Support
