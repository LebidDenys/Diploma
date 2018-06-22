import React from 'react';
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const FormItem = ({name, id, value, onChange}) => {
    return (
        <Form.Field>
            <label>{name}</label>
            <input placeholder={name} id={id} value={value} onChange={onChange} />
        </Form.Field>
    )
};

FormItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};

FormItem.defaultProps = {
    value: ''
}

export default FormItem;

