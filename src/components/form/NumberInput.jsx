import React from 'react';
import { Form, InputNumber } from 'antd';

const NumberInput = ({ required = true, ...props }) => {

    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: props.required_message
                }
            ]}
            initialValue={props.initialValue ? props.initialValue : ""}
        >
            <InputNumber
                autoComplete='off'
                style={{width: '100%'}}
                {...props}
            />
        </Form.Item>
    )
}

export default NumberInput