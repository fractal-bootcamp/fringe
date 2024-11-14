import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";

import XNavbar from "@/components/XNavbar";

const meta = {
  title: "XNavbar",
  component: XNavbar,
  parameters: {
    layout: "fullscreen",
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof XNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
