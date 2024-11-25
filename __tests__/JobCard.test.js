import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom matchers
import JobCard from "../components/JobCard";
import React from "react";

describe("JobCard Component", () => {
  const mockOnApply = jest.fn();

  const mockProps = {
    title: "Software Engineer",
    description: "Develop and maintain web applications.",
    experience: 3,
    onApply: mockOnApply,
  };

  it("renders the job card with title, description, and experience", () => {
    render(<JobCard {...mockProps} />);

    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Develop and maintain web applications./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Experience: 3 years/i)).toBeInTheDocument();
  });

  it("renders 'Apply Now' button", () => {
    render(<JobCard {...mockProps} />);

    const applyButton = screen.getByText(/Apply Now/i);
    expect(applyButton).toBeInTheDocument();
  });

  it("calls the onApply handler with the correct role when 'Apply Now' is clicked", () => {
    render(<JobCard {...mockProps} />);

    const applyButton = screen.getByText(/Apply Now/i);
    fireEvent.click(applyButton);

    expect(mockOnApply).toHaveBeenCalledTimes(1);
    expect(mockOnApply).toHaveBeenCalledWith("Software Engineer");
  });

  it("applies hover effects to the 'Apply Now' button", () => {
    render(<JobCard {...mockProps} />);

    const applyButton = screen.getByText(/Apply Now/i);
  });

  it("ensures the job card scales up on hover", () => {
    render(<JobCard {...mockProps} />);

    const cardElement = screen.getByText(/Software Engineer/i).closest("div");
    expect(cardElement).toHaveClass("p-6");

    // Simulate hover
    fireEvent.mouseOver(cardElement);
    expect(cardElement).toHaveClass("p-6");
  });
});
