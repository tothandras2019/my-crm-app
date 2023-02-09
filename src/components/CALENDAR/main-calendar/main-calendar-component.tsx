import './main-calendar-component.css';
import { useEffect, useState } from 'react';
import CALENDAR_DATA from './../../../DATASTORE/calendar/calendar_init.json';
import { Day } from './calendar-day/calendar-day-component';
import { Month, MonthType } from './calendar-month/calendar-month-component';
import { CustomButton } from '../../tools/button/submit/custom-button-component';

export const MainCalendarComponent = (): JSX.Element => {
  const [months, SetMonthes] = useState<MonthType[] | null>(null);
  const [weekdays, SetWeekdays] = useState<string[] | null>(null);
  const [currentYear, SetCurrentYear] = useState<number>(2023);

  const handle_IncreaseYear = () => {
    SetCurrentYear((state) => state + 1);
  };

  const handle_DecreiseYear = () => {
    SetCurrentYear((state) => state - 1);
  };

  useEffect(() => {
    const { months } = CALENDAR_DATA;
    SetMonthes(months);
    const actualYear = new Date(Date.now()).toLocaleDateString().slice(0, 4);
    SetCurrentYear(parseInt(actualYear));
  }, []);

  const calculateLeftDaysFromPrevoiusMonth = (month: MonthType, index: number, array: MonthType[]) => {
    const prevMonthDays = index <= 0 ? array[array.length - 1] : array[index - 1];
    const isBeforeDecember = month.nth - 1 === 0;

    const actualYear = isBeforeDecember ? currentYear - 1 : currentYear;
    const prevMonth = isBeforeDecember ? 12 : month.nth - 1;

    return new Date(`${actualYear}.${prevMonth}.${prevMonthDays.days}`).getDay();
  };

  return (
    <div className='calendar-container'>
      <h2>{currentYear}</h2>
      <div className='change-years-container'>
        <CustomButton handler={handle_DecreiseYear} value={'Last year'} color={'blue'} />
        <CustomButton handler={handle_IncreaseYear} value={'Next year'} color={'green'} />
      </div>

      <div className='calendar-month'>
        {months &&
          months.map((month, index, array) => {
            const leftDaysPrevMonth = calculateLeftDaysFromPrevoiusMonth(month, index, array);

            return <Month key={`${month.month}_${index}`} year={currentYear} monthData={month} daysPlaceholdersCount={leftDaysPrevMonth} />;
          })}
      </div>
    </div>
  );
};
