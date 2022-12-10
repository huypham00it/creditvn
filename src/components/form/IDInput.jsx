import React from 'react'
import { Form, Input } from 'antd';

import { validID } from '@/utils/validId';


const IDInput = ({ initialValue = "", required = true, ...props }) => {

    return (
        <Form.Item
            name={props.name}
            rules={[
                {
                    required: required,
                    message: "Vui lòng nhập CMND/CCCD"
                },
                () => ({
                    validator(_, value) {
                        if (!value || validID(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Số CMND/CCCD phải bao gồm 9 hoặc 12 số'));
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

export default IDInput