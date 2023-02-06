import styled from "styled-components";
import { UnstyledListItem } from "./List";

type NavItemProps = {
  active?: boolean;
};

const NavItem = styled(UnstyledListItem)<NavItemProps>`
  font-weight: bold;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.slate[800]};
  text-decoration: ${({ active }) => (active ? "underline" : "none")};
  text-underline-offset: 0.2rem;
  text-decoration-thickness: 0.1rem;
  text-decoration-color: ${({ theme }) => theme.colors.slate[900]};
`;

export { NavItem };
