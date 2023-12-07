import {
  CheckCircleTwoTone,
  UnlockOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Avatar, Button, FloatButton, List, Space, Tag } from "antd";
import { ComplyCubeVerification } from "components/pages/verification/ComplyCubeVerification";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  refreshUserDetails,
  userVerificationAction,
} from "redux/actions/actions";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import { Title } from "../app-dashboard/DashboardSyles";
import { FormVerification } from "./FormVerification";
import {
  VerificationStyle,
  VerificationsBodyStyles,
  VerificationsContainerStyles,
} from "./VerificationsStyles";
import {
  Verifictions,
  checkToShowVerificationForm,
  checkVerification,
} from "./verificationsHelper";

export default function Verifications() {
  const user = useSelector((state: any) => state.auth.user);
  const history = useHistory();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [isFormVerified, setFormVerified] = useState(false);
  // For cases of user.meta.verified is true #verification parent
  const { verified } = user?.meta || {};

  const [displayComplyCubeVerification, setDisplayComplyCubeVerification] =
    useState(false);

  useEffect(() => {
    setFormVerified(() => Boolean(checkToShowVerificationForm(user)));
  }, [user]);

  const hasCompletedAllVerifications = Boolean(verified);

  const idAttempted = checkVerification(user, Verifictions.id);
  const docAttempted = checkVerification(user, Verifictions.document);

  //For cases of old users with either ID or Document verification plus new users
  const docAndIdAttempted = idAttempted && docAttempted;

  const onSubmitFormClicked = async (values: any) => {
    const StartComplyCubeVerification = () => {
      setFormVerified(true);

      refreshUserDetails();
    };
    await userVerificationAction(values, StartComplyCubeVerification);
  };

  const verificationList = [
    {
      title: "Proof of address",
      description: "Please tell us a little about yourself.",
      key: "address",
      isAttempted: isFormVerified,
    },
    {
      title: "Identity Verification",
      description: "We need to verify your identity.",
      key: "identity",
      isAttempted: idAttempted,
    },
    {
      title: "Document Verification",
      description: "We also need to verify your document.",
      key: "document",
      isAttempted: docAttempted,
    },
  ];

  const handleOnStartClicked = (verificationKey: string) => {
    if (verificationKey === "address") {
      return setOpenFormModal(true);
    } else {
      //cases for document and id
      return setDisplayComplyCubeVerification(true);
    }
  };

  //this logic ensure user follow the order of FE verifications check and enable CTA
  const isBtnDiabled = (key: string): boolean => {
    if (key === "identity" && isFormVerified) {
      return false; //do not diabled when key is id and from isVerfied
    } else if (key === "document" && idAttempted) {
      return false; // enable if doc and id is idAttempted
    } else if (key === "address") {
      return false; // enable for address
    }
    return true; // diabled otherwise
  };

  const verificationPercentage = (): string => {
    const successfulAttempts = [
      isFormVerified,
      idAttempted,
      docAttempted,
    ].filter((attempt) => attempt).length;

    if (verified) {
      //super verified
      return "3";
    } else if (successfulAttempts === 3) {
      return "3";
    } else if (successfulAttempts === 1) {
      return "1";
    } else if (successfulAttempts === 2) {
      return "2";
    } else {
      return "0";
    }
  };

  const openVerificationHelp = () => {
    return null;
  };

  return (
    <VerificationsContainerStyles>
      <PageTitileAndDescription
        title="Verify your identity"
        description="Lets get you started with SBremit 🚀"
      />
      <VerificationsBodyStyles>
        <List
          size="small"
          className="list"
          header={<Header />}
          footer={
            <div className="footer">
              <Tag color="#007B5D">
                {verificationPercentage()}/3 completed ✅
              </Tag>
            </div>
          }
          bordered
          dataSource={verificationList}
          renderItem={(item, index) => (
            <List.Item>
              <VerificationStyle>
                <div className="content">
                  <Avatar className="avatar">0{index + 1}</Avatar>
                  <div className="info">
                    <p>{item.title}</p>
                    <span>{item.description}</span>
                  </div>
                </div>
              </VerificationStyle>
              {/* if hasCompletedAllVerifications === true ? show success icons for all cases : lets identify each case */}
              {hasCompletedAllVerifications ? (
                successIcon
              ) : item.isAttempted ? (
                successIcon
              ) : (
                <Button
                  type="primary"
                  onClick={() => handleOnStartClicked(item.key)}
                  disabled={isBtnDiabled(item.key)} //avoid two CTA, ensure Form submission before ID and Doc
                >
                  Start
                </Button>
              )}
            </List.Item>
          )}
        />
      </VerificationsBodyStyles>

      {/* Verifications modals */}
      <FormVerification
        open={openFormModal}
        setOpen={setOpenFormModal}
        submit={onSubmitFormClicked}
      />
      <ComplyCubeVerification
        open={displayComplyCubeVerification}
        setOpen={setDisplayComplyCubeVerification}
      />

      <FloatButton
        tooltip="Mobile? Untick 'Desktop Site' for smoother verification experience."
        //tooltip="Need some help!"
        icon={<QuestionOutlined rev={undefined} />}
        type="primary"
        onClick={openVerificationHelp}
      />
    </VerificationsContainerStyles>
  );
}

const Header = () => {
  return (
    <div className="header">
      <Space size={12}>
        <Avatar
          size={36}
          icon={<UnlockOutlined rev={undefined} />}
          style={{ backgroundColor: "#007B5D" }}
        />
        <Title>Unlock Your Transactions</Title>
      </Space>
    </div>
  );
};

const successIcon = (
  <Avatar
    size={45}
    icon={<CheckCircleTwoTone rev={undefined} twoToneColor="#52c41a" />}
    style={{
      background: "none",
      boxSizing: "border-box",
      flexShrink: 0,
    }}
  />
);
