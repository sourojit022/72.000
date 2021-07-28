import React from 'react';
import { FormContext } from './form_context';
import { isLettersOnly } from './utils';
import EditorContainer from './text_editor';

const BasicDetails = () => {
  const [value, setValue] = React.useContext(FormContext);
  const { basicDetails } = value;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name !== 'profileSummary' && !isLettersOnly(value)) {
      return;
    }

    setValue((prev) => {
      const basicDetails = { ...prev.basicDetails, [name]: value };
      return { ...prev, basicDetails };
    });
  };

  return (
    <>
      <div className="form-group col-sm-6">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={basicDetails.firstName}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className="form-group col-sm-4">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={basicDetails.lastName}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className="">
        <label>Profile Summary</label>
        <EditorContainer
          name="profileSummary"
          onChange={(event) => handleInputChange(event)}
        />
      </div>
    </>
  );
};

export default BasicDetails;
