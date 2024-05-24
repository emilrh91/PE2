import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { Form } from "react-bootstrap";

export function BookingDatePicker({ onDateChange, fromDate, toDate }) {
  return (
    <div>
      <Form.Group>
        <DatePicker
          selected={fromDate}
          onChange={date => onDateChange('fromDate', date)}
          minDate={new Date()}
          placeholderText="Select a start date"
          className="form-control"
          customInput={<Form.Control />}
        />
      </Form.Group>
      <Form.Group>
        <DatePicker
          selected={toDate}
          onChange={date => onDateChange('toDate', date)}
          minDate={fromDate || new Date()} 
          placeholderText="Select an end date"
          disabled={!fromDate}
          className="form-control"
          customInput={<Form.Control />}
        />
      </Form.Group>
    </div>
  );
}

BookingDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
};
