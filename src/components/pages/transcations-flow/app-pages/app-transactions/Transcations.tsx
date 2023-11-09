import {
  InfoCircleOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Table,
  Tooltip,
} from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { constants } from "util/constants";
import { paths } from "util/paths";
import DateSelectorAndSearchBar, {
  DateSelector,
} from "../../app-layout/components/searchBar/DateSelectorAndSearchBar";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import { generateAccountStatementPDF } from "../../utils/generateAccountStatementPdf";
import { getFirstLetter } from "../../utils/reuseableUtils";
import { Colors } from "../../utils/stylesVariables";
import { Title } from "../app-dashboard/DashboardSyles";
import { TransactionDetail } from "./TransactionDetail";
import {
  convertDate,
  convertDateToSeperateWithDash,
  formatTransactionStatus,
  formatTransactionsReversed,
  thisRecipient,
} from "./TransactionHelper";
import {
  TransactionIdStyles,
  TransactionsContainerStyles,
  TransactionsContentStyles,
  TranscationsTableHeader,
} from "./TranscationStyles";
import { TRANSFER } from "redux/actionTypes";

interface TableDataType {
  key: React.Key;
  recipient: string;
  date: string;
  amount_paid: string;
  amount_received: string;
  status: string;
  action: any;
}

const items = [
  {
    key: "1",
    label: "View details",
    icon: <UserOutlined rev={undefined} />,
  },
  {
    key: "2",
    label: "Resend",
    icon: <ReloadOutlined rev={undefined} />,
  },
];

export default function Transcations({ dashboard }: { dashboard?: boolean }) {
  const user = useSelector((state: any) => state.auth.user);
  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const { transactions, total, limit } = useSelector(
    (state: any) => state.transfer
  );
  const recipients = useSelector((state: any) => state.recipients.recipients);
  const history = useHistory();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [openTransactionDetail, setOpenTransactionDetail] = useState(false);
  const [currentTransactionDetail, setCurrentTransactionDetail] =
    useState<any>();
  const [selecetdRows, setSelectedRow] = useState<any>();
  const [downloadState, setDownloadState] = useState(false);

  //Action Dropdown
  const onClick: MenuProps["onClick"] = ({ key }) => {
    //if view details is clicked
    if (key === "1") {
      setOpenTransactionDetail(true);
    }
    //if resend is clicked
    else if (key === "2") {
      //do sth for resend transfer
      //update payIn, Payout, payoutCurrency
      const { originAmount, destinationAmount, destinationCurrency } =
        currentTransactionDetail || {};
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payinActualValue: originAmount,
          payoutActualValue: destinationAmount,
          payoutCurrency: destinationCurrency,
        },
      });
      //then naviagate to get quoute
      history.push(paths.GET_QUOTE);
    }
  };

  const generateColumns = (recipients: any) => {
    const columns: ColumnsType<TableDataType> = [
      {
        title: "Recipient",
        dataIndex: "recipient",
        ellipsis: true,
        render: (recipient) => {
          return (
            <Space>
              <Avatar icon={<UserOutlined rev={undefined} />}>
                {getFirstLetter(
                  thisRecipient(recipients, recipient.recipientId)?.firstName
                )}
                {getFirstLetter(
                  thisRecipient(recipients, recipient.recipientId)?.lastName
                )}
              </Avatar>
              <Space direction="vertical" size={0}>
                <span>
                  {thisRecipient(recipients, recipient.recipientId)?.firstName}{" "}
                  {thisRecipient(recipients, recipient.recipientId)?.lastName}
                </span>
                <TransactionIdStyles>
                  SBR{recipient.meta.transactionId}
                </TransactionIdStyles>
              </Space>
            </Space>
          );
        },
      },
      {
        title: "Date",
        dataIndex: "date",
        ellipsis: true,
      },
      {
        title: "Base currency",
        dataIndex: "amount_paid",
      },
      {
        title: "Target currency",
        dataIndex: "amount_received",
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status) => {
          return (
            <Space>
              <Badge
                color={formatTransactionStatus(status).color}
                text={formatTransactionStatus(status).text}
              />

              {/* {status === constants.TRANSFER_PAYMENT_FRAUD && (
                <Button
                  size="small"
                  icon={<InfoCircleOutlined rev={undefined} />}
                />
              )}
              {status === constants.TRANSFER_STATUS_PAYMENT_DECLINED && (
                <Button
                  size="small"
                  icon={<InfoCircleOutlined rev={undefined} />}
                />
              )} */}
            </Space>
          );
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        width: 100,
        fixed: "right",
        render: (action) => (
          <Space size="middle">
            <Dropdown menu={{ items, onClick }}>
              <Space
                align="center"
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentTransactionDetail(action);
                }}
              >
                <Button
                  type="text"
                  onMouseEnter={() => {
                    setCurrentTransactionDetail(action);
                  }}
                >
                  <IoIosMore size={24} color={Colors.textColor2} />
                </Button>
              </Space>
            </Dropdown>
          </Space>
        ),
      },
    ];

    return columns;
  };

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: TableDataType[]
  ) => {
    setSelectedRow(selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const formatedTransactionsForTable = formatTransactionsReversed(
    transactions,
    recipients
  );

  const columns = generateColumns(recipients);

  const onReloadSelectionClicked = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleTablePaginationChange = (pagination: TablePaginationConfig) => {
    if (pagination && pagination.current) {
      const offset = pagination.current - 1;
      //update store and make server request
      // dispatch({
      //   type: TRANSFER,
      //   payload: {
      //     ...transfers,
      //     offset: offset,
      //   },
      // });
      // getTransactions();
    }
  };

  const downloadStatementPdf = async () => {
    setDownloadState(true);
    const { address1, address2, firstName, lastName } = user.profile;
    const { code } = user.referral;
    const customerName = `${firstName} ${lastName}`;
    const customerAddress = address1;
    const accountNumber = code;

    const startDate =
      selecetdRows[selecetdRows.length - 1].recipient.dateCreated;
    const endDate = selecetdRows[0].recipient.dateCreated;

    const periodValue = `${convertDateToSeperateWithDash(
      startDate
    )} to ${convertDateToSeperateWithDash(endDate)}`;
    const periodHeaderTitle = `Period: ${convertDate(
      startDate
    )} to ${convertDate(endDate)}`;
    const selectedTransaction: any = [];

    selecetdRows
      .slice()
      .reverse()
      .forEach((selected: any, index: number) => {
        const data = selected.recipient;
        const recipientFirstName = thisRecipient(
          recipients,
          data.recipientId
        )?.firstName;
        const recipientLastName = thisRecipient(
          recipients,
          data.recipientId
        )?.lastName;
        selectedTransaction.push([
          `${convertDateToSeperateWithDash(data.dateCreated)}`,
          `SBR${data.meta.transactionId}`,
          `${data.meta.exchangeRate}`,
          `${data.originCurrency} ${data.originAmount}`,
          `${data.destinationAmount} ${data.destinationCurrency}`,
          `${recipientFirstName} ${recipientLastName}`,
        ]);
        return selectedTransaction;
      });
    try {
      await generateAccountStatementPDF({
        customerName,
        customerAddress,
        accountNumber,
        periodValue,
        periodHeaderTitle,
        selectedTransaction,
      });
      setDownloadState(false);
    } catch (error) {}
  };

  return (
    <TransactionsContainerStyles>
      {dashboard ? (
        <></>
      ) : (
        <PageTitileAndDescription
          title="Transaction History 🕒"
          description="View, manage, download, and analyze all the transactions you've created."
        />
      )}
      <TransactionsContentStyles>
        <TranscationsTableHeader>
          <Title>Transactions ({total})</Title>
          {dashboard ? (
            <Button
              onClick={() => {
                history.push(paths.TRANSACTIONS);
              }}
            >
              View all
            </Button>
          ) : (
            <DateSelector />
          )}
        </TranscationsTableHeader>

        <Table
          onChange={handleTablePaginationChange}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={formatedTransactionsForTable}
          pagination={{
            position: ["bottomCenter"],
            //pageSize: 10,
            showSizeChanger: false,
            total: total,
          }}
          footer={() => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Tooltip title="Click to reload selected transactions">
                  <Button
                    onClick={onReloadSelectionClicked}
                    disabled={!hasSelected}
                    loading={loading}
                  >
                    Reload
                  </Button>
                </Tooltip>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected (${selectedRowKeys.length})` : ""}
                </span>
              </div>
              <Tooltip title="Click to dwonload selected transaction(s)">
                <Button
                  disabled={!hasSelected}
                  onClick={downloadStatementPdf}
                  loading={downloadState}
                >
                  Download
                </Button>
              </Tooltip>
            </div>
          )}
          scroll={{ x: 1200 }}
        />
      </TransactionsContentStyles>

      {currentTransactionDetail && (
        <TransactionDetail
          open={openTransactionDetail}
          setOpen={setOpenTransactionDetail}
          transaction={currentTransactionDetail}
        />
      )}
    </TransactionsContainerStyles>
  );
}
