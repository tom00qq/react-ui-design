import type { Meta, StoryObj } from "@storybook/react-vite";

import Badge from "./Badge";

const meta = {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Groups: Story = {
  args: {
    children: "Badge",
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Badge {...args} colorPalette="gray">
        {args.children}
      </Badge>
      <Badge {...args} colorPalette="green">
        {args.children}
      </Badge>
      <Badge {...args} colorPalette="red">
        {args.children}
      </Badge>
    </div>
  ),
};
