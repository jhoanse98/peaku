import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Costs from "../components/Costs";

describe("Costs Component", () => {
  it("Should render correctly", () => {
    render(<Costs />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });

  it("Should renders title and graphic container", () => {
    render(<Costs />);
    expect(screen.getByText("Costs Energy")).toBeInTheDocument();
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("Should renders legend items.", async () => {
    render(<Costs />);
    await screen.findByTestId("chart");
    const chart = screen.getByTestId("chart");
    expect(chart).toHaveAttribute("width", "800");
    expect(chart).toHaveAttribute("height", "400");
  });

  it("Should calls useEffect when svgRef changes.", () => {
    const useEffectSpy = jest.spyOn(React, "useEffect");
    const { rerender } = render(<Costs />);
    rerender(<Costs />);
    expect(useEffectSpy).toHaveBeenCalledTimes(2);
  });
});
