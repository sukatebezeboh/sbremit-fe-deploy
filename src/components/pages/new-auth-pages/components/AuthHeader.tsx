import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { paths } from "util/paths";

interface Props {
  heading: string;
  subHeading?: string;
  link?: {
    text: string;
    path: string;
  };
  backLink?: boolean;
}

const AuthHeader = ({ heading, subHeading, link, backLink }: Props) => {
  return (
    <>
      {backLink && (
        <BackLink>
          <Link to={paths.SIGN_IN}>
            <BiArrowBack size={30} />
            <span>Back to login</span>
          </Link>
        </BackLink>
      )}
      <Heading sub_heading={subHeading}>{heading}</Heading>
      {subHeading && (
        <SubHeading>
          {subHeading} {link && <Link to={link.path}>{link.text}</Link>}
        </SubHeading>
      )}
    </>
  );
};

export default AuthHeader;

const BackLink = styled.span`
  margin-bottom: 8px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.color.primary};
    font-size: ${({ theme }) => theme.font.size["xl"]};
    font-weight: 500;
  }

  @media (max-width: 768px) {
    a {
      font-size: ${({ theme }) => theme.font.size.base};
    }
  }
`;

const Heading = styled.div<{ sub_heading: string | undefined }>`
  color: ${({ theme }) => theme.color.dark};
  font-size: ${({ theme }) => theme.font.size["6xl"]};
  font-weight: 700;
  line-height: 60.5px;
  margin-bottom: 4px;
  margin-inline: ${({ sub_heading }) => (sub_heading ? "0" : "auto")};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size["3xl"]};
    line-height: 36px;
    letter-spacing: -1.4px;
    margin-bottom: 8px;
    max-width: ${({ sub_heading }) => (sub_heading ? "250px" : "auto")};
    text-align: ${({ sub_heading }) => (sub_heading ? "left" : "center")};
  }
`;

const SubHeading = styled.div`
  color: ${({ theme }) => theme.color.dark};
  font-size: ${({ theme }) => theme.font.size["xl"]};
  font-weight: 300;
  line-height: 130%;

  a {
    color: ${({ theme }) => theme.color.primary};
    font-weight: 500;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.base};
  }
`;
