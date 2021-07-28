import React, { useState } from 'react';
import { getInitialValue } from './monthpicker';

export const FormContext = React.createContext();

export function FormProvider({ children }) {
  const [formValue, setFormValue] = useState({
    basicDetails: {
      firstName: '',
      lastName: '',
      profileSummary: '',
    },
    companyDetails: [
      {
        companyName: '',
        designation: '',
        startDate: getInitialValue(),
        description: '',
      },
    ],
  });

  return (
    <FormContext.Provider value={[formValue, setFormValue]}>
      {children}
    </FormContext.Provider>
  );
}
