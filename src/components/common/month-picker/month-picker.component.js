import React from 'react'
import PropTypes from 'prop-types'
import { years, months } from '../constants/dates';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './styles.css'

const MonthPicker = ({ activeMonth, activeYear, onMonthChange, onYearChange }) => {
    return (
        <div className="dropdowns-wrapper">
            <Dropdown
                className="dropdown"
                placeholder='Select Year'
                fluid selection
                options={years}
                value={activeYear}
                onChange={onYearChange}
            />
            <Dropdown
                className="dropdown"
                placeholder='Select Month'
                fluid
                selection
                options={months}
                value={activeMonth}
                onChange={onMonthChange}
            />
        </div>
    )
};

MonthPicker.propTypes = {
    activeMonth: PropTypes.string,
    activeYear: PropTypes.number,
    onMonthChange: PropTypes.func.isRequired,
    onYearChange: PropTypes.func.isRequired,
};

MonthPicker.defaultProps = {
    activeMonth: '',
    activeYear: 2018
}

export default MonthPicker;
