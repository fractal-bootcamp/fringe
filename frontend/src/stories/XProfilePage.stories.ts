import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";

import XProfilePage from "../components/XProfilePage";
import { ProfileType } from "@/types/types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "XProfilePage",
  component: XProfilePage,
  parameters: {
    layout: "fullscreen",
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof XProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    profileType: ProfileType.applicant,
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    location: "New York, NY",
    applicantProps: {
      experience:
        "Software engineer with 5 years of experience in full-stack development, specializing in React and Node.js",
      education:
        "Bachelor of Science in Computer Science from Harvard University. Graduated with honors and specialized in Artificial Intelligence and Machine Learning",
      portfolio: [
        { name: "AI Chat Assistant", url: "https://github.com/john-doe/ai-chat" },
        { name: "E-commerce Platform", url: "https://github.com/john-doe/shop-smart" },
        { name: "Weather Dashboard", url: "https://github.com/john-doe/weather-app" },
      ],
    },
  },
};

export const Secondary: Story = {
  args: {
    profileType: ProfileType.company,
    image: "https://github.com/shadcn.png",
    name: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    companyProps: {
      yearsOfOperation: 10,
      employeeCount: 250,
      industry: "Information Technology",
      fundingRound: "Series B",
    },
  },
};
