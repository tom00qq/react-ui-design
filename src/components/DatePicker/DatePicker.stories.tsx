import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useRef } from "react";
import DatePicker, { type DatePickerRef } from "./DatePicker";

const meta = {
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: new Date("2024/11/13"),
    defaultValue: new Date("2024/11/13"),
  },
};

export const Controlled = () => {
  const [date, setDate] = useState(new Date("2025/08/14"));

  const handleOnChange = (newDate: Date) => {
    console.log("Father Component take over state control.");
    setDate(newDate);
  };

  return (
    <div>
      <DatePicker value={date} onChange={handleOnChange} />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: `
- 使用 \`value\` 由父層控制
- 需要提供 \`onChange\` 來同步更新父層狀態
- 不要同時使用 \`defaultValue\`
      `,
    },
  },
};

export const Uncontrolled = () => {
  const defaultValue = new Date();
  return (
    <div>
      <DatePicker defaultValue={defaultValue} />
      <p>Selected date: {defaultValue.toDateString()}</p>
    </div>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story: `
- \`value\` 由內部層控制
      `,
    },
  },
};

export const UncontrolledGetValue = () => {
  const datePickerRef = useRef<DatePickerRef>(null);
  let value = new Date();

  const handleOnClick = () => {
    const selectedDate = datePickerRef.current?.getValue();
    alert("時間: " + selectedDate);
  };

  return (
    <div>
      <DatePicker ref={datePickerRef} defaultValue={value} />
      <button onClick={handleOnClick}>Get Selected Date</button>
    </div>
  );
};
