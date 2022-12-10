import React from 'react'
import { Form, DatePicker } from 'antd';
import locale from 'antd/lib/locale/vi_VN';

const DateInput = ({ required = true, ...props }) => {

    return (
        <Form.Item
            name="dob"
            rules={[
                {
                    required: true,
                    message: "Vui lòng chọn ngày sinh"
                },
                () => ({
                    validator(_, value) {
                        const currentYear = new Date().getFullYear();
                        if (!value || (currentYear - moment(value).year() >= 20 && currentYear - moment(value).year() <= 60)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Độ tuổi của bạn chưa phù hợp để đăng ký vay với Tamo'));
                    },
                }),
            ]}
            initialValue={user?.dob ? moment(user.dob, 'DD/MM/YYYYY') : null}
        >
            <DatePicker
                format="DD/MM/YYYY"
                locale={locale}
                style={{ width: '100%' }}
                placeholder="Ngày sinh"
                size={screen.md ? "large" : "medium"}
                onChange={(value) => {
                    const currentYear = new Date().getFullYear();
                    if (currentYear - moment(value).year() >= 20 && currentYear - moment(value).year() <= 60) {
                        setUser({ ...user, dob: moment(value).format("DD/MM/YYYY") })
                    }
                }}
            />
        </Form.Item>
    )
}

export default DateInput