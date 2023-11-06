import { Button, Space, Steps } from "antd";
import styled from "styled-components";
import { Breakpoint, Colors, Heading } from "./stylesVariables";
import { MouseEventHandler } from "react";
import { loading } from "redux/reducers/app";
import { useHistory } from "react-router-dom";

interface PageTitileAndDescriptionProps {
  title: string;
  description: string;
}

const PageTitileAndDescriptionStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  gap: 12px;
  p {
    text-align: center;
    margin: 0;
  }
  p:last-child {
    color: ${Colors.textColor2};
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.36px;
    line-height: 150%;
    margin: 0;
    text-align: center;
    max-width: 600px;
  }
  @media (max-width: ${Breakpoint.sm}) {
    width: 75vw;
    gap: 8px;
    p {
    }
    p:last-child {
      line-height: 150%;
      font-size: 14px;
    }
  }
`;

export const PageTitileAndDescription = ({
  title,
  description,
}: PageTitileAndDescriptionProps) => {
  return (
    <PageTitileAndDescriptionStyles>
      <Heading>{title}</Heading>
      <p>{description}</p>
    </PageTitileAndDescriptionStyles>
  );
};

const TransactionsStepsStyles = styled.div`
  width: 100%;
  height: fit-content;
  //max-height: 160px;
  padding: 40px 24px;
  background: ${Colors.sbGreen};
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Breakpoint.sm}) {
    padding: 24px;
    //--testing
    display: none;
  }
`;

interface TransactionsStepsProps {
  step: "get-quote" | "recipient" | "review" | "pay";
}

export const TransactionsSteps = ({ step }: TransactionsStepsProps) => {
  const stepToCurrent: Record<TransactionsStepsProps["step"], number> = {
    "get-quote": 0,
    recipient: 1,
    review: 2,
    pay: 3,
  };

  const current = stepToCurrent[step];

  const stepsData = [
    {
      step: "get-quote",
      title: "Get Quote",
    },
    {
      step: "recipient",
      title: "Recipient",
    },
    {
      step: "review",
      title: "Review",
    },
    {
      step: "pay",
      title: "Pay",
    },
  ];

  const getStepDescription = (step: TransactionsStepsProps["step"]) => {
    if (stepToCurrent[step] === current) {
      return "In Progress";
    } else if (stepToCurrent[step] < current) {
      return "Completed";
    } else {
      return "Waiting";
    }
  };

  return (
    <TransactionsStepsStyles>
      <Steps
        //   type=""
        progressDot
        current={current}
        items={stepsData.map((data) => ({
          title: data.title,
          description: getStepDescription(
            data.step as TransactionsStepsProps["step"]
          ),
        }))}
      />
    </TransactionsStepsStyles>
  );
};

interface LargeButtonProps {
  onClick: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  text: string;
  loading?: boolean;
  hideBackBtn?: boolean;
}

export default function LargeButton({
  onClick,
  disabled,
  text,
  loading,
  hideBackBtn = false,
}: LargeButtonProps) {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const buttonWidth = {
    width: "120px",
  };

  return (
    <Space>
      {!hideBackBtn && (
        <Button size="large" onClick={goBack} style={buttonWidth}>
          Back
        </Button>
      )}
      <Button
        size="large"
        type="primary"
        style={buttonWidth}
        disabled={disabled}
        onClick={onClick}
        loading={loading}
      >
        {text}
      </Button>
    </Space>
  );
}
