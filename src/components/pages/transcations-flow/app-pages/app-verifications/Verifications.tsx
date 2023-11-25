import { CheckCircleTwoTone, UnlockOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Space, Tag } from "antd";
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
import { consoleLogOnLocalHost } from "../../utils/reuseableUtils";

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
      title: "Identity Verification",
      description: "Please verify your Identity",
      key: "identity",
      isAttempted: docAndIdAttempted,
    },
    {
      title: "Document Verification",
      description: "Please verify your Documnets",
      key: "document",
      isAttempted: docAndIdAttempted,
    },
    {
      title: "Proof of address",
      description: "Please tell us a little about yourself",
      key: "address",
      isAttempted: isFormVerified,
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
                {isFormVerified && docAndIdAttempted
                  ? "100%"
                  : isFormVerified
                  ? "50%"
                  : "0%"}{" "}
                completed ✅
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
                  disabled={item.key === "document" && !item.isAttempted} //avoid two CTA
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
