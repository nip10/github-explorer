import type { PropsWithChildren } from "react";
import styled, { css, type DefaultTheme } from "styled-components";

type PillVariant = "primary" | "secondary";

const variantStyles = (theme: DefaultTheme, variant: PillVariant) =>
  ({
    primary: css`
      background-color: ${theme.colors.slate[300]};
      color: ${theme.colors.slate[900]};
      border-color: ${theme.colors.slate[400]};
      &:hover {
        background-color: ${theme.colors.slate[400]};
      }
    `,
    secondary: css`
      background-color: ${theme.colors.slate[50]};
      color: ${theme.colors.slate[900]};
      border-color: ${theme.colors.slate[400]};
      &:hover {
        background-color: ${theme.colors.slate[200]};
      }
    `,
  }[variant]);

type PillProps = PropsWithChildren<{ variant?: PillVariant }>;

const Pill = styled.div<PillProps>`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.2;
  font-weight: 600;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 200ms;
  height: 2.5rem;
  min-width: 2.5rem;
  font-size: 1rem;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  cursor: pointer;
  font-family: inherit;
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 1px;
  ${({ theme, variant = "primary" }) => variantStyles(theme, variant)}
`;

export default Pill;
