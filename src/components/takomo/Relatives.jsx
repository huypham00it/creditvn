import React from 'react';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { Form, ConfigProvider, Grid, Row, Col, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { NameInput, PhoneNumberInput, SelectInput } from '@/components/form';
import takomoStyle from '@/assets/Takomo.module.css';
import { phoneValid } from '@/utils/phone';
import validName from '@/utils/validName';

const { useBreakpoint } = Grid;

const Relatives = ({ data, user, setUser, submit, prev }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        const data = form.getFieldsValue();
        console.log({ ...user, ...data });
        // submit({ ...user, ...data });
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
                    name="occupation_income_form"
                    onSubmitCapture={handleSubmit}
                >
                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin người thân</h5>

                    <NameInput
                        size="large"
                        name="relative_name"
                        placeholder="Họ và tên"
                        initialValue={user.relative_name}
                        onChange={(e) => {
                            if (validName(e.target.value)) {
                                setUser({ ...user, relative_name: e.target.value })
                            }
                        }}
                    />

                    <SelectInput
                        size="large"
                        name="relative"
                        placeholder="Quan hệ thân nhân"
                        options={data.personal_relations}
                        initialValue={user.relative}
                        onSelect={(value) => setUser({ ...user, relative: value })}
                        suffixIcon={<CaretDownOutlined />}
                    />

                    <PhoneNumberInput
                        name="relative_phone"
                        placeholder="Số điện thoại"
                        size="large"
                        initialValue={user.relative_phone}
                        onChange={(e) => {
                            if (phoneValid(e.target.value)) {
                                setUser({ ...user, relative_phone: e.target.value })
                            }
                        }}
                    />

                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin đồng nghiệp</h5>

                    <NameInput
                        size="large"
                        name="colleague_name"
                        placeholder="Họ và tên"
                        initialValue={user.colleague_name}
                        onChange={(e) => {
                            if (validName(e.target.value)) {
                                setUser({ ...user, colleague_name: e.target.value })
                            }
                        }}
                    />

                    <PhoneNumberInput
                        name="colleague_phone"
                        placeholder="Số điện thoại"
                        size="large"
                        initialValue={user.colleague_phone}
                        onChange={(e) => {
                            if (phoneValid(e.target.value)) {
                                setUser({ ...user, colleague_phone: e.target.value })
                            }
                        }}
                    />

                    <Row gutter={16}>
                        <Col span={12}>
                            <Button
                                size='large'
                                style={{
                                    backgroundColor: '#E0E0E0',
                                    width: '100%'
                                }}
                                className={takomoStyle.button}
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
                                            size="large"
                                            htmlType='submit'
                                            style={{ width: '100%', fontWeight: 'bold' }}
                                            disabled={
                                                !(
                                                    form.getFieldValue('relative_name') &&
                                                    form.getFieldValue('relative_phone') &&
                                                    form.getFieldValue('relative') &&
                                                    form.getFieldValue('colleague_name') &&
                                                    form.getFieldValue('colleague_phone')
                                                ) ||
                                                form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                            className={takomoStyle.submit_button}
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

export default Relatives
