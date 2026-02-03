import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/(dashboard)/page";

describe("Home", () => {
  it("renders the welcome message", async () => {
    // Home is an async server component; await its JSX before rendering
    const element = await Home();
    render(element);
    expect(
      screen.getByText(
        /We are thrilled to welcome you to our event and are honored to have you lead the Advanced GitHub Copilot Hands-on Workshop./i
      )
    ).toBeInTheDocument();
  });
});
