import type { Meta, StoryObj } from "@storybook/react-vite";

import MyButton from "./MyButton";

const meta = {
  component: MyButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "MyButton",
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: "MyButton",
    primary: false,
  },
};
