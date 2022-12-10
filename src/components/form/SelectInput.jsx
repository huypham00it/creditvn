import React from 'react';
import { Form, Select } from 'antd';

const SelectInput = ({ initialValue = null, required = true, ...props }) => {

    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: props.required_message,
                },
            ]}
            initialValue={initialValue}
        >
            <Select
                {...props}
            />
        </Form.Item>
    )
}

export default SelectInput