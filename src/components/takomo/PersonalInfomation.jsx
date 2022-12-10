import React, { useEffect, useState } from 'react';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { Form, ConfigProvider, Grid, Button, DatePicker, Input } from 'antd';
import moment from 'moment';
import { EditOutlined, CaretDownOutlined, InfoCircleFilled } from '@ant-design/icons';

import { NameInput, IDInput, LocationInput, PhoneNumberInput, GenderInput, SelectInput, EmailInput, PasswordInput } from '@/components/form';
import takomoStyle from '@/assets/Takomo.module.css';

const { useBreakpoint } = Grid;

const PersonalInfomation = ({ next, user, data }) => {
    const [form] = Form.useForm();
    const screen = useBreakpoint();
    const [disabledStatus, setDisabledStatus] = useState({
        name: true,
        address: true,
        gender: true,
        phone: true,
        id_card: true
    });

    useEffect(() => {
        form.setFieldValue('name', user?.name);
        form.setFieldValue('gender', user?.gender);
        form.setFieldValue('phone', user?.phone);
        form.setFieldValue('id_card', user?.id_card);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleSubmit = () => {
        const data = {
            ...form.getFieldsValue(),
            dob: form.getFieldValue('dob').format('DD/MM/YYYY'),
            name: form.getFieldValue('name').trim(),
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
                >
                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin cá nhân</h5>

                    <NameInput
                        name="name"
                        placeholder="Họ và tên"
                        size="large"
                        disabled={disabledStatus.name}
                        addonAfter={<EditOutlined style={{ color: disabledStatus.name ? '' : '#594DC9' }} onClick={() => setDisabledStatus({ ...disabledStatus, name: !disabledStatus.name })} />}
                    />

                    <GenderInput
                        name="gender"
                        size="large"
                        disabled={disabledStatus.gender}
                        editable={true}
                        iconStyle={{ color: disabledStatus.gender ? '' : '#594DC9' }}
                        handleIconClick={() => setDisabledStatus({ ...disabledStatus, gender: !disabledStatus.gender })}
                    />

                    <IDInput
                        name="id_card"
                        placeholder="Số CMND/CCCD"
                        size="large"
                        disabled={disabledStatus.id_card}
                        addonAfter={<EditOutlined style={{ color: disabledStatus.id_card ? '' : '#594DC9' }} onClick={() => setDisabledStatus({ ...disabledStatus, id_card: !disabledStatus.id_card })} />}
                    />

                    <PhoneNumberInput
                        name="phone"
                        placeholder="Số điện thoại"
                        size="large"
                        disabled={disabledStatus.phone}
                        addonAfter={<EditOutlined style={{ color: disabledStatus.phone ? '' : '#594DC9' }} onClick={() => setDisabledStatus({ ...disabledStatus, phone: !disabledStatus.phone })} />}
                    />

                    <LocationInput
                        name="address"
                        size="large"
                        editable={true}
                        initialValue={user?.address}
                        disabled={disabledStatus.address}
                        handleIconClick={() => setDisabledStatus({ ...disabledStatus, address: !disabledStatus.address })}
                        form={form}
                    />

                    <SelectInput
                        size="large"
                        name="marital_status"
                        options={data.marital_status}
                        placeholder="Tình trạng hôn nhân"
                        suffixIcon={<CaretDownOutlined />}
                        initialValue={user?.address}
                    />

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
                                    if (!value || (currentYear - moment(value).year() >= 21 && currentYear - moment(value).year() <= 65)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Tuổi của Bạn ít nhất phải là 21 và không quá 65 tuổi'));
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
                            size="large"
                        />
                    </Form.Item>

                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Tài khoản</h5>

                    <EmailInput
                        size="large"
                        name="email"
                        placeholder="Email"
                        initialValue={user?.email}
                    />

                    <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 12 }}>
                        <InfoCircleFilled style={{ fontSize: 14, color: data.primaryColor }} />
                        <span style={{ fontSize: 14 }}>Mật khẩu tối thiểu 04 ký tự</span>
                    </div>

                    <PasswordInput
                        name="password"
                        pattern={"[a-zA-Z\\d\\W]{4,}"}
                        placeholder="Tạo mật khẩu"
                        size="large"
                        min={4}
                        initialValue={user?.password}
                    />

                    {/* CONFIRM_PASSWORD */}
                    <Form.Item
                        name="confirm_password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập mật khẩu"
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value || (value.length >= 4 && /[a-zA-Z\d\W]{4,}/.test(value))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu tối thiểu 4 kí tự'));
                                },
                            }),
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value || value.length < 4 || !/[a-zA-Z\d\W]{4,}/.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            size='large'
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate>
                        {() => {
                            return (
                                <Button
                                    size="large"
                                    style={{ width: '100%', fontWeight: 'bold' }}
                                    disabled={
                                        !(
                                            form.getFieldValue("name") &&
                                            form.getFieldValue("address") &&
                                            form.getFieldValue("phone") &&
                                            form.getFieldValue("marital_status") &&
                                            form.getFieldValue("id_card") &&
                                            form.getFieldValue("dob") &&
                                            form.getFieldValue("gender") &&
                                            form.getFieldValue("email") &&
                                            form.getFieldValue("password") &&
                                            form.getFieldValue("confirm_password")
                                        ) ||
                                        form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                    className={takomoStyle.submit_button}
                                    onClick={handleSubmit}
                                >
                                    Tiếp tục
                                </Button>
                            )
                        }}
                    </Form.Item>


                </Form>
            </ConfigProvider>
        </div>
    )
}

export default PersonalInfomation