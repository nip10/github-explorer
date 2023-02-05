import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled, { css, DefaultTheme, keyframes } from "styled-components";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const contentStyles = css`
  min-width: 220;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  &[data-state="open"] {
    &[data-side="top"] {
      animation-name: slideDownAndFade;
    }
    &[data-side="right"] {
      animation-name: slideLeftAndFade;
    }
    &[data-side="bottom"] {
      animation-name: slideUpAndFade;
    }
    &[data-side="left"] {
      animation-name: slideRightAndFade;
    }
  }
`;

const DropdownMenuContent = styled(DropdownMenu.Content)`
  ${contentStyles}
`;

const DropdownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: white;
`;

const itemStyles = (theme: DefaultTheme) => css`
  all: unset;
  font-size: 0.8rem;
  line-height: 1;
  color: ${theme.colors.slate[600]};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 1.5rem;
  padding: 0 5px;
  position: relative;
  padding-left: 1.5rem;
  padding-right: 0.5rem;
  user-select: none;

  &[data-disabled] {
    color: ${theme.colors.slate[600]};
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: ${theme.colors.slate[600]};
    color: ${theme.colors.slate[50]};
    svg {
      color: ${theme.colors.slate[50]};
    }
  }
`;

const DropdownMenuCheckboxItem = styled(DropdownMenu.CheckboxItem)`
  ${({ theme }) => itemStyles(theme)};
`;

const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  > svg {
    width: 0.75rem;
    height: 0.75rem;
    color: ${({ theme }) => theme.colors.slate[600]};
  }
`;

const IconButton = styled.button`
  all: unset;
  font-family: inherit;
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.slate[900]};
  background-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[100]};
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

export type DropdownOption<T = string> = {
  label: string;
  value: T;
};

type DropdownProps = {
  selected: DropdownOption["value"];
  options: DropdownOption[];
  onSelect: (option: DropdownOption["value"]) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect }) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <IconButton aria-label="Customise options">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </IconButton>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={option.value === selected}
            onCheckedChange={(checked) => onSelect(option.value)}
          >
            <DropdownMenuItemIndicator>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="checkmark"
                x="0px"
                y="0px"
                width="122.877px"
                height="101.052px"
                viewBox="0 0 122.877 101.052"
                xmlSpace="preserve"
                fill="currentColor"
              >
                <g>
                  <path d="M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z" />
                </g>
              </svg>
            </DropdownMenuItemIndicator>
            {option.label}
          </DropdownMenuCheckboxItem>
          // <DropdownMenuItem
          //     onSelect={() => onSelect(option.value)}
          //     key={option.value}
          //   >
          //     {option.label}
          //   </DropdownMenuItem>
        ))}
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default Dropdown;
