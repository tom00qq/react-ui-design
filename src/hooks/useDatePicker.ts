import { useEffect, useRef, useState, useImperativeHandle } from "react";
import type { DatePickerRef } from "../components/DatePicker/DatePicker";

export const useDatePicker = (
  value?: Date,
  onChange?: (date: Date) => void,
  defaultValue?: Date,
  ref?: React.Ref<DatePickerRef>
) => {
  const isControlled = value !== undefined;

  // params check
  if (process.env.NODE_ENV !== "production") {
    if (value && defaultValue) {
      console.warn(
        "DatePicker: you provided both 'value' and 'defaultValue'.'defaultValue' will be ignored"
      );
    }
  }

  if (isControlled && !onChange && process.env.NODE_ENV !== "production") {
    console.warn(
      "DatePicker: `value` is provided without `onChange`. Component will be read-only."
    );
  }

  const initDateValue = isControlled
    ? value
    : defaultValue
    ? defaultValue
    : new Date();

  const currentYear = initDateValue.getFullYear();
  const currentMonth = initDateValue.getMonth() + 1;
  const currentDate = initDateValue.getDate();

  const dateModalRef = useRef<HTMLDivElement>(null);

  const getFirstDayOfMonth = (year: number, month: number) => {
    const monthIndex = month - 1;
    return new Date(year, monthIndex, 1).getDay();
  };

  const getLastDateOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getDateList = (year: number, month: number) => {
    const lastDate = new Date(year, month, 0).getDate();
    return Array.from({ length: lastDate }, (_, i) => i + 1);
  };

  const getYearList = (year: number) => {
    const years = [];
    const startYear = year - 100;
    const endYear = year + 10;

    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }

    return years;
  };

  const formatedDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  const handleOnBlur = (e: React.FocusEvent) => {
    if (dateModalRef.current?.contains(e.relatedTarget)) {
      return;
    }
    setShow(false);
  };

  const updateDate = (newDate: Date) => {
    if (!isControlled) {
      setInternalDateValue(newDate);
    }

    if (onChange) {
      onChange(newDate);
    }
  };

  const [internalDateValue, setInternalDateValue] = useState(
    defaultValue ? defaultValue : initDateValue
  );
  const [show, setShow] = useState(false);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const yearList = getYearList(selectedYear);
  const monthList = Array.from({ length: 12 }, (_, i) => i + 1);
  const dateList = getDateList(selectedYear, selectedMonth);
  const filledDayList = Array.from(
    { length: getFirstDayOfMonth(selectedYear, selectedMonth) },
    (_, i) => i + 1
  );

  const dateValue = isControlled ? value : internalDateValue;

  useEffect(() => {
    if (!dateList.includes(selectedDate)) {
      setSelectedDate(getLastDateOfMonth(selectedYear, selectedMonth));
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (!dateList.includes(selectedDate)) return;

    const newDate = new Date(selectedYear, selectedMonth - 1, selectedDate);

    if (newDate !== dateValue) {
      updateDate(newDate);
    }
  }, [selectedYear, selectedMonth, selectedDate]);

  useImperativeHandle(ref, () => ({
    getValue: () => dateValue,
  }));

  const handlers = {
    handleOnBlur,
    setSelectedYear,
    setSelectedMonth,
    setSelectedDate,
    formatedDate,
    show: () => setShow(true),
    hide: () => setShow(false),
    nextYear: () => setSelectedYear((prev) => prev + 1),
    prevYear: () => setSelectedYear((prev) => prev - 1),
    nextMonth: () => setSelectedMonth((prev) => prev + 1),
    prevMonth: () => setSelectedMonth((prev) => prev - 1),
    getValue: () => dateValue,
  };

  return {
    dateModalRef,
    dateValue,
    show,
    selectedYear,
    selectedMonth,
    selectedDate,
    yearList,
    monthList,
    dateList,
    filledDayList,
    handlers,
  };
};

// bug
// 1. 月份滿要加年份
