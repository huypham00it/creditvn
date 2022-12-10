import React from 'react';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { Form, ConfigProvider, Row, Col, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { BaseInput, SelectInput, TextInput } from '@/components/form';
import takomoStyle from '@/assets/Takomo.module.css';
import validText from '@/utils/validText';


const AddressWork = ({ data, user, setUser, next, prev }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        const data = form.getFieldsValue();
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
                    name="occupation_income_form"
                    onSubmitCapture={handleSubmit}
                >
                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Địa chỉ cư trú</h5>

                    <TextInput
                        size="large"
                        name="workplace"
                        placeholder="Thành phố"
                        onChange={(e) => {
                            if (validText(e.target.value)) {
                                setUser({ ...user, workplace: e.target.value })
                            }
                        }}
                        required_message="Vui lòng nhập Thành phố"
                        error_message="Vui lòng nhập Thành phố"
                        initialValue={user.workplace}
                    />

                    <BaseInput
                        size="large"
                        name="district"
                        placeholder="Quận/Huyện"
                        required_message="Vui lòng nhập Quận/Huyện"
                        onChange={(e) => {
                            setUser({ ...user, district: e.target.value })
                        }}
                        initialValue={user.district}
                    />

                    <BaseInput
                        size="large"
                        name="ward"
                        placeholder="Phường/Xã"
                        required_message="Vui lòng nhập tên Phường/Xã"
                        onChange={(e) => {
                            setUser({ ...user, ward: e.target.value })
                        }}
                        initialValue={user.ward}
                    />

                    <BaseInput
                        size="large"
                        name="house_number"
                        placeholder="Căn hộ, Nhà, Đường"
                        required_message="Vui lòng nhập địa chỉ nơi cư trú"
                        onChange={(e) => {
                            setUser({ ...user, house_number: e.target.value })
                        }}
                        initialValue={user.house_number}
                    />

                    <SelectInput
                        size="large"
                        name="resident_time"
                        options={data.resident_time}
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="Thời gian cư trú"
                        onSelect={(value) => setUser({ ...user, resident_time: value })}
                        initialValue={user.resident_time}
                    />

                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Nơi làm việc</h5>

                    <SelectInput
                        size="large"
                        name="job"
                        options={data.jobs}
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="Loại công việc"
                        onSelect={(value) => setUser({ ...user, job: value })}
                        initialValue={user.job}
                    />

                    <SelectInput
                        size="large"
                        name="field"
                        options={data.job_fields}
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="Lĩnh vực hoạt động"
                        onSelect={(value) => setUser({ ...user, field: value })}
                        initialValue={user.field}
                    />

                    <BaseInput
                        size="large"
                        name="company"
                        placeholder="Tên công ty"
                        required_message="Vui lòng nhập tên công ty"
                        onChange={(e) => {
                            setUser({ ...user, company: e.target.value })
                        }}
                        initialValue={user.company}
                    />

                    <TextInput
                        size="large"
                        name="position"
                        placeholder="Chức vụ"
                        onChange={(e) => {
                            if (validText(e.target.value)) {
                                setUser({ ...user, position: e.target.value })
                            }
                        }}
                        required_message="Vui lòng nhập chức vụ"
                        error_message="Vui lòng nhập chức vụ"
                        initialValue={user.position}
                    />

                    <SelectInput
                        name="working_time"
                        size="large"
                        options={data.working_time}
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="Khoảng thời gian làm việc gần nhât"
                        onSelect={(value) => setUser({ ...user, working_time: value })}
                        initialValue={user.working_time}
                    />

                    <SelectInput
                        name="income"
                        size="large"
                        options={data.income_range}
                        placeholder="Thu nhập hàng tháng"
                        suffixIcon={<CaretDownOutlined />}
                        onSelect={(value) => setUser({ ...user, income: value })}
                        initialValue={user.income}
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
                                                    form.getFieldValue('income') &&
                                                    form.getFieldValue('working_time') &&
                                                    form.getFieldValue('position') &&
                                                    form.getFieldValue('company') &&
                                                    form.getFieldValue('field') &&
                                                    form.getFieldValue('job') &&
                                                    form.getFieldValue('resident_time') &&
                                                    form.getFieldValue('house_number') &&
                                                    form.getFieldValue('ward') &&
                                                    form.getFieldValue('district') &&
                                                    form.getFieldValue('workplace')
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

export default AddressWork
