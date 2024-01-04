import {
  CheckOutlined,
  CloseOutlined,
  HistoryOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Alert, Button, FloatButton } from "antd";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { paths } from "util/paths";
import { categorizeTransactions } from "../../utils/reuseableUtils";
import Transcations from "../app-transactions/Transcations";
import {
  AddNewTransfer,
  AnalyticCard,
  DashboardAnalyticsStyle,
  DashboardContainerStyle,
  DashboardTransactionsStyle,
  FabAddNewTransferStyles,
  ForUnverifiedUserMsgStyles,
  Title,
} from "./DashboardSyles";

export default function Dashboard() {
  const isUserVerified = useSelector((state: any) => state.auth.verification);
  const { transactions } = useSelector((state: any) => state.transfer);
  const history = useHistory();

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

      <FabAddNewTransferStyles>
        <Button
          type="primary"
          icon={<PlusOutlined rev={undefined} />}
          onClick={addNewTransfer}
        >
          Start transfer
        </Button>
      </FabAddNewTransferStyles>

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
    </DashboardContainerStyle>
  );
}
