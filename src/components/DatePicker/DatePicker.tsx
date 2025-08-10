import { useEffect, useState } from "react";

import "./datePicker.css";

const DatePicker = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const getFirstDayOfMonth = (year: number, month: number) => {
    const monthIndex = month - 1;
    return new Date(year, monthIndex, 1).getDay();
  };

  const getDayList = (year: number, month: number) => {
    const monthIdex = month - 1;
    const lastDate = new Date(year, monthIdex, 0).getDate();
    return Array.from({ length: lastDate }, (_, i) => i + 1);
  };

  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  const [yearList] = useState<number[]>(() => {
    const years = [];
    const startYear = currentYear - 100;
    const endYear = currentYear + 10;

    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }

    return years;
  });

  const monthList = Array.from({ length: 12 }, (_, i) => i + 1);
  const [dayList, setDayList] = useState<number[]>(() =>
    getDayList(currentYear, currentMonth)
  );

  const [fillDayArray, setFillDayArray] = useState(
    Array.from(
      { length: getFirstDayOfMonth(currentYear, currentMonth) },
      (_, i) => i + 1
    )
  );

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setDayList(getDayList(selectedYear, selectedMonth));
    setFillDayArray(
      Array.from(
        { length: getFirstDayOfMonth(selectedYear, selectedMonth) },
        (_, i) => i + 1
      )
    );
  }, [selectedYear, selectedMonth]);

  return (
    <div className="date-picker">
      <input
        type="text"
        id="date"
        readOnly
        value={date}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(true)}
      />
      {show ? (
        <div className="date-modal">
          <div className="years">
            <button type="button" className="prev-btn">
              ←
            </button>
            <select
              className="yearList"
              name="year"
              id="year"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(Number(e.target.value));
              }}
            >
              {yearList.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <button type="button" className="next-btn">
              →
            </button>
          </div>
          <div className="months">
            <button type="button" className="prev-btn">
              ←
            </button>
            <select
              className="monthList"
              name="month"
              id="month"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(Number(e.target.value));
              }}
            >
              {monthList.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <button type="button" className="next-btn">
              →
            </button>
          </div>
          <div className="days">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
            {fillDayArray.map((fillDay) => {
              return <span key={fillDay}></span>;
            })}
            {dayList.map((day) => {
              return (
                <span
                  key={day}
                  className={day === selectedDate ? "selected" : ""}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DatePicker;

// 學習重點
// 1. 年份資料來源，可以用 today 當年年份為基準點，往前、後推
// 2. 元件生命週期
// 3. Array.from
// 4. getDaysOfMonth

// 疑惑觀念
// 1. useEffect 同樣依賴應該寫一起嗎？
//    useEffect 即便相同依賴，但關注點不同就應該分離，寫複數個
// 2. setState 批次更新、updater func、re-render
