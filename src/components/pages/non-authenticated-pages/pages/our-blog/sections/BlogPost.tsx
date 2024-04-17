import { Button } from "antd";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H4,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";

const BlogPost = () => {
  return (
    <BlogPostStyles>
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <Post key={"blog_post_" + index} />
        ))}
    </BlogPostStyles>
  );
};

export default BlogPost;

const Post = () => {
  return (
    <PostStyles>
      <img src="/assets/images/happy-customer-1.png" />
      <div className="_content_container">
        <div className="_content_header">
          <Paragraph $small>OCTOBER 16, 2023</Paragraph>
          <div className="_label">Fraud Alert</div>
        </div>

        <div className="_content">
          <H4 $small>Internal Benchmark Report</H4>
          <Paragraph $small>
            SB Remit provides a low-cost, hassle-free way to send money to
            Africa from the UK and Canada. SB Remit provides a low-cost,
            hassle-free way to send money to Africa from the UK and Canad...
          </Paragraph>
        </div>
      </div>
    </PostStyles>
  );
};

const BlogPostStyles = styled(PageResponsiveWidth)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${Breakpoint.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${Breakpoint.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PostStyles = styled.div`
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  background: #fafafa;

  max-width: 496px;
  height: auto;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;

  img {
    width: 496px;
    height: 274px;
    flex-shrink: 0;

    @media (max-width: ${Breakpoint.md}) {
      height: 250px;
    }
  }
  ._content_container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 28px;

    @media (max-width: ${Breakpoint.sm}) {
      padding: 18px;
      gap: 18px;
    }

    ._content_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;

      p {
        color: #6a6a6a;
      }

      ._label {
        display: flex;
        padding: 8px 12px;
        justify-content: center;
        align-items: center;

        border-radius: 8px;
        border-radius: 8px;
        background: #007b5d;
        color: #fff;

        font-weight: 500;

        @media (max-width: ${Breakpoint.md}) {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 6px;
        }
      }
    }
    ._content {
      display: flex;
      flex-direction: column;
      gap: 4px;

      h4 {
        font-weight: 600;
      }
    }
  }
`;
