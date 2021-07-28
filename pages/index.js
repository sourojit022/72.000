import React, { useState } from 'react';
import BasicDetails from '../components/basic_details';
import EmploymentDetails from '../components/employment_details';
import { FormProvider, FormContext } from '../components/form_context';
import Stepper from 'react-stepper-horizontal';

const Form = () => {
  const [value] = React.useContext(FormContext);

  const [currentPage, setCurrentPage] = useState(1);
  const sections = [
    { title: 'Basic Details', onClick: () => setCurrentPage(1) },
    { title: 'Employment Details', onClick: () => setCurrentPage(2) },
    { title: 'Review', onClick: () => setCurrentPage(3) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };

  const next = () => setCurrentPage((prev) => prev + 1);
  const prev = () => setCurrentPage((prev) => prev - 1);

  return (
    <>
      <h1>Dynamic Form Fields in React</h1>
      <form onSubmit={handleSubmit}>
        <Stepper
          steps={sections}
          activeStep={currentPage}
          activeColor="red"
          defaultBarColor="red"
          completeColor="green"
          completeBarColor="green"
        />

        {currentPage === 1 && (
          <>
            <BasicDetails />
            <button onClick={next}>Next</button>
          </>
        )}

        {currentPage === 2 && (
          <>
            <EmploymentDetails />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prev}>Back</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}

        {currentPage === 3 && (
          <>
            <pre>{JSON.stringify(value, null, 2)}</pre>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={prev}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}
