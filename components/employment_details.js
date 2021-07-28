import React, { Fragment, useState } from 'react';
import { FormContext } from './form_context';
import { isLettersOnly } from './utils';
import MonthPicker from './monthpicker';
import Text from '../components/accordion/text';
import Heading from '../components/accordion/heading';
import getAccordion from '../components/accordion/GetAccordion';
import EditorContainer from './text_editor';

const Accordion = getAccordion(1);

const EmploymentDetails = () => {
  const [value, setValue] = React.useContext(FormContext);
  const { companyDetails } = value;

  const [expanded, setExpanded] = useState(null);

  React.useEffect(() => {
    setExpanded(0);
  }, []);

  function onClick(id) {
    setExpanded(id === expanded ? null : id);
  }

  return (
    <>
      <div className="form-row">
        {companyDetails.map((inputField, index) => (
          <NormalAccordionItem
            index={index}
            inputField={inputField}
            expanded={index === expanded}
            onClick={() => onClick(index)}
          />
        ))}
        <pre>{JSON.stringify(companyDetails, null, 2)}</pre>
      </div>
    </>
  );
};

export default EmploymentDetails;

const NormalAccordionItem = ({ index, inputField, expanded, onClick }) => {
  const [value, setValue] = React.useContext(FormContext);
  const { companyDetails } = value;

  const handleAddFields = () => {
    setValue((prev) => {
      const companyDetails = [
        ...prev.companyDetails,
        { companyName: '', designation: '' },
      ];

      return { ...prev, companyDetails };
    });
  };

  const handleRemoveFields = (index) => {
    setValue((prev) => {
      const companyDetails = prev.companyDetails.filter((v, i) => i !== index);
      return { ...prev, companyDetails };
    });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    if (name === 'designation' && !isLettersOnly(value)) {
      return;
    }

    setValue((prev) => {
      const companyDetails = prev.companyDetails.map((v, i) => {
        if (i !== index) {
          return v;
        }

        return { ...v, [name]: value };
      });

      return { ...prev, companyDetails };
    });
  };

  return (
    <Accordion>
      <Heading>
        <div
          style={{ padding: '10px', cursor: 'pointer' }}
          className="heading"
          onClick={onClick}
        >
          {expanded ? (
            <button type="button"> Shrink </button>
          ) : (
            <button type="button"> Expand </button>
          )}
        </div>
      </Heading>
      <Text>
        <div style={{ display: expanded ? 'block' : 'none' }}>
          <Fragment>
            <div className="form-group col-sm-6">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                name="companyName"
                value={inputField.companyName}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                className="form-control"
                id="designation"
                name="designation"
                value={inputField.designation}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <MonthPicker
              label="Start Date"
              name="startDate"
              onChange={(event) => handleInputChange(index, event)}
            />
            <br />
            Description:
            <EditorContainer
              name="description"
              onChange={(event) => handleInputChange(index, event)}
            />
            <div className="form-group col-sm-2">
              <button
                className="btn btn-link"
                type="button"
                onClick={() => handleRemoveFields(index)}
              >
                -
              </button>
              <button
                className="btn btn-link"
                type="button"
                onClick={() => handleAddFields()}
              >
                +
              </button>
            </div>
          </Fragment>
        </div>
      </Text>
    </Accordion>
  );
};
