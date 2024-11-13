import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";

import XSettingsPage from "@/components/XSettingsPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "XSettingsPage",
  component: XSettingsPage,
  parameters: {
    layout: "fullscreen",
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof XSettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "John Doe",
    image: "https://github.com/shadcn.png",
    onUpdatePhoto: () => {},
    onUpdateProfile: () => {},
    onLikesYou: () => {},
    onMatches: () => {},
  },
};
