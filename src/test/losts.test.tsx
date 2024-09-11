import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Losts from "../components/Losts";

describe("Losts Energy Component", () => {
  it("Should render correctly", () => {
    render(<Losts />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  it("Should renders title and graphic container", () => {
    render(<Losts />);
    expect(screen.getByText("Losts Energy")).toBeInTheDocument();
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("Should renders legend items.", async () => {
    render(<Losts />);
    await screen.findByTestId("chart");
    const chart = screen.getByTestId("chart");
    expect(chart).toHaveAttribute("width", "800");
    expect(chart).toHaveAttribute("height", "400");
  });

  it("Should calls useEffect when svgRef changes.", () => {
    const useEffectSpy = jest.spyOn(React, "useEffect");
    const { rerender } = render(<Losts />);
    rerender(<Losts />);
    expect(useEffectSpy).toHaveBeenCalledTimes(2);
  });
});
