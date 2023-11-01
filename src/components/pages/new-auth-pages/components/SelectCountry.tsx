import { COUNTRIES, Country } from "../utils/countries";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import styled from "styled-components";
import { BiChevronDown } from "react-icons/bi";
import { getFlagUrl } from "../utils/getFlagUrl";
import { theme } from "../theme";
import ModalBackdrop from "./ModalBackdrop";

type Props = {
  country: Country;
  setCountry: Dispatch<SetStateAction<Props["country"]>>;
};

const SelectCountry = ({ country, setCountry }: Props) => {
  const [showSelectCountryModal, setShowSelectCountryModal] = useState(false);

  const modalBackgroundRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Container onClick={() => setShowSelectCountryModal(true)}>
        {/* <DialCode>{country.dialCode}</DialCode> */}
        <Flag src={getFlagUrl(country.countryCode.toLowerCase())} alt="flag" />
        <BiChevronDown size={28} color={theme.color.dark} />
      </Container>
      {showSelectCountryModal && (
        <ModalBackdrop>
          <Modal ref={modalBackgroundRef}>
            <ul>
              <CloseButton onClick={() => setShowSelectCountryModal(false)}>
                Close
              </CloseButton>
              {COUNTRIES.map((country) => (
                <li
                  className="country-row"
                  key={country.name}
                  onClick={() => {
                    setCountry(country);
                    setShowSelectCountryModal(false);
                  }}
                >
                  <ListFlag
                    src={getFlagUrl(country.countryCode.toLowerCase())}
                    alt="flag"
                  />
                  {country.name} ({country.dialCode})
                </li>
              ))}
            </ul>
          </Modal>
        </ModalBackdrop>
      )}
    </>
  );
};

export default SelectCountry;

const Container = styled.div`
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.base};
  }
`;

// const DialCode = styled.p`
//   font-size: ${({ theme }) => theme.font.size.lg};
//   margin-right: 6px;

//   @media (max-width: 768px) {
//     font-size: ${({ theme }) => theme.font.size.base};
//   }
// `;

const Flag = styled.img`
  width: 52px;
  height: 38px;
  border-radius: 6px;
`;

const Modal = styled.div`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  padding: 1rem;

  ul {
    background-color: #fff;
    list-style: none;
    padding: 32px 0 16px;
    border-radius: 8px;
    max-height: 90vh;
    overflow-y: auto;
    max-width: 450px;
    width: 100%;
    position: relative;
  }

  li.country-row {
    cursor: pointer;
    padding: 12px 24px;
    display: flex;
    gap: 16px;
    align-items: center;
    color: ${({ theme }) => theme.color.dark};
    font-size: ${({ theme }) => theme.font.size.xl};
  }

  li.country-row:hover {
    background-color: ${({ theme }) => theme.color.gray};
  }

  @media (max-width: 768px) {
    li.country-row {
      font-size: ${({ theme }) => theme.font.size.base};
    }
  }
`;

const ListFlag = styled.img`
  width: 30px;
  height: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 0;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.color.danger};
`;
