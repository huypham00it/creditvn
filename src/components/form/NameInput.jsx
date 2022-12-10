import React from 'react';
import { Form, Input } from 'antd';

import validName from '@/utils/validName';

const NameInput = ({ required = true, name, initialValue, ...props }) => {

    return (
        <Form.Item
            name={name}
            rules={[
                {
                    required: required,
                    message: "Vui lòng nhập đúng tên!"
                },
                () => ({
                    validator(_, value) {
                        if (!value || validName(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Vui lòng nhập đúng tên!'));
                    },
                }),
            ]}
            initialValue={initialValue ? initialValue : ""}
        >
            <Input
                autoComplete='off'
                maxLength={50}
                {...props}
            />
        </Form.Item>
    )
}

export default NameInput