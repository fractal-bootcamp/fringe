import type { Meta, StoryObj } from "@storybook/react";

import XHeader from "@/components/XHeader";

const meta = {
  title: "XHeader",
  component: XHeader,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof XHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Discover",
  },
};
