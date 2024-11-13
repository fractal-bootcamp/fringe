import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";

import XProfilePage from "../components/XProfilePage";

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
    name: "John Doe",
    location: "New York, NY",
    experience:
      "Software engineer with 5 years of experience in full-stack development, specializing in React and Node.js",
    education:
      "Bachelor of Science in Computer Science from Harvard University. Graduated with honors and specialized in Artificial Intelligence and Machine Learning",
    portfolio: [
      { name: "AI Chat Assistant", url: "https://github.com/john-doe/ai-chat" },
      { name: "E-commerce Platform", url: "https://github.com/john-doe/shop-smart" },
      { name: "Weather Dashboard", url: "https://github.com/john-doe/weather-app" },
    ],
    image: "https://github.com/shadcn.png",
  },
};
