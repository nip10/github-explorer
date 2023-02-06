import { cleanup, render, screen } from "@testing-library/react";
import { myTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import Bookmark from "./Bookmark";

afterEach(cleanup);

describe("Bookmark", () => {
  it("should render bookmarked icon", () => {
    render(
      <ThemeProvider theme={myTheme}>
        <Bookmark bookmarked />
      </ThemeProvider>
    );

    const bookmarkContainer = screen.getByTestId("bookmark");
    const icon = bookmarkContainer.querySelector("svg");
    expect(icon).toHaveAttribute("id", "star_filled");
  });

  it("should render not bookmarked icon", () => {
    render(
      <ThemeProvider theme={myTheme}>
        <Bookmark bookmarked={false} />
      </ThemeProvider>
    );

    const bookmarkContainer = screen.getByTestId("bookmark");
    const icon = bookmarkContainer.querySelector("svg");
    expect(icon).toHaveAttribute("id", "star_outlined");
  });
});
