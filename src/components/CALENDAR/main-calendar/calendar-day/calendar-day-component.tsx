import { useContext, useEffect, useState } from 'react';
import './calendar-day-component.css';
import CALENDAR_DATA from './../../../../DATASTORE/calendar/calendar_init.json';
import { AvailabilityContext } from '../../../../utility/contexts/contacts-data/contacts-data-context';

type DayType = { value: string; year: number; monthNo: number; dayNo: number };

export const Day = ({ value, year, monthNo, dayNo }: DayType) => {
  const { setOpenModifyModal } = useContext(AvailabilityContext);

  const [dayName, SetDayName] = useState<string>('');
  const { weekdays } = CALENDAR_DATA;

  useEffect(() => {
    const dayNumber = new Date(`${year}.${monthNo}.${dayNo}`).getDay();
    SetDayName(weekdays[dayNumber]);
  });

  const handle_OpenScheduleForm = () => {
    setOpenModifyModal((state) => ({
      ...state,
      isScheduleOpen: true,
      scheduleDay: {
        year: year.toString(),
        month: monthNo.toString().padStart(2, '0'),
        day: dayNo.toString().padStart(2, '0'),
      },
    }));
  };
  return (
    <>
      {value === 'empty' ? (
        <div className={value}>
          <p>{}</p>
          <p>{}</p>
        </div>
      ) : (
        <div className={value} onClick={handle_OpenScheduleForm}>
          <p>{dayName}</p>
          <p>{dayNo}</p>
        </div>
      )}
    </>
  );
};
