import React, { useEffect, useState } from 'react';
import { Form, Select, Grid, Input, Button, Row, Col } from 'antd';

import styleForm from '@/assets/FormLdp.module.css';
import { locationService } from '@/utils/provinces';
import { phoneValid } from '@/utils/phone';

const { useBreakpoint } = Grid;

const AddressCareer = ({ vamo, provinces, nextStep, prevStep, customer, setCustomer, isProvinceChanged }) => {
    const screen = useBreakpoint();
    const [form] = Form.useForm();
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    
    const handleSubmit = () => {
        const data = {
            ...form.getFieldsValue(),
        };
        nextStep(data);
    }
    
    useEffect(() => {
        const getDistrict = async () => {
            const userAddress = provinces.find(item => item.name.replace(/\s/g, "").includes(customer.address.replace(/\s/g, "")));
            const response = await locationService.get('/district?province=' + userAddress?.code);

            setDistricts(response.data.results.map(item => ({ label: item.name, value: item.name, code: item.code })));

            if (isProvinceChanged) {
                form.setFieldValue('district', null);
                form.setFieldValue('ward', null);
                form.setFieldValue('street', null);
            }
        }

        getDistrict();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customer.address])

    const getCommune = async (value) => {
        form.setFieldValue('ward', null);
        const districtCode = districts.find(item => item.value === value).code;
        const response = await locationService.get('/commune?district=' + districtCode);
        setWards(response.data.results.map(item => ({ label: item.name, value: item.name, code: item.code })))
    }

    return (

        <Form form={form} name="address_career_form" onSubmitCapture={handleSubmit}>
            <h2 style={{ fontSize: '16px', textAlign: 'center', marginBottom: 16, marginTop: screen.md ? "" : 10 }}>Bạn hãy điền đầy đủ thông tin và chọn ”Tiếp tục”</h2>

            <p style={{ fontSize: '14px', marginBottom: 16 }}>Thông tin về Địa chỉ</p>

            {/* DISTRICT */}
            <Form.Item
                className={styleForm.custom_field}
                name="district"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn Thị trấn/Quận"
                    },
                ]}
                initialValue={customer?.district ? customer.district : null}
            >

                <Select
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Thị trấn/Quận"
                    options={districts}
                    onSelect={(value) => {
                        getCommune(value);
                        setCustomer({ ...customer, district: value })
                    }}
                />

            </Form.Item>

            {/* WARD */}
            <Form.Item
                className={styleForm.custom_field}
                name="ward"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn phường"
                    },
                ]}
                initialValue={customer?.ward ? customer.ward : null}
            >

                <Select
                    notFoundContent="Vui lòng chọn Thị trấn/Quận"
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Phường"
                    options={wards}
                    onSelect={(value) => setCustomer({ ...customer, ward: value })}
                />
            </Form.Item>

            {/* STREET */}
            <Form.Item
                className={styleForm.custom_field}
                name="street"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập đúng địa chỉ"
                    },
                ]}
                initialValue={customer?.street ? customer.street : ""}
            >
                <Input
                    size='large'
                    onChange={(e) => {
                        if(e.target.value.startsWith(" ")){
                            form.setFieldValue('street', "");
                            return;
                        }
                        setCustomer({ ...customer, street: e.target.value })
                    }}
                    placeholder="Căn hộ, Nhà, Đường"
                />
            </Form.Item>

            <p style={{ fontSize: '14px', marginBottom: 16 }}>Thông tin về nghề nghiệp</p>

            {/* JOB */}
            <Form.Item
                className={styleForm.custom_field}
                name="job"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn loại công việc"
                    },
                ]}
                initialValue={customer?.job ? customer.job : null}
            >

                <Select
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Loại công việc"
                    options={vamo.job_types}
                    onSelect={(value) => setCustomer({ ...customer, job: value })}
                />

            </Form.Item>

            {/* JOB_TITLE */}
            <Form.Item
                className={styleForm.custom_field}
                name="job_title"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn chức danh công việc"
                    },
                ]}
                initialValue={customer?.job_title ? customer.job_title : null}
            >

                <Select
                    maxTagPlaceholder={10}
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Chức danh công việc"
                    options={vamo.job_titles}
                    onSelect={(value) => setCustomer({ ...customer, job_title: value })}
                />

            </Form.Item>

            {/* COMPANY */}
            <Form.Item
                className={styleForm.custom_field}
                name="company"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên công ty"
                    },
                ]}
                initialValue={customer?.company ? customer.company : ""}
            >
                <Input
                    size='large'
                    onChange={(e) => {
                        if(e.target.value.startsWith(" ")){
                            form.setFieldValue('company', "");
                            return;
                        }
                        setCustomer({ ...customer, company: e.target.value })
                    }}
                    placeholder="Công ty"
                />
            </Form.Item>

            {/* WORKING_TIME */}
            <Form.Item
                className={styleForm.custom_field}
                name="working_time"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Bạn chưa chọn thời gian công tác"
                    },
                ]}
                initialValue={customer?.working_time ? customer.working_time : null}
            >

                <Select
                    style={{ width: '100%' }}
                    className={styleForm.custom_select2}
                    size="middle"
                    placeholder="Thời gian công tác"
                    options={vamo.working_time}
                    onSelect={(value) => setCustomer({ ...customer, working_time: value })}
                />

            </Form.Item>

            {/* INCOME */}
            <Form.Item
                className={styleForm.custom_field}
                name="income"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập đúng thu nhập"
                    },
                ]}
                initialValue={customer?.income ? customer.income : ""}
            >
                <Input
                    size='large'
                    onChange={(e) => {
                        if (e.target.value.startsWith("0")){
                            form.setFieldValue("income", "");
                            return;
                        }
                        setCustomer({ ...customer, income: e.target.value })
                    }}
                    type='number'
                    placeholder="Thu nhập hàng tháng"
                    addonAfter="VNĐ"
                />
            </Form.Item>

            {/* PAY_UP */}
            <Form.Item
                className={styleForm.custom_field}
                name="pay_up"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập đúng thu nhập"
                    },
                ]}
                initialValue={customer?.pay_up ? customer.pay_up : ""}
            >
                <Input
                    size='large'
                    type='number'
                    placeholder="Tổng tiền trả nợ mỗi tháng"
                    addonAfter="VNĐ"
                    onChange={(e) => {
                        if (e.target.value.startsWith("0")){
                            form.setFieldValue("pay_up", "");
                            return;
                        }
                        setCustomer({ ...customer, pay_up: e.target.value })
                    }}
                />
            </Form.Item>

            {/* FRIEND_PHONE */}
            <Form.Item
                className={styleForm.custom_field}
                name="colleague_phone"
                style={{ marginBottom: '16px' }}
                rules={[
                    {
                        required: true,
                        message: "Số điện thoại phải bắt đầu từ số 0 và bao gồm 10 số"
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
                initialValue={customer?.colleague_phone ? customer.colleague_phone : ""}
            >
                <Input
                    size='large'
                    onChange={(e) => setCustomer({...customer, colleague_phone: e.target.value })}
                    type='number'
                    placeholder="Số điện thoại đồng nghiệp"
                />
            </Form.Item>

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
                                            form.getFieldValue('colleague_phone') &&
                                            form.getFieldValue('pay_up') &&
                                            form.getFieldValue('income') &&
                                            form.getFieldValue('working_time') &&
                                            form.getFieldValue('company') &&
                                            form.getFieldValue('job_title') &&
                                            form.getFieldValue('job') &&
                                            form.getFieldValue('street') &&
                                            form.getFieldValue('ward') &&
                                            form.getFieldValue('district')) ||
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

export default AddressCareer