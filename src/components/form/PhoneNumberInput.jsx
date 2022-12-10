import React from 'react';
import { Form, Input } from 'antd';

import { phoneValid } from '@/utils/phone';

const PhoneNumberInput = ({ initialValue = "", required = true, ...props }) => {

    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: "Vui lòng nhập đúng số điện thoại!"
                },
                () => ({
                    validator(_, value) {
                        if (!value || phoneValid(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Vui lòng nhập đúng số điện thoại!'));
                    },
                }),
            ]}
            initialValue={initialValue}
        >
            <Input
                autoComplete='off'
                type='number'
                {...props}
            />
        </Form.Item>
    )
}

export default PhoneNumberInput