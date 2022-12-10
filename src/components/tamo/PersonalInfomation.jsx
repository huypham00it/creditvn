import React from 'react';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { Form, ConfigProvider, Grid, Row, Col, Button, DatePicker, Tooltip } from 'antd';
import moment from 'moment';

import { NameInput, IDInput, BaseInput, PhoneNumberInput, GenderInput, EmailInput, PasswordInput } from '@/components/form';
import tamoStyle from '@/assets/Tamo.module.css';
import { validID } from '@/utils/validId';
import validName from '@/utils/validName';
import { phoneValid } from '@/utils/phone';
import validEmail from '@/utils/validEmail';

const { useBreakpoint } = Grid;

const PersonalInfomation = ({ next, prev, user, setUser }) => {
    const [form] = Form.useForm();
    const screen = useBreakpoint();

    const handleSubmit = () => {
        const data = {
            ...form.getFieldsValue(),
            dob: form.getFieldValue('dob').format('DD-MM-YYYY'),
            full_name: form.getFieldValue('full_name').trim(),
        };
        next(data);
    }

    return (
        <div
            style={{
                maxWidth: '343px',
                width: '100%',
                margin: '0 auto'
            }}
        >

            <ConfigProvider locale={locale}>
                <Form
                    form={form}
                    name="personal_info_form"
                    onSubmitCapture={handleSubmit}
                >
                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin cá nhân</h5>

                    <NameInput
                        name="full_name"
                        placeholder="Họ và tên"
                        size={screen.md ? "large" : "medium"}
                        initialValue={user.full_name}
                        onChange={(e) => {
                            if (validName(e.target.value)) {
                                setUser({ ...user, full_name: e.target.value })
                            }
                        }}
                    />
                    <Tooltip placement="topLeft" title="Vui lòng cung cấp đúng số cmnd/số cccd mà quý khách đang có để nâng cao tỷ lệ duyệt">
                        <div>
                            <IDInput
                                name="identity_number"
                                placeholder="Số CMND/CCCD"
                                size={screen.md ? "large" : "medium"}
                                initialValue={user.identity_number}
                                onChange={(e) => {
                                    if (validID(e.target.value)) {
                                        setUser({ ...user, identity_number: e.target.value })
                                    }
                                }}
                            />
                        </div>
                    </Tooltip>

                    <Form.Item
                        name="dob"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa chọn ngày sinh"
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

                    <GenderInput
                        name="gender"
                        size={screen.md ? "large" : "medium"}
                        initialValue={user.gender}
                        onChange={(e) => {
                            setUser({ ...user, gender: e.target.value })
                        }}
                    />

                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Tài khoản</h5>

                    <EmailInput
                        size={screen.md ? "large" : "medium"}
                        name="email"
                        placeholder="Email"
                        initialValue={user.email}
                        onChange={(e) => {
                            if (validEmail(e.target.value)) {
                                setUser({ ...user, email: e.target.value })
                            }
                        }}
                    />

                    <PasswordInput
                        name="password"
                        pattern={"[a-zA-Z\\d\\W]{4,}"}
                        placeholder="Tạo mật khẩu"
                        size={screen.md ? "large" : "medium"}
                        min={4}
                        initialValue={user.password}
                        onChange={(e) => {
                            if (/[a-zA-Z\d\W]{4,}/.test(e.target.value)) {
                                setUser({ ...user, password: e.target.value })
                            }
                        }}
                    />

                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Xác minh số điện thoại</h5>

                    <PhoneNumberInput
                        name="phone_number"
                        placeholder="Số điện thoại"
                        size={screen.md ? "large" : "medium"}
                        initialValue={user.phone_number}
                        onChange={(e) => {
                            if (phoneValid(e.target.value)) {
                                setUser({ ...user, phone_number: e.target.value })
                            }
                        }}
                    />

                    <Row gutter={16}>
                        <Col span={13}>
                            <BaseInput
                                type="number"
                                size={screen.md ? "large" : "medium"}
                                placeholder="Nhập mã"
                            />
                        </Col>
                        <Col span={11}>
                            <Button
                                size={screen.md ? "large" : "medium"}
                                style={{
                                    backgroundColor: "#00B3B2",
                                    color: "#ffffff",
                                    width: '100%',
                                    fontSize: screen.md ? 14 : 12
                                }}

                                className={tamoStyle.button}
                            >
                                Gửi mã xác minh
                            </Button>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Button
                                size={screen.md ? "large" : "medium"}
                                style={{
                                    backgroundColor: '#E0E0E0',
                                    width: '100%'
                                }}
                                className={tamoStyle.button}
                                onClick={prev}
                            >
                                Quay lại
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Form.Item shouldUpdate>
                                {() => {
                                    return (
                                        <Button
                                            size={screen.md ? "large" : "medium"}
                                            htmlType='submit'
                                            style={{ width: '100%', backgroundColor: '#FFCF10', fontWeight: 'bold' }}
                                            disabled={
                                                !(
                                                    form.getFieldValue("full_name") &&
                                                    form.getFieldValue("identity_number") &&
                                                    form.getFieldValue("dob") &&
                                                    form.getFieldValue("gender") &&
                                                    form.getFieldValue("email") &&
                                                    form.getFieldValue("password") &&
                                                    form.getFieldValue("phone_number")
                                                ) ||
                                                form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                            className={tamoStyle.button}
                                        >
                                            Tiếp tục
                                        </Button>
                                    )
                                }}
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </ConfigProvider>
        </div>
    )
}

export default PersonalInfomation