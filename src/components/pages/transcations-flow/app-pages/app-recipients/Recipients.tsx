import {
  Avatar,
  Badge,
  Button,
  Divider,
  Empty,
  Input,
  List,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { paths } from "util/paths";
import DateSelectorAndSearchBar from "../../app-layout/components/searchBar/DateSelectorAndSearchBar";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import {
  catergoryList,
  generateAlphabetColor,
  getFirstLetter,
  replaceUnderScore,
} from "../../utils/reuseableUtils";
import { ModalMarginTop } from "../../utils/stylesVariables";
import { Title } from "../app-dashboard/DashboardSyles";
import {
  RecipientTableStyle,
  RecipientTableStyles,
  RecipientsContainerStyle,
} from "./RecipientsStyles";
import { DeleteOutlined } from "@ant-design/icons";
import { updateRecipient } from "redux/actions/actionsTransfer";
import { TRANSFER } from "redux/actionTypes";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { NewRecipient } from "./RecipientsControl";

const { Text } = Typography;

interface LocationState {
  transferId: string;
}

const prefix = (
  <SearchOutlined
    rev={undefined}
    style={{
      fontSize: 18,
      color: "#808080",
      paddingRight: "3px",
      paddingLeft: "3px",
    }}
  />
);

const filterRecipients = (searchvalue: string, recipients: any) => {
  const filtered = recipients.filter((recipient: any) => {
    return (
      (
        recipient.firstName.toLowerCase() +
        " " +
        recipient.lastName.toLowerCase()
      ).indexOf(searchvalue) !== -1 ||
      (
        recipient.lastName.toLowerCase() +
        " " +
        recipient.firstName.toLowerCase()
      ).indexOf(searchvalue) !== -1
    );
  });

  return filtered;
};

export default function Recipients() {
  const history = useHistory();
  const location = useLocation();
  const transferId = (location.state as LocationState)?.transferId;
  const { recipientId } = useSelector((state: any) => state.transfer);
  const recipients = useSelector((state: any) => state.recipients.recipients);
  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
  const [openNewRecipientModal, setOpenNewRecipientModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  const onContinueClicked = (category?: string) => {
    setBtnLoader(true);
    const naviagetToReview = (id: string) => {
      history.push(paths.REVIEW, { transferId: id });
      setBtnLoader(false);
    };
    updateRecipient(transferId, recipientId, naviagetToReview);
  };

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <RecipientsContainerStyle>
      {/* <TransferCategory
        open={openCategoriesModal}
        setOpen={setOpenCategoriesModal}
        callback={onContinueClicked}
      /> */}
      <NewRecipient
        open={openNewRecipientModal}
        setOpen={setOpenNewRecipientModal}
      />
      <TransactionsSteps step="recipient" />
      <PageTitileAndDescription
        title="Recipient"
        description="Who are you sending money to?😎"
      />
      <RecipientTableStyles>
        <div className="header">
          <Input
            placeholder="Enter recipient name"
            value={searchValue}
            onChange={onSearchInputChange}
            prefix={prefix}
          />
          <Button
            className="button"
            onClick={() => setOpenNewRecipientModal(true)}
          >
            <span className="textLg"> Add new recipient</span>
            <span className="textSm">New</span>
          </Button>
        </div>
        <Divider style={{ margin: 0 }} />
        <RecipientTable
          recipients={filterRecipients(searchValue, recipients)}
        />
      </RecipientTableStyles>
      <LargeButton
        text="Continue"
        onClick={() => {
          onContinueClicked();
          //setOpenCategoriesModal(true);
        }}
        loading={btnLoader}
        disabled={recipientId === ""}
      />
    </RecipientsContainerStyle>
  );
}

interface TableDataType {
  key: React.Key;
  recipient: string;
  paymentMethod: string;
  phoneNumber: string;
  id: string;
}

const getRecipientTableData = ({ recipients }: { recipients: any }) => {
  const dataSource: TableDataType[] = [];
  recipients
    ?.slice()
    ?.reverse()
    ?.forEach((recipient: any, index: number) => {
      const data = {
        key: index,
        recipient: `${recipient?.firstName} ${recipient?.lastName}`,
        paymentMethod: replaceUnderScore(
          recipient.profile.transferMethod
        ).toUpperCase(),
        phoneNumber: recipient.profile.mobile,
        id: recipient.id,
      };
      dataSource.push(data);
    });

  return dataSource;
};

const RecipientTable = (recipients: any) => {
  const data = getRecipientTableData(recipients);
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const [selectedId, setSelectedId] = useState("");

  const onRadioChange = (e: RadioChangeEvent) => {
    const id = e.target.value;
    setSelectedId(e.target.value);
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        recipientId: id,
      },
    });
  };

  return (
    <RecipientTableStyle>
      <Radio.Group onChange={onRadioChange} value={selectedId}>
        <Space direction="vertical" size={16}>
          {data.length === 0 ? (
            <Empty />
          ) : (
            data?.map((item, inedx) => (
              <Radio value={item.id} key={item.id}>
                <div className="list">
                  <div className="info">
                    <Avatar
                      size={34}
                      className="avatar"
                      style={{
                        background: generateAlphabetColor(
                          String(getFirstLetter(item.recipient))
                        ),
                      }}
                    >
                      {getFirstLetter(item.recipient)}
                    </Avatar>
                    <div className="info_details">
                      <p>{item.recipient}</p>
                      <span>{`${item.paymentMethod} ~ ${item.phoneNumber}`}</span>
                    </div>
                  </div>
                  {/* <Button size="small" danger type="text">
                  Delete
                </Button> */}
                </div>
              </Radio>
            ))
          )}
        </Space>
      </Radio.Group>
    </RecipientTableStyle>
  );
};

interface TransferCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: Function;
}

const TransferCategory = ({
  open,
  setOpen,
  callback,
}: TransferCategoryProps) => {
  const [selected, setSelected] = useState("General");

  const onContinue = () => {
    callback(selected);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title="Select transfer category"
      okText="Continue"
      cancelText="Cancel"
      onOk={onContinue}
      onCancel={() => setOpen(false)}
      width={550}
      style={ModalMarginTop}
    >
      <Divider />
      <Space wrap size={16}>
        {catergoryList.map((category, index) => {
          const categoryImg = `assets/images/transferCategoryImages/${category.toLowerCase()}.png`;
          return (
            <Space
              key={category + index}
              onClick={() => setSelected(category)}
              direction="vertical"
              align="center"
              style={{ width: 80 }}
            >
              <Badge dot={selected === category ? true : false}>
                <Avatar
                  src={categoryImg}
                  size={45}
                  style={{
                    border:
                      selected === category ? "2.5px solid #CF0921" : "none",
                  }}
                />
              </Badge>
              <Text
                style={{ color: selected === category ? "#CF0921" : "#333" }}
                ellipsis
              >
                {category}
              </Text>
            </Space>
          );
        })}
      </Space>
      <Divider />
    </Modal>
  );
};
