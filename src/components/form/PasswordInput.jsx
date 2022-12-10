import React from 'react'
import { Form, Input } from 'antd';

const PasswordInput = ({initialValue = "", required = true, ...props }) => {

    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: "Vui lòng nhập mật khẩu"
                },
                {
                    min: props.min,
                    pattern: props.pattern,
                    message: `Mật khẩu tối thiểu ${props.min} ký tự`
                }
            ]}
            initialValue={initialValue}
        >
            <Input.Password
                autoComplete='off'
                {...props}
            />
        </Form.Item>
    )
}

export default PasswordInput