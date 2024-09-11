import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Consume from "../components/Consume";

describe("Consume Component", () => {
  it("Should render correctly", () => {
    render(<Consume />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  it("Should renders title and graphic container", () => {
    render(<Consume />);
    expect(screen.getByText("Consume Energy")).toBeInTheDocument();
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("Should renders legend items.", async () => {
    render(<Consume />);
    await screen.findByTestId("chart");
    const chart = screen.getByTestId("chart");
    expect(chart).toHaveAttribute("width", "800");
    expect(chart).toHaveAttribute("height", "400");
  });

  it("Should calls useEffect when svgRef changes.", () => {
    const useEffectSpy = jest.spyOn(React, "useEffect");
    const { rerender } = render(<Consume />);
    rerender(<Consume />);
    expect(useEffectSpy).toHaveBeenCalledTimes(2);
  });
});
