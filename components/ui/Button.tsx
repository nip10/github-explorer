import type { PropsWithChildren } from "react";
import styled, { css, type DefaultTheme } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "link";

const variantStyles = (
  theme: DefaultTheme,
  variant: ButtonVariant,
  active?: boolean
) =>
  ({
    primary: css`
      background: ${({ theme }) => theme.colors.slate[900]};
      color: ${({ theme }) => theme.colors.slate[100]};
      &:hover {
        background: ${({ theme }) => theme.colors.slate[800]};
      }
      &:disabled {
        background: ${({ theme }) => theme.colors.slate[200]};
        color: ${({ theme }) => theme.colors.slate[500]};
      }
    `,
    secondary: css`
      background-color: ${theme.colors.slate[50]};
      color: ${theme.colors.slate[900]};
      &:hover {
        background-color: ${theme.colors.slate[200]};
      }
      &:disabled {
        background-color: ${theme.colors.slate[100]};
        color: ${theme.colors.slate[500]};
      }
    `,
    link: css`
      background-color: transparent;
      color: ${theme.colors.slate[900]};
      ${active &&
      css`
        text-decoration: underline;
        text-underline-offset: 0.2rem;
        text-decoration-thickness: 0.1rem;
        text-decoration-color: ${theme.colors.slate[900]};
      `}
      &:disabled {
        color: ${theme.colors.slate[500]};
      }
    `,
  }[variant]);

type ButtonProps = PropsWithChildren<{
  variant?: ButtonVariant;
  active?: boolean;
}>;

const Button = styled.button<ButtonProps>`
  border: none;
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  outline: transparent solid 2px;
  outline-offset: 2px;
  line-height: 1.2;
  border-radius: 0.375rem;
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
  ${({ theme, variant = "primary", active }) =>
    variantStyles(theme, variant, active)}
`;

export default Button;
