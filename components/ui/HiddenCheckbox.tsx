import { useState } from "react";
import styled from "styled-components";

export type HiddenCheckboxProps = {
  defaultChecked?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderValue?: (checked: boolean, value: string) => React.ReactNode;
};

const HiddenInput = styled.input`
  display: none;
`;

const HiddenCheckbox: React.FC<HiddenCheckboxProps> = ({
  defaultChecked,
  value,
  renderValue,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e);
  };
  return (
    <label>
      <HiddenInput
        type="checkbox"
        checked={checked}
        value={value}
        onChange={onCheckboxChange}
      />
      {renderValue ? renderValue(checked, value) : value}
    </label>
  );
};

export default HiddenCheckbox;
