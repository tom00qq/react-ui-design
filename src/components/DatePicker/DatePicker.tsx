import { useDatePicker } from "../../hooks/useDatePicker";
import { forwardRef } from "react";
import "./datePicker.css";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  defaultValue?: Date;
  format?: (date: Date) => string;
  minDate?: Date;
  maxDate?: Date;
}

export interface DatePickerRef {
  getValue: () => Date;
}

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  ({ value, onChange, defaultValue, format, minDate, maxDate }, ref) => {
    const {
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
    } = useDatePicker(value, onChange, defaultValue, ref);

    return (
      <div className="date-picker">
        <input
          type="text"
          id="date"
          readOnly
          value={handlers.formatedDate(dateValue)}
          onFocus={handlers.show}
          onBlur={handlers.handleOnBlur}
        />
        {show ? (
          <div
            className="date-modal"
            ref={dateModalRef}
            tabIndex={-1}
            onBlur={handlers.handleOnBlur}
          >
            <div className="years">
              <button
                type="button"
                className="prev-btn"
                onClick={handlers.prevYear}
              >
                ←
              </button>
              <select
                className="yearList"
                name="year"
                id="year"
                value={selectedYear}
                onChange={(e) => {
                  handlers.setSelectedYear(Number(e.target.value));
                }}
              >
                {yearList.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="next-btn"
                onClick={handlers.nextYear}
              >
                →
              </button>
            </div>
            <div className="months">
              <button
                type="button"
                className="prev-btn"
                onClick={handlers.prevMonth}
              >
                ←
              </button>
              <select
                className="monthList"
                name="month"
                id="month"
                value={selectedMonth}
                onChange={(e) => {
                  handlers.setSelectedMonth(Number(e.target.value));
                }}
              >
                {monthList.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="next-btn"
                onClick={handlers.nextMonth}
              >
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
                    className={`date ${
                      date === selectedDate ? "selected" : ""
                    }`}
                    onClick={() => handlers.setSelectedDate(date)}
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
  }
);

export default DatePicker;

// 學習重點
// 1. 年份資料來源，可以用 today 當年年份為基準點，往前、後推
// 2. 元件生命週期
// 3. Array.from
// 4. Js Date()
// 5. tabIndex 讓 <div>、<span> 可以 focus
// 6. e.relatedTarget 指出即將被 focus 的元素
// 7. 參數參考 > 優化
// - Hooks / Container-Presentation
// - API props：UnControlled / Controlled Component
// - Date type / story description / param check and warn / uncotrolled 取值
// - ref 機制 / format / min / max / render props 自訂樣式

// 疑惑觀念
// 1. useEffect 同樣依賴應該寫一起嗎？
//    useEffect 即便相同依賴，但關注點不同就應該分離，寫複數個
// 2. setState 批次更新、updater func、re-render

// https://www.patterns.dev/react/presentational-container-pattern/
