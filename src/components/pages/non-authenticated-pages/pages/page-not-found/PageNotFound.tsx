import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PageResponsiveWidth } from "../../global-styles/styles";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <PageNotFoundStyles>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button size="large" type="primary" onClick={() => history.goBack()}>
            Go Back
          </Button>
        }
      />
    </PageNotFoundStyles>
  );
};

export default PageNotFound;

const PageNotFoundStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0px;
  height: 100vh;
`;
