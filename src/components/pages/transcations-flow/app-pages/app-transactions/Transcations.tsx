import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
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
import { TRANSACTIONS, TRANSFER } from "redux/actionTypes";
import { paths } from "util/paths";
import { useRecipientsData } from "../../app-layout/appLayoutHelper";
import { DateSelector } from "../../app-layout/components/searchBar/DateSelectorAndSearchBar";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import { getFirstLetter } from "../../utils/reuseableUtils";
import { Colors } from "../../utils/stylesVariables";
import { Title } from "../app-dashboard/DashboardSyles";
import { TransactionDetail } from "./TransactionDetail";
import {
  downloadStatementPdf,
  formatTransactionStatus,
  formatTransactionsReversed,
  thisRecipient,
  useTransactionsData,
} from "./TransactionHelper";
import {
  RecipientName,
  TransactionIdStyles,
  TransactionsContainerStyles,
  TransactionsContentStyles,
  TranscationsTableHeader,
} from "./TranscationStyles";

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

interface TranscationsProps {
  page: "dashboard" | "account_statement";
}

export default function Transcations({ page }: TranscationsProps) {
  const user = useSelector((state: any) => state.auth.user);
  const { isFetched, isError } = useRecipientsData(user?.id);
  const recipients = useSelector((state: any) => state.recipients.recipients);
  const {
    isLoading: isLoadingTransactions,
    isFetching: isFetchingTransactions,
  } = useTransactionsData(user?.id, isFetched || isError);

  const isLoadingOrFetchingTransactions =
    isLoadingTransactions || isFetchingTransactions;

  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const transactions = useSelector((state: any) => state.transactions);
  const { transactionsArray, total, days, limit } = transactions || {};
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
      //update payIn, Payout, payoutCurrency, tranfer method
      const {
        originAmount,
        destinationAmount,
        destinationCurrency,
        transferMethod,
      } = currentTransactionDetail || {};
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payinActualValue: originAmount,
          payoutActualValue: destinationAmount,
          payoutCurrency: destinationCurrency,
          transferMethod: transferMethod,
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
                <RecipientName>
                  {`${
                    thisRecipient(recipients, recipient.recipientId)?.firstName
                  } ${
                    thisRecipient(recipients, recipient.recipientId)?.lastName
                  }`}
                </RecipientName>
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
    transactionsArray,
    recipients,
    page
  );

  const totalTranscations =
    page === "account_statement" ? formatedTransactionsForTable.length : total;

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
      const offset = (pagination.current - 1) * limit;

      dispatch({
        type: TRANSACTIONS,
        payload: {
          ...transactions,
          offset: offset,
        },
      });
    }
  };

  return (
    <TransactionsContainerStyles>
      {page === "dashboard" ? (
        <></>
      ) : page === "account_statement" ? (
        <PageTitileAndDescription
          title="Account Statement 📋"
          description={`View, manage, analyze, and download all completed transactions from  ${
            days == 8000 ? "all time." : `the past ${days} day(s).`
          } `}
        />
      ) : (
        <PageTitileAndDescription
          title="Transaction History 🕒"
          description="View, manage and analyze all the transactions you've created."
        />
      )}
      <TransactionsContentStyles>
        <TranscationsTableHeader>
          <Title>
            {page === "dashboard" ? "Transactions" : "Total"} (
            {totalTranscations})
          </Title>
          {page === "dashboard" ? (
            <Button
              onClick={() => {
                history.push(paths.TRANSACTIONS);
              }}
            >
              View all
            </Button>
          ) : (
            <DateSelector loading={isLoadingOrFetchingTransactions} />
          )}
        </TranscationsTableHeader>

        <Table
          onChange={handleTablePaginationChange}
          rowSelection={page === "account_statement" ? rowSelection : undefined}
          columns={columns}
          dataSource={formatedTransactionsForTable}
          pagination={{
            position: ["bottomCenter"],
            //pageSize: 10,
            showSizeChanger: false,
            total: totalTranscations,
          }}
          footer={() =>
            page === "account_statement" && (
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
                    onClick={() =>
                      downloadStatementPdf(
                        user,
                        selecetdRows,
                        recipients,
                        setDownloadState
                      )
                    }
                    loading={downloadState}
                  >
                    Download
                  </Button>
                </Tooltip>
              </div>
            )
          }
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
