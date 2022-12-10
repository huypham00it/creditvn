import { useEffect, useState } from 'react';
import { Form, Button, DatePicker, ConfigProvider, Modal } from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { useRouter } from 'next/router';

import * as SLUGID from '@/configs/slugId';
import StyleMCredit from '@/assets/MCredit.module.css';
import { UserInfo } from '@/contexts/user';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';
import Cookies from 'universal-cookie';
import AccountInfo from '@/components/form/AccountInfo';
import logStep from '@/utils/log';
import { mcredit_tracking } from '@/configs/tracking';
import data from '@/configs/mcredit';
import { SelectInput, EmailInput } from '@/components/form';
import moment from 'moment';

export default function UserForm() {
	const offer_id = "dcredit-2";
	const router = useRouter();
	const cookies = new Cookies();
	const click_id = cookies.get('click_id');
	const { showLoading, hideLoading } = useLoading();
	const { user } = UserInfo();
	const [trackingTime, setTrackingTime] = useState(mcredit_tracking);
	const [form] = Form.useForm();

	const [customer, setCustomer] = useState({
		name: "",
		gender: "",
		id_card: "",
		phone: "",
		address: ""
	})

	useEffect(() => {
		if (user) {
			setCustomer({
				name: user.name,
				gender: user.gender,
				id_card: user.id_card,
				phone: user.phone,
				address: user.address
			});
		}
	}, [user]);

	const handleSubmit = () => {
		const data = { ...form.getFieldsValue(), birthday: form.getFieldValue('birthday').format('DD-MM-YYYY') };
		data.offer_id = offer_id;
		data.click_id = click_id;
		console.log(data);
		showLoading();
		request.post("/lead", data).then(function (response) {
			hideLoading();
			console.log(response.data);
			Modal.success({
				title: 'Đăng ký thành công',
				content: 'Cảm ơn bạn đã đăng ký hồ sơ tại MCredit. Chúng tôi sẽ liên hệ để tư vấn trong thời gian sớm nhất',
				okText: 'Xác nhận & Quay lại',
				onOk: () => {
					router.push("/");
				},
				okButtonProps: { id: SLUGID.CONFIRM_SUCCESS + offer_id }
			})
		}).catch(function (error) {
			console.log(error);
			hideLoading();
			Modal.error({
				title: 'Đăng ký thất bại',
				content: 'Có lỗi xảy ra, xin vui lòng thử lại sau ít phút',
				okText: 'Xác nhận',
				okButtonProps: { id: SLUGID.CONFIRM_ERROR + offer_id }
			})
		});
	}

	const handleTrackingStart = (name) => {
		setTrackingTime({ ...trackingTime, [name]: { ...trackingTime[name], start: new Date().getTime() } })
	}

	const handleTrackingEnd = (name, value) => {
		const fieldTime = new Date().getTime() - trackingTime[name].start;
		logStep({
			[name]: value,
			offer_id: offer_id,
			total_input: fieldTime
		})
	}

	return (
		<>
			<h2 className={StyleMCredit.text_bold}>Thông tin cá nhân</h2>

			<ConfigProvider locale={locale}>

				<Form form={form} className={StyleMCredit.mcredit_form} name="mcredit_form" onSubmitCapture={handleSubmit}>
					<AccountInfo user={user} form={form} handleTrackingStart={handleTrackingStart} handleTrackingEnd={handleTrackingEnd} />

					<p style={{ fontSize: '14px' }}>Vui lòng nhập đúng thông tin sau để tiếp tục</p>

					<Form.Item
						name="birthday"
						rules={[
							{
								required: true,
							},
						]}
					>

						<DatePicker
							style={{ width: '100%' }} placeholder="Ngày sinh"
							format="DD-MM-YYYY"
							locale={locale}
							size="large"
							onFocus={() => handleTrackingStart("birthday")}
							onBlur={(e) => handleTrackingEnd("birthday", e.target.value)}
							onSelect={(e) => handleTrackingEnd("birthday", moment(e).format('DD-MM-YYYY'))}
						/>
					</Form.Item>

					<SelectInput
						name="income"
						required_message="Vui lòng chọn mức thu nhập"
						placeholder="Thu nhập"
						size="large"
						options={data.income_range}
						onBlur={() => handleTrackingEnd("income", form.getFieldValue('income'))}
						onFocus={() => handleTrackingStart("income")}
						onSelect={(value) => handleTrackingEnd("income", value)}
					/>

					<SelectInput
						name="job"
						required_message="Vui lòng chọn loại công việc"
						placeholder="Loại hình công việc"
						size="large"
						options={data.jobs}
						onBlur={() => handleTrackingEnd("job", form.getFieldValue('job'))}
						onFocus={() => handleTrackingStart("job")}
						onSelect={(value) => handleTrackingEnd("job", value)}
					/>

					<SelectInput
						name="loan_amount"
						required_message="Vui lòng chọn số tiền muốn vay"
						placeholder="Số tiền muốn vay"
						size="large"
						options={data.loan_range}
						onBlur={() => handleTrackingEnd("loan_amount", form.getFieldValue('loan_amount'))}
						onFocus={() => handleTrackingStart("loan_amount")}
						onSelect={(value) => handleTrackingEnd("loan_amount", value)}
					/>

					<EmailInput
						name="email"
						size="large"
						placeholder="Email"
						onFocus={() => handleTrackingStart("email")}
						onBlur={(e) => handleTrackingEnd("email", e.target.value)}
					/>

					<Form.Item shouldUpdate>
						{() => {
							return (
								<Button
									type="primary" htmlType='submit' size='large'
									style={{ width: '100%' }}
									disabled={
										!form.isFieldsTouched(['birthday', 'income', 'job', 'loan_amount', 'email'], true) ||
										!!form.getFieldsError().filter(({ errors }) => errors.length).length
									}
								>
									Hoàn tất
								</Button>
							)
						}}
					</Form.Item>
				</Form >
			</ConfigProvider>
		</>
	)
}