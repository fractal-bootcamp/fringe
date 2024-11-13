import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";

import XUserPage from "@/components/XUserPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "XUserPage",
  component: XUserPage,
  parameters: {
    layout: "fullscreen",
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof XUserPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // name: "John Doe",
    // image: "https://github.com/shadcn.png",
    // goToProfile: () => {},
    // onMatch: () => {},
    // onUnmatch: () => {},
  },
};
