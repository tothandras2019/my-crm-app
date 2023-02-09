import { FormEvent, Fragment, useContext } from 'react';
import { AvailabilityContext } from '../../../utility/contexts/contacts-data/contacts-data-context';
import { MainContext } from '../../../utility/contexts/main.context';
import { FormFrame } from '../../forms/FORM-frame/form-frame-component';
import { CustomButton } from '../../tools/button/submit/custom-button-component';

export const Schedule = ({}): JSX.Element => {
  const { openModifyModal, setOpenModifyModal } = useContext(AvailabilityContext);

  const { customers } = useContext(MainContext);
  const { customerState } = customers;
  const { scheduleDay } = openModifyModal;
  const { year, month, day } = scheduleDay;

  const handle_Submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handle_Cancel = () => {
    setOpenModifyModal((state) => ({
      ...state,
      isScheduleOpen: false,
      scheduleDays: {
        year: '',
        month: '',
        day: '',
      },
    }));
  };

  return (
    <FormFrame onSubmitHandler={handle_Submit}>
      {
        <Fragment>
          <h1>Meeting planner</h1>
          <h3>schedule for: {`${year}.${month}.${day}`}</h3>

          <select>
            {customerState.map((customer) => {
              const { id, companyName, access } = customer;
              return (
                <option key={`${companyName}_${id}`} value={companyName}>
                  {companyName}
                </option>
              );
            })}
          </select>

          <div className='button-container'>
            <CustomButton value={'submit'} />
            <CustomButton type={'button'} value={'close'} handler={handle_Cancel} />
          </div>
        </Fragment>
      }
    </FormFrame>
  );
};
