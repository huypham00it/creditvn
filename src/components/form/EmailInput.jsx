import React from 'react'
import { Form, Input } from 'antd';

const EmailInput = ({ initialValue = "", required = true, ...props }) => {

    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: "Vui lòng nhập email"
                },
                {
                    type: 'email',
                    message: "Vui lòng nhập đúng email"
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

export default EmailInput