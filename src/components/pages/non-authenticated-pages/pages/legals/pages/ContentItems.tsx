import { Paragraph } from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import React from "react";
import styled from "styled-components";

export const ContentItems = ({ data }: { data: any }) => {
  return (
    <ContentItemsWrapper>
      {data &&
        data.map((item: any, index: number) => (
          <ContentItem key={index} item={item} index={index} />
        ))}
    </ContentItemsWrapper>
  );
};

interface ContentItemProps {
  item: any;
  index: number;
}

const ContentItem: React.FC<ContentItemProps> = ({ item, index }) => {
  const numbering: any = index + 1;

  return (
    <ContentItemWrapper>
      <div className="_title">
        <Paragraph>
          <span className="numbering">{numbering}</span>
        </Paragraph>
        <Paragraph> {item.title}</Paragraph>
      </div>
      <div style={{ display: "" }}>
        {item.content.map((c: any, i: number) => (
          <ContentParagraph
            key={"content_paragraph_" + i}
            numbering={numbering}
            content={c}
          />
        ))}
      </div>
    </ContentItemWrapper>
  );
};

interface ContentParagraphProps {
  numbering: string | number;
  content: any;
}

const ContentParagraph: React.FC<ContentParagraphProps> = ({
  numbering,
  content,
}) => (
  <ContentParagraphStyles>
    <Paragraph $small as="div">
      {content?.type === "list" ? (
        Array.isArray(content?.text) ? (
          <ul>
            {content?.text?.map((text: string, i: number) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        ) : (
          <ul>
            {Object.entries(content?.text).map(([key, value]) => (
              <li key={key}>
                <div className="key">{key}</div>
                <div className="value">{value}</div>
              </li>
            ))}
          </ul>
        )
      ) : (
        content.text.map((text: string, i: number) => <p key={i}>{text}</p>)
      )}
    </Paragraph>
  </ContentParagraphStyles>
);

const ContentItemsWrapper = styled.div`
  height: auto;
  width: 100%;

  p {
    line-height: 150% !important;
    letter-spacing: 0px !important;
    max-width: 100%;
    word-wrap: break-word;
  }
`;

const ContentParagraphStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ContentItemWrapper = styled.div`
  height: auto;
  width: 100%;

  ._title {
    display: flex;
    gap: 10px;
    align-items: center;
    p {
      font-weight: 600;
    }
  }

  ul {
    list-style: none;
    list-style-type: disc;
    margin: 0px;
    padding: 10px 16px;
    li {
      margin: 5px;
      .key {
        font-weight: 500;
      }
      .value {
      }
    }
  }
`;
