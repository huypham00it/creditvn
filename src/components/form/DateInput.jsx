import React from 'react'
import { Form, DatePicker } from 'antd';
import locale from 'antd/lib/locale/vi_VN';

const DateInput = ({ required = true, name, required_message, initialValue, ...props }) => {

    return (
        <Form.Item
            name={name}
            rules={[
                {
                    required: required,
                    message: required_message
                },
            ]}
            initialValue={initialValue ? moment(initialValue, 'DD/MM/YYYYY') : null}
        >
            <DatePicker
                style={{ ...props.style, width: '100%' }}
                format="DD/MM/YYYY"
                locale={locale}
                {...props}
            />
        </Form.Item>
    )
}

export default DateInput