import { FormEvent } from 'react';

type FormFrameType = { onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void; children: JSX.Element };
export const FormFrame = ({ onSubmitHandler, children }: Partial<FormFrameType>) => {
  const handler = (event: FormEvent<HTMLFormElement>) => onSubmitHandler && onSubmitHandler(event);

  return (
    <form className='modify-form' onSubmit={handler}>
      {children}
    </form>
  );
};
