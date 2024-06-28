import {
  SearchOutlined,
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Empty,
  Flex,
  Input,
  MenuProps,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { TRANSFER } from "redux/actionTypes";
import { updateRecipient } from "redux/actions/actionsTransfer";
import { paths } from "util/paths";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import {
  catergoryList,
  generateAlphabetColor,
  getFirstLetter,
  replaceUnderScore,
  transferMethodsInWords,
} from "../../utils/reuseableUtils";
import { ModalMarginTop } from "../../utils/stylesVariables";
import { NewRecipient } from "./RecipientsControl";
import {
  FlexWithAlignCenter,
  RecipientTableStyle,
  RecipientTableStyles,
  RecipientsContainerStyle,
} from "./RecipientsStyles";
import { deleteRecipient, getRecipients } from "redux/actions/actions";

const { Text } = Typography;

interface LocationState {
  transferQuoteResponse: any;
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

const filterRecipients = (
  searchValue: string,
  recipients: any,
  transferMethod: string
) => {
  const filtered = recipients?.filter((recipient: any) => {
    const fullName =
      `${recipient?.firstName} ${recipient?.lastName}`.toLowerCase();
    const searchLowerCase = searchValue.toLowerCase();
    const transferMethodInWord =
      transferMethodsInWords[transferMethod]?.toLowerCase();

    const isRecipientSoftDeleted = recipient?.status === "SOFT_DELETED";

    return (
      recipient?.profile?.transferMethod.toLowerCase() ===
        transferMethodInWord &&
      fullName.includes(searchLowerCase) &&
      !isRecipientSoftDeleted
    );
  });
  return filtered;
};

export default function Recipients() {
  const history = useHistory();
  const location = useLocation();
  const transferQuoteResponse = (location.state as LocationState)
    ?.transferQuoteResponse;
  // const { recipientId } = useSelector((state: any) => state.transfer);
  const [recipientId, setRecipientId] = useState("");
  const recipients = useSelector((state: any) => state.recipients.recipients);
  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
  const [openNewRecipientModal, setOpenNewRecipientModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  const { id, transferMethod } = transferQuoteResponse || {};

  const onContinueClicked = (category?: string) => {
    setBtnLoader(true);
    const naviagetToReview = (id: string) => {
      setBtnLoader(false);
      history.push(paths.REVIEW, { transferId: id });
    };

    const onErrorEncountered = () => {
      setBtnLoader(false);
    };

    updateRecipient(id, recipientId, naviagetToReview, onErrorEncountered);
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
        transferQuoteResponse={transferQuoteResponse}
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
          recipients={filterRecipients(searchValue, recipients, transferMethod)}
          setRecipientId={setRecipientId}
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

const RecipientTable = ({
  recipients,
  setRecipientId,
}: {
  recipients: any;
  setRecipientId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const data = getRecipientTableData(recipients);
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const [selectedId, setSelectedId] = useState("");
  const [activeRecipientDropDown, setActiveRecipientDropDown] = useState<any>();

  const onRadioChange = (e: RadioChangeEvent) => {
    const id = e.target.value;
    setSelectedId(e.target.value);
    setRecipientId(id);
    // dispatch({
    //   type: TRANSFER,
    //   payload: {
    //     ...transfer,
    //     recipientId: id,
    //   },
    // });
  };

  const handleRecipientDelete = (recipientId: string | number) => {
    deleteRecipient(recipientId, () => getRecipients());
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>Delete</div>,
      icon: <DeleteOutlined rev={undefined} />,
      onClick: () => {
        handleRecipientDelete(activeRecipientDropDown?.id);
      },
      danger: true,
    },
    // {
    //   key: "2",
    //   label: <div>Update</div>,
    //   icon: <EditOutlined rev={undefined} />,
    // },
  ];

  return (
    <RecipientTableStyle>
      <Radio.Group
        className="radio_group"
        onChange={onRadioChange}
        value={selectedId}
      >
        <Space direction="vertical" size={16}>
          {data.length === 0 ? (
            <Empty />
          ) : (
            data?.map((item, inedx) => (
              <Radio value={item.id} key={item.id} className="radio">
                <FlexWithAlignCenter>
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
                  </div>

                  <Dropdown menu={{ items }} placement="bottom">
                    <Button
                      type="default"
                      icon={<MoreOutlined rev={undefined} />}
                      onClick={() => setActiveRecipientDropDown(item)}
                    />
                  </Dropdown>
                </FlexWithAlignCenter>
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
