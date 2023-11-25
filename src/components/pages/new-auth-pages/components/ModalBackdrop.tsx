import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalBackdrop = ({ children }: { children: JSX.Element }) => {
  return createPortal(
    <Container>{children}</Container>,
    document.getElementById("portal") as HTMLElement
  );
};

export default ModalBackdrop;

const Container = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
`;
