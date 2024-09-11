import React, { act } from "react";
import { read, utils } from "xlsx";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import useReaderExcel from "../hooks/useReaderExcel";
import LostsFetched from "../components/LostsFetched";

global.fetch = jest.fn(() => {
  Promise.resolve([
    {
      line: "Line1",
      date: "2023-09-11",
      residential: 30,
      comercial: 50,
      industrial: 20,
    },
    {
      line: "Line2",
      date: "2023-09-12",
      residential: 40,
      comercial: 60,
      industrial: 30,
    },
  ]);
}) as jest.Mock;

// Mockear global fetch para que devuelva un archivo Excel simulado
global.fetch = jest.fn(() =>
  Promise.resolve({
    arrayBuffer: () => Promise.resolve(createMockExcelFile()),
  })
) as jest.Mock;

// Función para crear un archivo Excel simulado en un ArrayBuffer
const createMockExcelFile = () => {
  const workbook = {
    Sheets: {
      Sheet1: {
        A1: { v: "Linea" },
        A2: { v: "Line1" },
        B1: { v: "Fecha" },
        B2: { v: "2023-09-11" },
        C1: { v: "Residencial [%]" },
        C2: { v: 0.3 },
        D1: { v: "Comercial [%]" },
        D2: { v: 0.5 },
        E1: { v: "Industrial [%]" },
        E2: { v: 0.2 },
      },
    },
    SheetNames: ["Sheet1"],
  };

  const arrayBuffer = new ArrayBuffer(8);
  // Convertir el objeto de workbook a un ArrayBuffer (esto depende del formato que estés usando)
  // Aquí deberías implementar una forma de convertir el objeto a un ArrayBuffer válido para tus pruebas
  return arrayBuffer;
};

describe("Losts Energy Component", () => {
  it("Should render correctly", async () => {
    render(<LostsFetched />);
    await waitFor(() => {
      expect(screen.getByTestId("container")).toBeInTheDocument();
    });
  });

  it("Should renders title and graphic container", () => {
    render(<LostsFetched />);
    expect(screen.getByText("Losts Energy")).toBeInTheDocument();
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("Should renders legend items.", async () => {
    render(<LostsFetched />);
    await screen.findByTestId("chart");
    const chart = screen.getByTestId("chart");
    expect(chart).toHaveAttribute("width", "800");
    expect(chart).toHaveAttribute("height", "400");
  });
});
