import {
  CalendarOutlined,
  CloseOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Space } from "antd";
import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSACTIONS } from "redux/actionTypes";
import styled from "styled-components";

const prefix = (
  <SearchOutlined
    rev={undefined}
    style={{
      fontSize: 18,
      color: "#808080",
      paddingRight: "3px",
      paddingLeft: "3px",
    }}
  />
);

interface SearchProps {
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onCancel: () => void;
  showDateSlector?: boolean;
}

export default function DateSelectorAndSearchBar({
  value,
  placeholder,
  onChange,
  onCancel,
  showDateSlector,
}: SearchProps) {
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  // State to keep track of the typed value
  const [typedValue, setTypedValue] = useState(value);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterModalContent, setFilterModalContent] =
    useState<React.ReactNode>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log(newValue);
    // Update the typedValue immediately
    setTypedValue(newValue);

    // Clear the existing timer (if any)
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer for 2000 milliseconds (2 seconds)
    const newTimer = setTimeout(() => {
      // Call the onChange prop after 2 seconds of inactivity
      onChange(e);
    }, 500);

    // Update the timer state with the new timer
    setTimer(newTimer);
  };

  const handleCancel = () => {
    // Clear the existing timer (if any)
    if (timer) {
      clearTimeout(timer);
    }
    // Reset the typedValue and value when the user clicks cancel
    setTypedValue("");
    onCancel();
  };

  const suffix = (
    <Button
      type="text"
      style={{ display: value === "" ? "none" : "block", padding: "2px px" }}
      onClick={handleCancel}
    >
      <CloseOutlined
        rev={undefined}
        style={{
          fontSize: 16,
          color: "#808080",
        }}
      />
    </Button>
  );

  const SearchBar = () => {
    return (
      <SearchbarContainerStyle>
        <Input
          className="input"
          placeholder={placeholder}
          value={typedValue}
          size="large"
          prefix={prefix}
          suffix={suffix}
          onChange={handleOnChange}
        />
      </SearchbarContainerStyle>
    );
  };

  return (
    <FilterContainerStyles>
      <SearchBar />

      {/* {showDateSlector && (
        <div className="date_selector">
          <DateSelector />
        </div>
      )}
      <div className="filter_button_sm">
        {showDateSlector && (
          <Button
            icon={<CalendarOutlined rev={undefined} />}
            onClick={() => {
              setFilterModalContent(<DateSelector />);
              setOpenFilterModal(true);
            }}
          />
        )}
        <Button
          icon={<SearchOutlined rev={undefined} />}
          onClick={() => {
            setFilterModalContent(<SearchBar />);
            setOpenFilterModal(true);
          }}
        />
      </div>
      {openFilterModal && (
        <FilterModal
          open={openFilterModal}
          setOpen={setOpenFilterModal}
          content={filterModalContent}
        />
      )} */}
    </FilterContainerStyles>
  );
}

export const DateSelector = ({ loading }: { loading?: boolean }) => {
  const transactions = useSelector((state: any) => state.transactions);
  const { days } = transactions || {};

  const dispatch = useDispatch();
  //update store and make server request
  const handleChange = (value: string) => {
    dispatch({
      type: TRANSACTIONS,
      payload: {
        ...transactions,
        days: Number(value),
      },
    });
  };
  return (
    <Space>
      {loading ? (
        <LoadingOutlined rev={undefined} />
      ) : (
        <CalendarOutlined rev={undefined} />
      )}
      <Select
        size="large"
        defaultValue={String(days)}
        className="date_selector"
        onChange={handleChange}
        options={[
          { value: "1", label: "24 hrs ago" },
          { value: "7", label: "7 days ago" },
          { value: "30", label: "30 days ago" },
          { value: "60", label: "60 days ago" },
          { value: "90", label: "90 days ago" },
          { value: "360", label: "1 year ago" },
          { value: "8000", label: "All Time", disabled: false },
        ]}
      />
    </Space>
  );
};

interface FilterModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode | undefined;
}

const FilterModal = ({ open, setOpen, content }: FilterModalProps) => {
  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
      {content}
    </Modal>
  );
};

const SearchbarContainerStyle = styled.div`
  .input {
    width: 300px;
    border-radius: 200px;
  }
`;

const FilterContainerStyles = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  .select {
    width: 200px;
  }
  /* .date_selector {
  } */
  .filter_button_sm {
    display: none;
  }
  @media (max-width: ${Breakpoint.lg}) {
    .input {
      width: 250px;
    }
  }
  .select {
    width: 160px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    .input {
      display: none;
      width: 100%;
    }
    .select {
      width: 200px;
    }
    .date_selector {
      display: none;
    }
    .filter_button_sm {
      display: flex;
      gap: 12px;
    }
  }
`;
