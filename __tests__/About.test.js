import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import axios from "axios";
import Page from "../app/about/page";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("Page Component", () => {
  const mockTeamMembers = [
    {
      name: "Alice Johnson",
      position: "Designer",
      image: "/images/team-member.png",
    },
    {
      name: "Bob Brown",
      position: "Developer",
      image: "/images/team-member.png",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { teamMembers: mockTeamMembers },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the About Us page correctly", async () => {
    render(<Page />);

    // Assert other parts of the component
    expect(screen.getByText(/our story/i)).toBeInTheDocument();
    expect(screen.getByText(/our values/i)).toBeInTheDocument();
    expect(screen.getByText(/meet our team/i)).toBeInTheDocument();
  });

  test("fetches and displays team members from API", async () => {
    render(<Page />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/api/getteammembers");
    });

    const teamMemberNames = mockTeamMembers.map((member) => member.name);
    teamMemberNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    const teamMemberPositions = mockTeamMembers.map(
      (member) => member.position
    );
    teamMemberPositions.forEach((position) => {
      expect(screen.getByText(position)).toBeInTheDocument();
    });
  });
});
