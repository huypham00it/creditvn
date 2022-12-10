import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

import validText from '@/utils/validText';

const TextInput = ({name, required = true, pattern = "", required_message, error_message, initialValue = "", ...props }) => {

    return (
        <Form.Item
            name={name}
            rules={[
                {
                    required: required,
                    message: required_message,
                },
                () => ({
                    validator(_, value) {
                        if (!value || validText(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(error_message));
                    },
                }),
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

export default TextInput;

TextInput.propTypes = {
    name: PropTypes.string,
    required_message: PropTypes.string,
    error_message: PropTypes.string,
}
