import { cleanup, render, screen } from "@testing-library/react";
import { myTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import Topic from "./Topic";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("../lib/api/useRepositories", () => {
  return {
    __esModule: true,
    default: () =>
      jest.fn(() => ({
        data: {
          totalCount: 81,
          items: [
            {
              repoName: "awesome-go",
              repoOwner: "avelino",
              fullName: "avelino/awesome-go",
              image:
                "https://opengraph.githubassets.com/68bf7c9189fafc422792c06da89511a1/avelino/awesome-go",
              url: "https://github.com/avelino/awesome-go",
            },
          ],
        },
        isLoading: false,
      })),
  };
});

afterEach(cleanup);

describe("Topic", () => {
  it("should render a topic correctly", () => {
    const topic = "Go";
    render(
      <ThemeProvider theme={myTheme}>
        <Topic topic={topic} />
      </ThemeProvider>
    );

    const topicHeading = screen.getByRole("heading", { name: `Top ${topic}` });
    expect(topicHeading).toBeInTheDocument();
  });
});
