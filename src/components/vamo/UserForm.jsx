import { useState } from 'react';
import { Form, Button, DatePicker, ConfigProvider, Slider, Input, Divider, Grid } from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import moment from 'moment';

import styleForm from '@/assets/FormLdp.module.css';
import { UserInfo } from '@/contexts/user';
import PrefillInfo from '@/components/form/PrefillInfo';

const { useBreakpoint } = Grid;

export default function UserForm({ nextStep, customer, setCustomer }) {
	const screen = useBreakpoint();
	const { user } = UserInfo();
	const [form] = Form.useForm();
	const [loan, setLoan] = useState(customer?.loan ? customer.loan : 500000);

	const handleSubmit = () => {
		const data = {
			...form.getFieldsValue(),
			birthday: form.getFieldValue('birthday').format('DD-MM-YYYY'),
			issued_on: form.getFieldValue('issued_on').format('DD-MM-YYYY'),
			loan: loan
		};
		nextStep(data);
	}

	const formatter = (value) => value.toLocaleString().replace(/,/g, ".");

	const handleLoan = (value) => {
		setLoan(value);
		setCustomer({ ...customer, loan: value });
	}

	return (
		<>
			<h1 style={{ textAlign: 'center', marginTop: screen.md ? '-14px' : "", marginBottom: '16px' }}>
				Chào mừng <span>{user && user.gender === 'Nam' ? 'anh' : 'chị'}</span> <span className={styleForm.text_bold}>{user && user.name}</span> đã đến với <span className={styleForm.text_bold}>Vamo</span>!
			</h1>
			<p style={{ fontSize: '14px', marginBottom: '12px' }}>Vui lòng kiểm tra các thông tin sau</p>

			<h2 className={styleForm.text_bold}>Thông tin cá nhân</h2>

			<ConfigProvider locale={locale}>

				<Form form={form} name="vamo_form" onSubmitCapture={handleSubmit}>
					<PrefillInfo customer={customer} setCustomer={setCustomer} form={form} />

					<p style={{ fontSize: '14px', marginTop: 5, marginBottom: 16 }}>Vui lòng nhập đúng thông tin sau để tiếp tục</p>

					{/* ISSUED ON */}
					<Form.Item
						className={styleForm.custom_field}
						name="issued_on"
						style={{ marginBottom: '16px' }}
						rules={[
							{
								required: true,
								message: "Bạn chưa chọn ngày cấp CMND/CCCD"
							},
						]}
						initialValue={customer?.issued_on ? moment(customer.issued_on, 'DD-MM-YYYY') : null}
					>

						<DatePicker
							size='medium'
							className={styleForm.custom_input2}
							style={{ width: '100%' }} placeholder="Ngày cấp CMND/CCCD"
							format="DD-MM-YYYY"
							locale={locale}
							onChange={(e) => setCustomer({ ...customer, issued_on: moment(e).format("DD-MM-YYYY") })}
						/>
					</Form.Item>

					{/* DAY OF BIRTH */}
					<Form.Item
						className={styleForm.custom_field}
						name="birthday"
						style={{ marginBottom: '16px' }}
						rules={[
							{
								required: true,
								message: "Bạn chưa chọn ngày sinh"
							},
						]}
						initialValue={customer?.birthday ? moment(customer.birthday, 'DD-MM-YYYY') : null}
					>

						<DatePicker
							className={styleForm.custom_input2}
							style={{ width: '100%' }} placeholder="Ngày sinh"
							format="DD-MM-YYYY"
							locale={locale}
							onChange={(e) => setCustomer({ ...customer, birthday: moment(e).format("DD-MM-YYYY") })}
						/>
					</Form.Item>

					{/* LOAN TO GET */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<h3 style={{ marginBottom: 0 }}>Số tiền muốn vay</h3>
						<span>{loan.toLocaleString().replace(/,/g, ".")}</span>
					</div>

					<div id="vamo_slider">
						<Slider
							min={500000}
							max={15000000}
							marks={{ 500000: '500.000', 15000000: '15.000.000' }}
							step={250000}
							tooltip={{ formatter }}
							onChange={handleLoan}
							value={loan}
						/>
					</div>

					<Divider style={{ marginTop: 12, marginBottom: 16 }} />

					<p style={{ fontSize: '14px', marginBottom: 16 }}>Thông tin tài khoản</p>

					{/* PASSWORD */}
					<Form.Item
						className={styleForm.custom_field}
						name="password"
						style={{ marginBottom: '16px' }}
						rules={[
							{
								required: true,
								message: "Bạn chưa nhập mật khẩu",
							},
							() => ({
								validator(_, value) {
									if (value.length < 1 || (value.length >= 6 && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value))) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Mật khẩu phải có ít nhất 6 kí tự, bao gồm ít nhất 1 chữ in hoa và số'));
								},
							})
						]}
						initialValue={customer?.password ? customer.password : ""}
					>
						<Input.Password
							size='large'
							onChange={(e) => {
								const value = e.target.value;
								if (value.length >= 6 && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
									setCustomer({ ...customer, password: value })
								}
							}}
							placeholder="Mật khẩu"
						/>
					</Form.Item>

					{/* CONFIRM_PASSWORD */}
					<Form.Item
						className={styleForm.custom_field}
						name="confirm_password"
						style={{ marginBottom: '16px' }}
						dependencies={['password']}
						rules={[
							{
								required: true,
								message: "Bạn chưa nhập mật khẩu"
							},
							() => ({
								validator(_, value) {
									if (value.length < 1 || (value.length >= 6 && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value))) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Mật khẩu phải có ít nhất 6 kí tự, bao gồm ít nhất 1 chữ in hoa và số'));
								},
							}),
							({ getFieldValue }) => ({
								validator(_, value) {
									if (value.length < 1 || getFieldValue('password') === value || value.length < 6 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
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

					{/* EMAIL */}
					<Form.Item
						className={styleForm.custom_field}
						name="email"
						style={{ marginBottom: '16px' }}
						rules={[
							{
								type: 'email',
								message: "Email không đúng định dạng"
							},
						]}
						initialValue={customer?.email ? customer.email : ""}
					>
						<Input
							size='large'
							onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
							placeholder="Email (không bắt buộc)"
						/>
					</Form.Item>

					{/* CONTINUE */}
					<Form.Item shouldUpdate>
						{() => {
							return (
								<Button
									type="primary" htmlType='submit' size='large'
									style={{ width: '100%' }}
									disabled={
										// !form.isFieldsTouched(['birthday', 'password', 'issued_on', 'confirm_password'], true) ||
										!(form.getFieldValue('birthday')
											&& form.getFieldValue('password')
											&& form.getFieldValue('issued_on')
											&& form.getFieldValue('confirm_password')
										) ||
										!!form.getFieldsError().filter(({ errors }) => errors.length).length
									}
								>
									Tiếp tục
								</Button>
							)
						}}
					</Form.Item>
				</Form >
			</ConfigProvider>
		</>
	)
}