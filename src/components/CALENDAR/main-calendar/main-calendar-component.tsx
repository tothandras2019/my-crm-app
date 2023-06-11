import "./main-calendar-component.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import CALENDAR_DATA from "./../../../DATASTORE/calendar/calendar_init.json";
import { Month, MonthType } from "./calendar-month/calendar-month-component";
import { CustomButton } from "../../tools/button/submit/custom-button-component";
import { SearchInput } from "../../tools/search-input/search-input-component";

export const MainCalendarComponent = (): JSX.Element => {
    const [months, SetMonthes] = useState<MonthType[] | null>(null);
    const [searchedMonth, setSearchedMonth] = useState<MonthType | null>(null);
    const [weekdays, SetWeekdays] = useState<string[] | null>(null);
    // const [currentYear, SetCurrentYear] = useState<number>(2023);

    const [monthState] /*no setter!*/ = useState<string[]>(["Prew month", "Next month"]);

    //TODO: the following to have to be merged someway!
    const [visibleMonthes, SetVisibleMonthes] = useState<MonthType[] | null>(null);
    const [initialDate, SetInitialDate] = useState<{ current: { year: number; month: number }; next: { year: number; month: number } }>({
        current: { year: 0, month: 0 },
        next: { year: 0, month: 0 },
    });

    const searchValue = useRef<HTMLInputElement | null>(null);

    const handle_IncreaseYear = () => {
        SetInitialDate((state) => ({
            ...state,
            current: { ...state.current, year: state.current.year + 1 },
            next: { ...state.next, year: state.next.year + 1 },
        }));
    };

    const handle_DecreiseYear = () => {
        SetInitialDate((state) => ({
            ...state,
            current: { ...state.current, year: state.current.year - 1 },
            next: { ...state.next, year: state.next.year - 1 },
        }));
    };

    const handle_ResetCurrentYear = () => {
        const { year, month } = getActualYearAndMonth();
        SetInitialDate((state) => ({
            ...state,
            current: { ...state.current, year: year, month: month },
            next: { ...state.next, year: year, month: month + 1 },
        }));
    };

    useEffect(() => {
        const { months } = CALENDAR_DATA;
        SetMonthes(months);

        const { year, month } = getActualYearAndMonth();
        const current = { year: year, month: month };
        const next = { year: year, month: month + 1 };

        SetInitialDate((state) => ({ ...state, current: current, next: next }));
    }, []);

    const calculateLeftDaysFromPrevoiusMonth = (month: MonthType, index: number, array: MonthType[]) => {
        const prevMonthDays = index <= 0 ? array[array.length - 1] : array[index - 1];
        const isBeforeDecember = month.nth - 1 === 0;

        const currYear = initialDate.current.year;

        const actualYear = isBeforeDecember ? currYear - 1 : currYear;
        const prevMonth = isBeforeDecember ? 12 : month.nth - 1;

        return new Date(`${actualYear}.${prevMonth}.${prevMonthDays.days}`).getDay();
    };

    const getActualYearAndMonth = () => {
        const acYear = new Date(Date.now()).getFullYear();
        const acMonth = new Date(Date.now()).getMonth() + 1;
        return { year: acYear, month: acMonth };
    };

    /**2 Visible month is fundamental. This FO set the actual visible monthes */
    const showMonth = (event: FormEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement;
        const value = target.value;

        const [prew, next] = monthState;

        switch (value) {
            //set prew monthes
            case prew: {
                let decrease_CurrentMonth = initialDate.current.month - 1;
                let decrease_NextMonth = initialDate.next.month - 1;
                let decYear = initialDate.current.year;

                if (decrease_CurrentMonth <= 0) {
                    decrease_CurrentMonth = 12;
                    decYear = initialDate.current.year - 1;
                }
                console.log(decrease_CurrentMonth);

                //FIXME: the monthes in a wrong order!!!

                SetInitialDate((state) => ({
                    ...state,
                    current: { year: decYear, month: decrease_CurrentMonth },
                    next: { year: state.next.year, month: decrease_NextMonth },
                }));
                break;
            }

            //set next monthes
            case next: {
                if (value === monthState[1]) {
                    let increase_CurrentMonth = initialDate.current.month + 1;
                    let increase_NextMonth = initialDate.next.month + 1;

                    // increase_CurrentMonth = increase_CurrentMonth >= 12 ? 1 : increase_CurrentMonth;
                    // console.log(increase_CurrentMonth);
                
                    SetInitialDate((state) => ({
                        ...state,
                        current: { year: state.current.year, month: increase_CurrentMonth },
                        next: { year: state.next.year, month: increase_NextMonth },
                    }));
                }
                break;
            }

            default:
                break;
        }
    };
    const submit_Search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const current = searchValue.current;
        if (!current) return;

        const month = months?.find((monthObj) => monthObj.month.toLowerCase().includes(current.value.toLowerCase()));

        if (month) setSearchedMonth(() => month);
    };

    const resetSearch = () => {
        const current = searchValue.current;
        if (!current) return;
        current.value = "";
    };

    return (
        <div className="calendar-container">
            <h2>{initialDate.current.year}</h2>
            <div>
                <CustomButton handler={handle_ResetCurrentYear} value={"Reset year"} color={"red"} />
            </div>
            <div className="change-years-container">
                <CustomButton handler={handle_DecreiseYear} value={"Last year"} color={"green"} />
                <CustomButton handler={handle_IncreaseYear} value={"Next year"} color={"green"} />
            </div>
            <div>
                <CustomButton handler={showMonth} value={monthState[0]} color={"pink"} /> {/* month setter */}
                <CustomButton handler={showMonth} value={monthState[1]} color={"pink"} />
            </div>
            <div>
                <form onSubmit={submit_Search}>
                    <SearchInput searchedValueRef={searchValue} reset={resetSearch} placeholder="search meeting" />
                    <input type="submit" style={{ display: "none" }} />
                </form>
            </div>

            <div className="calendar-month">
                {months &&
                    months.map((month, index, monthsArr) => {
                        const leftDaysFromPrevMonth = calculateLeftDaysFromPrevoiusMonth(month, index, monthsArr);

                        return (
                            <Month
                                key={`${month.month}_${index}`}
                                year={initialDate.current.year}
                                monthData={month}
                                currentVisibleMonth={initialDate}
                                daysPlaceholdersCount={leftDaysFromPrevMonth}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
