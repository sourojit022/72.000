import React, { useState, useEffect } from 'react';
import './styles.css';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const _getInitialValue = () => {
  const month = `0${new Date().getMonth() + 1}`.slice(-2);
  const year = new Date().getFullYear();
  return { month, year };
};

export const getInitialValue = () => {
  const { month, year } = _getInitialValue();
  return `${month}/${year}`;
};

const MonthPicker = ({ label, onChange, name }) => {
  const [shown, setShown] = useState(false);
  const [value, setValue] = useState({ ..._getInitialValue() });

  useEffect(() => {
    const { month, year } = value;
    const fakeEvent = {
      target: {
        name,
        value: `${month}/${year}`,
      },
    };

    onChange(fakeEvent);
  }, [value]);

  const showPicker = () => {
    setShown(true);
  };

  const hidePicker = () => {
    setShown(false);
  };

  const incYear = () => {
    setValue((prev) => ({ ...prev, year: prev.year + 1 }));
  };

  const decYear = () => {
    setValue((prev) => ({ ...prev, year: prev.year - 1 }));
  };

  const monthClick = (month) => {
    const monthIndex = months.findIndex((m) => m === month);
    const newMonth = `0${monthIndex + 1}`.slice(-2);

    setValue((prev) => ({ ...prev, month: newMonth }));
    hidePicker();
  };

  const inputChange = () => {};

  const { month, year } = value;

  return (
    <>
      <div
        className="w-full md:w-2/5 px-3 mb-6 md:mb-0"
        style={{ display: 'inline-block' }}
      >
        <label
          className="block mb-1 text-sm font-light tracking-wide text-gray-700"
          htmlFor="qualification"
        >
          {label}
        </label>
        <input
          id="input"
          className="appearance-none block w-full bg-teal-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          name={name}
          onFocus={showPicker}
          value={`${month}/${year}`}
          onChange={inputChange}
        />
        {shown && (
          <div className="month-menu-dropdown">
            <header>
              <div className="top-arrow" />
              <button onClick={decYear}>&lt;</button>
              <div className="year-holder">{year}</div>
              <button onClick={incYear}>&gt;</button>
            </header>
            {months.map((month) => (
              <button key={month} onClick={() => monthClick(month)}>
                {month}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MonthPicker;
