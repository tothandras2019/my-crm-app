import "./main-calendar-component.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import CALENDAR_DATA from "./../../../DATASTORE/calendar/calendar_init.json";
import { Day } from "./calendar-day/calendar-day-component";
import { Month, MonthType } from "./calendar-month/calendar-month-component";
import { CustomButton } from "../../tools/button/submit/custom-button-component";
import { SearchInput } from "../../tools/search-input/search-input-component";

export const MainCalendarComponent = (): JSX.Element => {
    const [months, SetMonthes] = useState<MonthType[] | null>(null);
    const [searchedMonth, setSearchedMonth] = useState<MonthType | null>(null);
    const [weekdays, SetWeekdays] = useState<string[] | null>(null);
    const [currentYear, SetCurrentYear] = useState<number>(2023);

    const [monthState] /*no setter!*/ = useState<string[]>(["Prew month", "Next month"]);
    const [initialMonths, SetInitialMonths] = useState<{ current: string } | null>(null);

    const searchValue = useRef<HTMLInputElement | null>(null);

    const handle_IncreaseYear = () => {
        SetCurrentYear((state) => state + 1);
    };

    const handle_DecreiseYear = () => {
        SetCurrentYear((state) => state - 1);
    };

    const handle_ResetCurrentYear = () => {
        SetCurrentYear(2023);
    };

    useEffect(() => {
        const { months } = CALENDAR_DATA;
        SetMonthes(months);
        const actualDate = new Date(Date.now()).toLocaleDateString();
        const actualYear = actualDate.slice(0, 4);
        SetCurrentYear(parseInt(actualYear));
        const actualYearAndMonth = actualDate.slice(0, -4);
        const formatedActialYearAndMont = actualYearAndMonth
            .replaceAll(".", "")
            .replaceAll(" ", "");
        SetInitialMonths((state) => ({ ...state, current: formatedActialYearAndMont }));
        
    }, []);

    const calculateLeftDaysFromPrevoiusMonth = (
        month: MonthType,
        index: number,
        array: MonthType[]
    ) => {
        const prevMonthDays = index <= 0 ? array[array.length - 1] : array[index - 1];
        const isBeforeDecember = month.nth - 1 === 0;

        const actualYear = isBeforeDecember ? currentYear - 1 : currentYear;
        const prevMonth = isBeforeDecember ? 12 : month.nth - 1;

        return new Date(`${actualYear}.${prevMonth}.${prevMonthDays.days}`).getDay();
    };

    const showMonth = (event: FormEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement;
        const value = target.value;

        if (value === monthState[0]) {
            console.log(value);
        }
        if (value === monthState[1]) {
            console.log(value);
        }
    };
    const submit_Search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const current = searchValue.current;
        if (!current) return;

        const month = months?.find((monthObj) =>
            monthObj.month.toLowerCase().includes(current.value.toLowerCase())
        );

        if (month) setSearchedMonth(() => month);
    };

    const resetSearch = () => {
        const current = searchValue.current;
        if (!current) return;
        current.value = "";
    };

    useEffect(() => {
        //console.log(searchedMonth)
    }, [searchedMonth]);

    return (
        <div className="calendar-container">
            <h2>{currentYear}</h2>
            <div>
                <CustomButton
                    handler={handle_ResetCurrentYear}
                    value={"Reset year"}
                    color={"red"}
                />
            </div>

            <div className="change-years-container">
                <CustomButton handler={handle_DecreiseYear} value={"Last year"} color={"green"} />
                <CustomButton handler={handle_IncreaseYear} value={"Next year"} color={"green"} />
            </div>
            <div>
                <CustomButton handler={showMonth} value={monthState[0]} color={"pink"} />
                <CustomButton handler={showMonth} value={monthState[1]} color={"pink"} />
            </div>
            <div>
                <form onSubmit={submit_Search}>
                    <SearchInput searchedValueRef={searchValue} reset={resetSearch} />
                    <input type="submit" style={{ display: "none" }} />
                </form>
            </div>

            <div className="calendar-month">
                {months &&
                    months.map((month, index, monthsArr) => {
                        const leftDaysPrevMonth = calculateLeftDaysFromPrevoiusMonth(
                            month,
                            index,
                            monthsArr
                        );

                        return (
                            <Month
                                key={`${month.month}_${index}`}
                                year={currentYear}
                                monthData={month}
                                daysPlaceholdersCount={leftDaysPrevMonth}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
