import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  UnlockOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Button, List, Space, Tag } from "antd";
import { ComplyCubeVerification } from "components/pages/verification/ComplyCubeVerification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TRANSFER } from "redux/actionTypes";
import {
  refreshUserDetails,
  userVerificationAction,
} from "redux/actions/actions";
import { paths } from "util/paths";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import { consoleLogOnLocalHost } from "../../utils/reuseableUtils";
import { Title } from "../app-dashboard/DashboardSyles";
import { FormVerification } from "./FormVerification";
import {
  VerificationHelpNoteStyle,
  VerificationStyle,
  VerificationsBodyStyles,
  VerificationsContainerStyles,
} from "./VerificationsStyles";
import {
  Verifictions,
  checkToShowVerificationForm,
  getVerificationStatus,
} from "./verificationsHelper";

export default function Verifications() {
  const user = useSelector((state: any) => state.auth.user);
  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const { currentTransferBeforeRedirectVericationsPage } = transfer || {};
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

  const idVerificationStatus = getVerificationStatus(user, Verifictions.id);
  const docVerificationStatus = getVerificationStatus(
    user,
    Verifictions.document
  );

  const idAttempted =
    idVerificationStatus === "ATTEMPTED" || idVerificationStatus === "VALID";
  const docAttempted =
    docVerificationStatus === "ATTEMPTED" || docVerificationStatus === "VALID";

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
      status: isFormVerified,
    },
    {
      title: "Identity Verification",
      description: "We need to verify your identity.",
      key: "identity",
      status: idVerificationStatus,
    },
    {
      title: "Document Verification",
      description: "We also need to verify your document.",
      key: "document",
      status: docVerificationStatus,
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
  const isBtnDisabled = (key: string): boolean => {
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

  const onContinueToPaymentClicked = () => {
    consoleLogOnLocalHost(currentTransferBeforeRedirectVericationsPage);
    history.push(paths.PAYMENT_METHOD, {
      transfer: currentTransferBeforeRedirectVericationsPage,
    });

    //clear from redux store
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        currentTransferBeforeRedirectVericationsPage: undefined,
      },
    });
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
              ) : (
                <>
                  {(item.status === "VALID" || item.status === true) &&
                    successIcon}
                  {(item.status === "ATTEMPTED" || item.status === "INVALID") &&
                    inProgressIcon}
                  {(item.status === "PENDING" || item.status === false) && (
                    <Button
                      type="primary"
                      onClick={() => handleOnStartClicked(item.key)}
                      disabled={isBtnDisabled(item.key)}
                    >
                      Start
                    </Button>
                  )}
                </>
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

      {/* !currentTransferBeforeRedirectVericationsPage !== undefined && */}
      {idAttempted &&
        docAttempted &&
        currentTransferBeforeRedirectVericationsPage !== undefined && (
          <Button
            type="default"
            size="large"
            onClick={onContinueToPaymentClicked}
          >
            Continue with payment 💳
          </Button>
        )}
      {!idAttempted && !hasCompletedAllVerifications && verificationHelpNote}
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

const inProgressIcon = (
  <Avatar
    size={45}
    icon={<ClockCircleTwoTone rev={undefined} twoToneColor="#1677FF" />}
    style={{
      background: "none",
      boxSizing: "border-box",
      flexShrink: 0,
    }}
  />
);

const verificationHelpNote = (
  <VerificationHelpNoteStyle>
    <Alert
      description={
        <div>
          Note: For a smoother <b>Identity verification experience</b> on
          mobile, consider disabling the <b>'Desktop Site'</b> mode in your
          browser settings.
        </div>
      }
      type="info"
      showIcon
      closable
    />
  </VerificationHelpNoteStyle>
);
