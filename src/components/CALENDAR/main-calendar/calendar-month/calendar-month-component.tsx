import "./calendar-month-component.css";

import { useEffect, useState } from "react";
import { Day } from "../calendar-day/calendar-day-component";

export type MonthType = { month: string; id: string; nth: number; days: number };

export const Month = ({
    year,
    monthData,
    daysPlaceholdersCount,
    currentVisibleMonth,
}: {
    year: number;
    monthData: MonthType;
    daysPlaceholdersCount: number;
    currentVisibleMonth: {
        current: { year: number; month: number };
        next: { year: number; month: number };
    };
}): JSX.Element => {
    const { month, id, days, nth } = monthData;

    const [countDaysArray, SetCountDaysArray] = useState<any[]>([]);
    const [placeholderDaysBegining, SetPlaceholderDaysBegining] = useState<any[]>([]);
    // const [stringYearAndMonth, SetStringYearAndMonth] = useState<string>("");
    const [visible, SetVisible] = useState<boolean>(false);

    useEffect(() => {
        const addedArray = new Array(daysPlaceholdersCount + 1).fill("empty", 0, daysPlaceholdersCount + 1);
        SetPlaceholderDaysBegining(addedArray);

        //to show from day 1 to 28-31:
        const modDay = days + 1;
        const newArray = new Array(modDay).fill("day", 1, modDay);
        SetCountDaysArray(newArray);

        // const strYearAndMonth = `${year}${nth.toString().padStart(2, "0")}`;
        // console.log(strYearAndMonth);
        // SetStringYearAndMonth(strYearAndMonth);
    }, [monthData, daysPlaceholdersCount]);

    useEffect(() => {
        const currVisibleVal = year === currentVisibleMonth.current.year && nth === currentVisibleMonth.current.month;
        const nextVisibleVal = year === currentVisibleMonth.current.year && nth === currentVisibleMonth.next.month;
        SetVisible(currVisibleVal || nextVisibleVal);
    }, [currentVisibleMonth]);

    return (
        <div className={`month ${visible ? "visible" : ""}`}>
            <h3>{month}</h3>
            <div className="days-container">
                {placeholderDaysBegining &&
                    placeholderDaysBegining.map((value, index, arr) => index > 0 && <Day key={`${value}_${index}_p`} value={value} year={0} monthNo={0} dayNo={index} />)}

                {countDaysArray && countDaysArray.map((value, index, arr) => <Day key={`${value}_${index}_d`} value={value} year={year} monthNo={nth} dayNo={index} />)}
            </div>
        </div>
    );
};
