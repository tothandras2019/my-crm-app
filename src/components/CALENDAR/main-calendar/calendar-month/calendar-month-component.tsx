import "./calendar-month-component.css";

import { useEffect, useState } from "react";
import { Day } from "../calendar-day/calendar-day-component";
import CALENDAR_DATA from "./../../../../DATASTORE/calendar/calendar_init.json";

export type MonthType = { month: string; id: string; nth: number; days: number };

export const Month = ({
  year,
  monthData,
  daysPlaceholdersCount,
}: {
  year: number;
  monthData: MonthType;
  daysPlaceholdersCount: number;
}): JSX.Element => {
  const { month, id, days, nth } = monthData;

  const [countDaysArray, SetCountDaysArray] = useState<any[]>([]);
  const [placeholderDaysBegining, SetPlaceholderDaysBegining] = useState<any[]>([]);

  useEffect(() => {
    const addedArray = new Array(daysPlaceholdersCount + 1).fill(
      "empty",
      0,
      daysPlaceholdersCount + 1
    );
    SetPlaceholderDaysBegining(addedArray);

    //to show from day 1 to 28-31:
    const modDay = days + 1;
    const newArray = new Array(modDay).fill("day", 1, modDay);
    SetCountDaysArray(newArray);
  }, [monthData, daysPlaceholdersCount]);

  return (
    <div className="month">
      <h3>{month}</h3>
      <div className="days-container">
        {placeholderDaysBegining &&
          placeholderDaysBegining.map(
            (value, index, arr) =>
              index > 0 && (
                <Day key={`${value}_${index}_p`} value={value} year={0} monthNo={0} dayNo={index} />
              )
          )}

        {countDaysArray &&
          countDaysArray.map((value, index, arr) => (
            <Day
              key={`${value}_${index}_d`}
              value={value}
              year={year}
              monthNo={nth}
              dayNo={index}
            />
          ))}
      </div>
    </div>
  );
};
