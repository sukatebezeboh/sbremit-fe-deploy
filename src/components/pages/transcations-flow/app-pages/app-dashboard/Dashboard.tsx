import React, { useEffect } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  HistoryOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  AddNewTransfer,
  AnalyticCard,
  DashboardAnalyticsStyle,
  DashboardContainerStyle,
  DashboardTransactionsStyle,
  FabAddNewTransfer,
  ForUnverifiedUserMsgStyles,
  Title,
} from "./DashboardSyles";
import { Alert, Button, FloatButton } from "antd";
import Transcations from "../app-transactions/Transcations";
import { useHistory } from "react-router-dom";
import { paths } from "util/paths";
import { useSelector } from "react-redux";
import { categorizeTransactions } from "../../utils/reuseableUtils";
import { resetTransferData } from "redux/actions/actions";
import Marquee from "react-fast-marquee";

export default function Dashboard() {
  const isUserVerified = useSelector((state: any) => state.auth.verification);
  const { transactions } = useSelector((state: any) => state.transfer);
  const history = useHistory();

  useEffect(() => {
    resetTransferData();
  }, []);

  const addNewTransfer = () => {
    history.push(paths.TRANSFER_METHOD);
  };

  const AnalyticsData = [
    {
      count: categorizeTransactions(transactions).completed.total,
      status: "Completed",
      percentegae: categorizeTransactions(transactions).completed.percentage,
      iconBgColor: "#3E947F",
      icon: <CheckOutlined rev={undefined} />,
    },
    {
      count: categorizeTransactions(transactions).cancelled.total,
      status: "Cancelled",
      percentegae: categorizeTransactions(transactions).cancelled.percentage,
      iconBgColor: "#E24D58",
      icon: <CloseOutlined rev={undefined} />,
    },
    {
      count: categorizeTransactions(transactions).pending.total,
      status: "Pending",
      percentegae: categorizeTransactions(transactions).pending.percentage,
      iconBgColor: "#FCD20F",
      icon: <HistoryOutlined rev={undefined} />,
    },
  ];

  const ForUnverifiedUserMsg = () => (
    <ForUnverifiedUserMsgStyles>
      <Alert
        showIcon={false}
        className="alert"
        type="error"
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            {" "}
            Verify your account to unlock secure transactions! 🛡️{" "}
          </Marquee>
        }
      />{" "}
      <Button
        type="primary"
        onClick={() => history.push(paths.VERIFICATION)}
        danger
      >
        Verify now
      </Button>
    </ForUnverifiedUserMsgStyles>
  );

  return (
    <DashboardContainerStyle>
      {!isUserVerified && <ForUnverifiedUserMsg />}
      <DashboardAnalyticsStyle>
        <Title>Analytics</Title>
        <div className="anlytics_cards">
          {AnalyticsData.map((card, index) => (
            <AnalyticCard
              $iconBgColor={card.iconBgColor}
              key={card.status + index}
            >
              <div className="body">
                <div className="count_and_status">
                  <p>{card.count}</p>
                  <span>{card.status}</span>
                </div>
                <div className="icon">{card.icon}</div>
              </div>
              <div className="footer">
                <p>{card.percentegae}% of total transactions</p>
              </div>
            </AnalyticCard>
          ))}

          <AddNewTransfer onClick={addNewTransfer}>
            <PlusOutlined rev={undefined} />
            <p>Start transfer</p>
          </AddNewTransfer>
        </div>
      </DashboardAnalyticsStyle>
      <DashboardTransactionsStyle>
        <Transcations page="dashboard" />
      </DashboardTransactionsStyle>
      <FabAddNewTransfer>
        <FloatButton
          style={{ padding: 6, width: 62 }}
          icon={<PlusOutlined rev={undefined} />}
          type="primary"
          shape="square"
          onClick={addNewTransfer}
          description="Start"
        />
      </FabAddNewTransfer>
    </DashboardContainerStyle>
  );
}
