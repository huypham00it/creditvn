import React, { useState } from 'react';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { Form, ConfigProvider, Grid, Row, Col, Button, Tooltip } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import { NameInput, BaseInput, PhoneNumberInput, NumberInput, SelectInput } from '@/components/form';
import tamoStyle from '@/assets/Tamo.module.css';
import { phoneValid } from '@/utils/phone';
import validName from '@/utils/validName';

const { useBreakpoint } = Grid;

const OccupationIncome = ({ data, user, setUser, submit, prev }) => {
    const [form] = Form.useForm();
    const screen = useBreakpoint();
    const [job, setJob] = useState("");

    const handleSubmit = () => {
        const data = form.getFieldsValue();
        submit({ ...user, ...data });
    }

    const handleJobChange = (value) => {
        setJob(value);
        setUser({ ...user, occupation: value })
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
                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin nghề nghiệp</h5>

                    <SelectInput
                        name="occupation"
                        size={screen.md ? "large" : "medium"}
                        placeholder="Nghề nghiệp"
                        options={data.occupations}
                        suffixIcon={<CaretDownOutlined />}
                        onSelect={(value) => handleJobChange(value)}
                        initialValue={user.occupation}
                    />

                    {
                        job !== "Không làm việc" &&
                        job !== "Học sinh/sinh viên" &&
                        job !== "Đã nghỉ hưu" &&
                        <SelectInput
                            name="job_field"
                            size={screen.md ? "large" : "medium"}
                            placeholder="Lĩnh vực làm việc"
                            options={data.job_fields}
                            suffixIcon={<CaretDownOutlined />}
                            initialValue={user.job_field}
                            onSelect={(value) => setUser({ ...user, job_field: value })}
                        />
                    }

                    <Tooltip placement="topLeft" title="Vui lòng nhập tên công ty đang làm việc">
                        <div>
                            <BaseInput
                                name="workplace"
                                placeholder="Nơi làm việc"
                                size={screen.md ? "large" : "medium"}
                                required_message="Bạn chưa nhập nơi làm việc"
                                initialValue={user.workplace}
                                onChange={(e) => setUser({ ...user, workplace: e.target.value })}
                            />
                        </div>
                    </Tooltip>

                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thu nhập mỗi tháng</h5>

                    <NumberInput
                        name="total_income"
                        placeholder="Tổng thu nhập"
                        size={screen.md ? "large" : "medium"}
                        required_message="Bạn chưa nhập tổng thu nhập"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        addonAfter="VND"
                        controls={false}
                        initialValue={user.total_income}
                        onChange={(value) => setUser({ ...user, total_income: value })}
                    />

                    <NumberInput
                        name="total_expenses"
                        placeholder="Tổng chi phí"
                        size={screen.md ? "large" : "medium"}
                        required_message="Bạn chưa nhập tổng chi phí"
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        addonAfter="VND"
                        controls={false}
                        initialValue={user.total_expenses}
                        onChange={(value) => setUser({ ...user, total_expenses: value })}
                    />

                    <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Thông tin người thân</h5>

                    <NameInput
                        name="relative_name"
                        placeholder="Họ và tên người thân"
                        size={screen.md ? "large" : "medium"}
                        initialValue={user.relative_name}
                        onChange={(e) => {
                            if (validName(e.target.value)) {
                                setUser({ ...user, relative_name: e.target.value })
                            }
                        }}
                    />

                    <SelectInput
                        size={screen.md ? "large" : "medium"}
                        name="personal_relation"
                        placeholder="Quan hệ thân nhân"
                        options={data.personal_relations}
                        suffixIcon={<CaretDownOutlined />}
                        initialValue={user.personal_relation}
                        onSelect={(value) => setUser({ ...user, personal_relation: value })}
                    />

                    <Tooltip placement="topLeft" title="Vui lòng nhập số điện thoại liên hệ  của người thân">
                        <div>
                            <PhoneNumberInput
                                name="relative_phone_number"
                                placeholder="Số điện thoại"
                                size={screen.md ? "large" : "medium"}
                                initialValue={user.relative_phone_number}
                                onChange={(e) => {
                                    if (phoneValid(e.target.value)) {
                                        setUser({ ...user, relative_phone_number: e.target.value })
                                    }
                                }
                                }
                            />
                        </div>
                    </Tooltip>

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
                                                    form.getFieldValue('occupation') &&
                                                    (
                                                        (job !== "Không làm việc" && job !== "Học sinh/sinh viên" && job !== "Đã nghỉ hưu")
                                                            ? form.getFieldValue('job_field')
                                                            : true
                                                    ) &&
                                                    form.getFieldValue('workplace') &&
                                                    form.getFieldValue('total_income') &&
                                                    form.getFieldValue('total_expenses') &&
                                                    form.getFieldValue('relative_name') &&
                                                    form.getFieldValue('personal_relation') &&
                                                    form.getFieldValue('relative_phone_number')
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

export default OccupationIncome
