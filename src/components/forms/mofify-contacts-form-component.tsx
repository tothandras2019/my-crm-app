import { FormEvent, Fragment, useContext, useEffect } from 'react';
import { AddressType, AccessType, SocialType } from '../../DATASTORE/data-types/main.data.types/customer-data-types';
import { AvailabilityContext } from '../../utility/contexts/contacts-data/contacts-data-context';
import { Input } from '../tools/input/input-component';
import { CustomButton } from '../tools/button/submit/custom-button-component';
import { AccessFormInputs } from './access-form-inputs/access-form-inputs';
import { AddressFormInputs } from './address-form-inputs/address-form-inputs';
import { SocialFormInputs } from './social-form-inputs/social-form-inputs';
import { FormFrame } from './FORM-frame/form-frame-component';

type Modify_Contacts_Form_Type = {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
};
export const Modify_Contacts_Form = ({ submitHandler, handleCancel }: Partial<Modify_Contacts_Form_Type>): JSX.Element => {
  const { openModifyModal } = useContext(AvailabilityContext);
  const { access: accessData, address: addressData, social: socialData } = openModifyModal;

  useEffect(() => {
    console.log(openModifyModal);
  }, [openModifyModal]);
  return (
    <FormFrame onSubmitHandler={submitHandler}>
      {
        <Fragment>
          <div>
            {addressData.isAddNew ? <AddressFormInputs /> : addressData.data && <AddressFormInputs addressData={addressData.data} />}
            {socialData.isAddNew ? <SocialFormInputs /> : socialData.data && <SocialFormInputs socialData={socialData.data} />}
            {accessData.isAddNew ? <AccessFormInputs /> : accessData.data && <AccessFormInputs accessData={accessData.data} />}
          </div>

          <div className='button-container'>
            <CustomButton value={'submit'} />
            <CustomButton type={'button'} value={'cancel'} handler={handleCancel} />
          </div>
        </Fragment>
      }
    </FormFrame>
  );
};

// <form className='modify-form' onSubmit={submitHandler}>
// </form>
