import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";

import XUpdateProfile from "@/components/XUpdateProfile";
import { ProfileType } from "@/types/types";
import { UpdateProfileData } from "@/hooks/useUpdate";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "XUpdateProfile",
  component: XUpdateProfile,
  parameters: {
    layout: "fullscreen",
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof XUpdateProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    profileType: ProfileType.applicant,
    nameInput: "Sarah Johnson",
    locationInput: "San Francisco, CA",
    experienceInput: "5 years of full-stack development experience at tech startups",
    educationInput: "BS Computer Science, Stanford University",
    portfolioUrlInput: "https://sarahjohnson.dev",
    onUpdateProfile: async (profileData: UpdateProfileData) => Promise.resolve(),
  },
};

export const Secondary: Story = {
  args: {
    profileType: ProfileType.company,
    nameInput: "TechFlow Solutions",
    locationInput: "Austin, TX",
    employeeCountInput: 85,
    yearsOfOperationInput: 4,
    industryInput: "Enterprise Software",
    fundingRoundInput: "Series B",
    onUpdateProfile: async (profileData: UpdateProfileData) => Promise.resolve(),
  },
};
