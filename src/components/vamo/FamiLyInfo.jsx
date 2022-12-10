import React, { useState } from 'react';
import { Form, Select, Input, Button, Row, Col, Radio, Grid } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import styleForm from '@/assets/FormLdp.module.css';
import { phoneValid } from '@/utils/phone';
import validName from '@/utils/validName';

const { useBreakpoint } = Grid;

const FamilyInfo = ({ vamo, banks, submit, prevStep, customer, setCustomer }) => {
    const screen = useBreakpoint();
    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState(customer.payment_method ? customer.payment_method : "bank");

    const handleSubmit = () => {
        submit({ ...customer, ...form.getFieldsValue() })
    }

    return (

        <Form form={form} name="address_career_form" onSubmitCapture={handleSubmit}>
            <h2 style={{ fontSize: '16px', textAlign: 'center' }}>Bạn hãy điền đầy đủ thông tin và chọn ”Tiếp tục”</h2>

            <p style={{ fontSize: '14px', marginBottom: "16px" }}>Thông tin bổ sung</p>

            {/* PHONE_BRAND */}
            <Form.Item
                className={styleForm.custom_field}
                name="phone_brand"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn thương hiệu điện thoại"
                    },
                ]}
                initialValue={customer?.phone_brand ? customer.phone_brand : null}
            >

                <Select
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Tên thương hiệu điện thoại"
                    options={vamo.phone_brands}
                    onSelect={(value) => setCustomer({ ...customer, phone_brand: value })}
                />

            </Form.Item>

            {/* MARITAL_STATUS */}
            <Form.Item
                className={styleForm.custom_field}
                name="marital_status"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn tình trạng gia đình"
                    },
                ]}
                initialValue={customer?.marital_status ? customer.marital_status : null}
            >

                <Select
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Tình trạng gia đình"
                    options={vamo.marital_status}
                    onSelect={(value) => setCustomer({ ...customer, marital_status: value })}
                />
            </Form.Item>

            <p style={{ fontSize: '14px' }}>Thông tin liên lạc người thân</p>

            {/* RELATIVE */}
            <Form.Item
                className={styleForm.custom_field}
                name="relative"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên người thân"
                    },
                    () => ({
                        validator(_, value) {
                            if (value.length < 1 || validName(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Vui lòng nhập tên người thân'));
                        },
                    })
                ]}
                initialValue={customer?.relative ? customer.relative : ""}
            >
                <Input
                    size='large'
                    onChange={(e) => {
                        if(e.target.value.startsWith(' ')) {
                            form.setFieldValue('relative', "");
                            return;
                        }
                        setCustomer({ ...customer, relative: e.target.value })
                    }}
                    placeholder="Tên người thân"
                />
            </Form.Item>

            <Form.Item
                className={styleForm.custom_field}
                name="relative_phone"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập SDT người thân"
                    },
                    () => ({
                        validator(_, value) {
                            if (value.length < 1 || phoneValid(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Số điện thoại phải bắt đầu từ số 0 và bao gồm 10 số'));
                        },
                    })
                ]}
                initialValue={customer?.relative_phone ? customer.relative_phone : ""}
            >
                <Input
                    size='large'
                    onChange={(e) => setCustomer({ ...customer, relative_phone: e.target.value })}
                    placeholder="Số điện thoại"
                />
            </Form.Item>

            <p style={{ fontSize: '14px' }}>Thông tin tài chính</p>

            {/* PAYMENT_METHOD */}

            <h3 style={{marginBottom: 8}}>Bạn muốn nhận khoản vay thông qua:</h3>
            <div id='vamo_payment'>
                <Form.Item
                    className={styleForm.custom_field}
                    name="payment_method"
                    style={{ marginBottom: '16px' }}
                    initialValue={paymentMethod}
                >

                    <Radio.Group
                        style={{ display: 'flex', paddingLeft: 0, paddingRight: 0 }}
                        onChange={(e) => {
                            form.setFieldValue('account_holder', null);
                            form.setFieldValue('account_number', null);
                            form.setFieldValue('card_number', null);
                            setCustomer({ ...customer, payment_method: e.target.value })
                            setPaymentMethod(e.target.value)
                        }}
                    >
                        {vamo.payment_methods.map((item, index) => (
                            <Radio.Button
                                key={index}
                                value={item.value}
                                style={{
                                    width: '50%',
                                    minHeight: '46px',
                                    lineHeight: 1.3,
                                    borderRadius: '2px',
                                    textAlign: 'center'
                                }}
                            >
                                {paymentMethod === item.value &&
                                    <CheckOutlined style={{
                                        position: 'absolute',
                                        left: 8
                                    }}  />
                                }
                                {item.label}
                            </Radio.Button>
                        ))}
                    </Radio.Group>

                </Form.Item>
            </div>

            <Form.Item
                className={styleForm.custom_field}
                name="bank"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn ngân hàng"
                    },
                ]}
                initialValue={customer?.bank ? customer.bank : null}
            >

                <Select
                    notFoundContent="Không tìm thấy"
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Tên ngân hàng"
                    options={banks}
                    onSelect={(value) => setCustomer({ ...customer, bank: value })}
                />

            </Form.Item>
            {paymentMethod === 'bank' &&
                <>
                    {/* ACCOUNT_HOLDER */}
                    <Form.Item
                        className={styleForm.custom_field}
                        name="account_holder"
                        style={{ marginBottom: '16px' }}
                        rules={[
                            {
                                required: true,
                                message: "Tên tài khoản không đúng"
                            },
                            () => ({
                                validator(_, value) {
                                    if (value.length < 1 || validName(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Tên tài khoản không đúng'));
                                },
                            })
                        ]}
                        initialValue={customer?.account_holder ? customer.account_holder : ""}
                    >
                        <Input
                            size="large"
                            onChange={(e) => { 
                                if(e.target.value.startsWith(' ')) {
                                    form.setFieldValue('account_holder', "");
                                    return;
                                }
                                setCustomer({ ...customer, account_holder: e.target.value })
                            }}
                            placeholder="Họ tên chủ tài khoản"
                        />
                    </Form.Item>

                    {/* ACCOUNT NUMBER */}
                    <Form.Item
                        className={styleForm.custom_field}
                        name="account_number"
                        style={{ marginBottom: '16px' }}
                        rules={[
                            {
                                required: true,
                                message: "Số tài khoản không đúng"
                            },
                        ]}
                        initialValue={customer?.account_number ? customer.account_number : ""}
                    >
                        <Input
                            size='large'
                            onChange={(e) => setCustomer({ ...customer, account_number: e.target.value })}
                            type='number'
                            placeholder="Số tài khoản"
                        />
                    </Form.Item>
                </>
            }

            {paymentMethod === 'card' &&
                <>
                    {/* CARD_NUMBER */}
                    <Form.Item
                        className={styleForm.custom_field}
                        name="card_number"
                        style={{ marginBottom: '16px' }}
                        rules={[
                            {
                                required: true,
                                message: "Số thẻ không đúng"
                            },
                        ]}
                        initialValue={customer?.card_number ? customer.card_number : ""}
                    >
                        <Input
                            size='large'
                            onChange={(e) => setCustomer({ ...customer, card_number: e.target.value })}
                            type='number'
                            placeholder="Số thẻ"
                        />
                    </Form.Item>

                    {/* ACCOUNT_HOLDER */}
                    <Form.Item
                        className={styleForm.custom_field}
                        name="account_holder"
                        style={{ marginBottom: '16px' }}
                        rules={[
                            {
                                required: true,
                                message: "Tên thẻ không đúng"
                            },
                            () => ({
                                validator(_, value) {
                                    if (value.length < 1 || validName(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Tên thẻ không đúng'));
                                },
                            })

                        ]}
                        initialValue={customer?.account_holder ? customer.account_holder : ""}
                    >
                        <Input
                            size='large'
                            onChange={(e) => {
                                if(e.target.value.startsWith(' ')) {
                                    form.setFieldValue('account_holder', "");
                                    return;
                                }
                                setCustomer({ ...customer, account_holder: e.target.value })
                            }}
                            placeholder="Họ tên trên thẻ"
                        />
                    </Form.Item>
                </>
            }

            {/* Footer */}
            <Row gutter={8}>
                <Col span={12}>
                    <Button
                        style={{
                            width: '100%'
                        }}
                        onClick={prevStep}
                    >Quay lại</Button>
                </Col>
                <Col span={12}>
                    <Form.Item shouldUpdate>
                        {() => {
                            return (
                                <Button
                                    type="primary" htmlType='submit'
                                    style={{ width: '100%' }}
                                    disabled={
                                        !(
                                            form.getFieldValue('account_holder') && 
                                            form.getFieldValue('bank') && 
                                            form.getFieldValue('relative_phone') &&
                                            form.getFieldValue('relative') &&
                                            form.getFieldValue('marital_status') &&
                                            form.getFieldValue('phone_brand')
                                            && form.getFieldValue(paymentMethod === 'bank' ? 'account_number' : 'card_number')
                                        ) || 
                                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    Tiếp tục
                                </Button>
                            )
                        }}
                    </Form.Item>
                </Col>
            </Row>
        </Form >
    )
}

export default FamilyInfo