import { useState } from "react";

import "./datePicker.css";

const DatePicker = () => {
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

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
            2025
            <button type="button" className="next-btn">
              →
            </button>
          </div>
          <div className="months">
            <button type="button" className="prev-btn">
              ←
            </button>
            8
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
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DatePicker;
