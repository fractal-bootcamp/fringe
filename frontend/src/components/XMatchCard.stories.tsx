import type { Meta, StoryObj } from '@storybook/react';

import XmatchCard from './XMatchCard';

const meta = {
  component: XmatchCard,
} satisfies Meta<typeof XmatchCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "name",
    initials: "NM",
    message: "message",
    onChatClick: () => {}
  }
};