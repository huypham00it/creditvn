import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const BaseInput = ({name, required = true, pattern = "", required_message, initialValue = "", ...props }) => {

    return (
        <Form.Item
            name={name}
            rules={[
                {
                    required: required,
                    message: required_message,
                    pattern: pattern
                }
            ]}
            initialValue={initialValue}
        >
            <Input
                autoComplete='off'
                {...props}
            />
        </Form.Item>
    )
}

export default BaseInput;

BaseInput.propTypes = {
    name: PropTypes.string,
    required_message: PropTypes.string
}
