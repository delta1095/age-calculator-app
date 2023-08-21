import { useState } from "react";
import "./App.css";

const isLeapYear = (year: number) => {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  if (year % 4 === 0) {
    return true;
  }

  return false;
};

const initialValues = {
  years: null,
  months: null,
  days: null,
};

const DaysInMonth = (month: number, year: number) => {
  const all: Record<string, number> = {
    0: 31,
    1: isLeapYear(year) ? 29 : 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
  };

  return all[month];
};

function App() {
  const [birthday, setBirthday] = useState<{
    year: null | number;
    month: null | number;
    day: null | number;
  }>({
    year: null,
    month: null,
    day: null,
  });

  const [age, setAge] = useState<{
    years: null | number;
    months: null | number;
    days: null | number;
  }>(initialValues);

  const getDate = () => {
    const { year, month, day } = birthday;

    console.log({ year, month, day });

    if (
      !year ||
      !month ||
      !day ||
      typeof year != "number" ||
      typeof month != "number" ||
      typeof day != "number"
    ) {
      return;
    }

    if (new Date().getTime() < new Date(year, month, day).getTime()) {
      setAge({ ...initialValues });
      return;
    }

    const ageInMilliSeconds =
      new Date().getTime() - new Date(year, month, day).getTime();

    const years = Math.floor(ageInMilliSeconds / (1000 * 60 * 60 * 24 * 365));

    const current = new Date();

    // let lastBirthday =
    //   new Date(year, month, day).getTime() + years * 365 * 24 * 60 * 60 * 100;

    let iyy = current.getFullYear();

    if (new Date(current.getFullYear(), month, day) > new Date()) {
      iyy -= 1;
    }

    const lastBirthdayMonth = month;

    const daysSinceLastBirthday =
      (new Date().getTime() - new Date(iyy, month, day).getTime()) /
      (1000 * 60 * 60 * 24);

    let months = 0;
    let days = 0;

    let iM = lastBirthdayMonth;
    let iD = daysSinceLastBirthday;
    let iY = new Date(iyy, month, day).getFullYear();

    while (iD >= 1) {
      if (iD >= DaysInMonth(iM, iY)) {
        months += 1;

        iD = iD - DaysInMonth(iM, iY);
        iM += 1;

        if (iM === 12) {
          iM = 0;
          iY += 1;
        }
      } else {
        days = iD;
        iD -= iD;
      }
    }

    console.log({ years, months, days });

    setAge({ years, months, days: Math.floor(days) });
  };

  // const getDate = () => {

  //   const { year, month, day } = birthday;

  //   const current = new Date();

  //   if (!year || !month || !day) {
  //     return;
  //   }

  //   let years = current.getFullYear() - year;
  //   let months = current.getMonth() - month;

  //   if (months < 0) {
  //     years -= 1;
  //     months += 12;
  //   }

  //   let days = Math.floor(
  //     (current.getTime() -
  //       new Date(year + years, month + months, day).getTime()) /
  //       (1000 * 60 * 60 * 24)
  //   );

  //   if (days < 0) {
  //     months -= 1;

  //     if (months < 0) {
  //       years -= 1;
  //       months += 12;
  //     }

  //     days += new Date(year, month, 0).getDate();
  //   }

  //   setAge({ years, months, days });
  // };
  return (
    <div className="App">
      <div>
        <input
          max={new Intl.DateTimeFormat("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(Date.now())}
          type="date"
          onChange={(e) => {
            const date = new Date(e.target.value);

            setBirthday({
              year: +date.getFullYear(),
              month: +date.getMonth(),
              day: +date.getDate(),
            });
          }}
        />
      </div>
      <button className="get-button" onClick={getDate}>
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </button>
      <div>
        <div className="content">
          <div className="number">{age.years ?? "-"}</div> year(s)
        </div>

        <div className="content">
          <div className="number">{age.months ?? "-"}</div> month(s)
        </div>
        <div className="content">
          <div className="number">{age.days ?? "-"}</div> day(s)
        </div>
      </div>
    </div>
  );
}

export default App;
