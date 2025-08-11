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

  const [dateValue, setDateValue] = useState(formatedDate(today));
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

  useEffect(() => {
    if (!dateList.includes(selectedDate)) {
      setSelectedDate(getLastDateOfMonth(selectedYear, selectedMonth));
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (!dateList.includes(selectedDate)) return;

    const newDate = formatedDate(
      new Date(selectedYear, selectedMonth - 1, selectedDate)
    );

    setDateValue(newDate);
  }, [selectedYear, selectedMonth, selectedDate]);

  return (
    <div className="date-picker">
      <input
        type="text"
        id="date"
        readOnly
        value={dateValue}
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
          <div className="dates">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
            {filledDayList.map((filledDay) => {
              return <span key={filledDay}></span>;
            })}
            {dateList.map((date) => {
              return (
                <span
                  key={date}
                  className={`date ${date === selectedDate ? "selected" : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
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
// 4. Js Date()
// 5. 點擊區塊時，避免 blur 關閉 > year month 按鈕 > grid 垂直間距 > 參數參考 > 優化

// 疑惑觀念
// 1. useEffect 同樣依賴應該寫一起嗎？
//    useEffect 即便相同依賴，但關注點不同就應該分離，寫複數個
// 2. setState 批次更新、updater func、re-render
