import "styled-components";
import type { ThemeColors } from "./styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
  }
}
