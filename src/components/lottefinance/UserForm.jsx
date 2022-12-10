import { useState } from 'react';
import { Form, Button, ConfigProvider, Modal } from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';
import { useRouter } from 'next/router';
import moment from 'moment/moment';

import * as SLUGID from '@/configs/slugId';
import StyleMCredit from '@/assets/MCredit.module.css';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';
import Cookies from 'universal-cookie';
import lotte_finance from '@/configs/lotte_finance';
import { lotte_finance_tracking } from '@/configs/tracking';
import { PrefillInfo } from '@/components/ldp';
import { BaseInput, DateInput, EmailInput, SelectInput } from '@/components/form';
import logStep from '@/utils/log';

export default function UserForm() {
	const offer_id = "lottefinance";
	const router = useRouter();
	const cookies = new Cookies();
	const click_id = cookies.get('click_id');
	const { showLoading, hideLoading } = useLoading();
	const [trackingTime, setTrackingTime] = useState(lotte_finance_tracking);
	const [form] = Form.useForm();

	const handleSubmit = () => {
		const data = { ...form.getFieldsValue(), birthday: form.getFieldValue('birthday').format('DD/MM/YYYY') };
		data.offer_id = offer_id;
		data.click_id = click_id;
		console.log(data);
		showLoading();
		request.post("/lead", data).then(function (response) {
			hideLoading();
			console.log(response.data);
			Modal.success({
				title: 'Đăng ký thành công',
				content: 'Cảm ơn bạn đã đăng ký hồ sơ tại Lotte Finance. Chúng tôi sẽ liên hệ để tư vấn trong thời gian sớm nhất',
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
			<h2 style={{fontWeight: '700'}}>Thông tin cá nhân</h2>

			<ConfigProvider locale={locale}>

				<Form form={form} className={StyleMCredit.mcredit_form} name="lottefinance_form" onSubmitCapture={handleSubmit}>
					<PrefillInfo form={form} handleTrackingStart={handleTrackingStart} handleTrackingEnd={handleTrackingEnd} />

					<p style={{ fontSize: '14px' }}>Vui lòng nhập đúng thông tin sau để tiếp tục</p>

					<EmailInput
						name="email"
						size="large"
						placeholder="Email"
						onFocus={() => handleTrackingStart("email")}
						onBlur={(e) => handleTrackingEnd("email", e.target.value)}
					/>

					<DateInput
						name="birthday"
						required_message="Bạn chưa chọn ngày sinh"
						placeholder="Ngày sinh"
						size="large"
						onFocus={() => handleTrackingStart("birthday")}
						onBlur={(e) => handleTrackingEnd("birthday", e.target.value)}
						onSelect={(e) => handleTrackingEnd("birthday", moment(e).format('DD-MM-YYYY'))}
					/>

					<BaseInput
						name="company"
						placeholder="Công ty"
						size="large"
						required_message="Vui lòng nhập tên công ty"
						onFocus={() => handleTrackingStart("company")}
						onBlur={(e) => handleTrackingEnd("company", e.target.value)}
					/>

					<SelectInput
						name="income"
						size="large"
						placeholder="Thu nhập"
						options={lotte_finance.income_ranges}
						onBlur={() => handleTrackingEnd("income", form.getFieldValue('income'))}
						onFocus={() => handleTrackingStart("income")}
						onSelect={(value) => handleTrackingEnd("income", value)}
					/>

					<SelectInput
						name="job"
						size="large"
						placeholder="Loại hình công việc"
						options={lotte_finance.jobs}
						onBlur={() => handleTrackingEnd("job", form.getFieldValue('job'))}
						onFocus={() => handleTrackingStart("job")}
						onSelect={(value) => handleTrackingEnd("job", value)}
					/>

					<SelectInput
						name="loan_amount"
						size="large"
						placeholder="Số tiền muốn vay"
						options={lotte_finance.loan_amounts}
						onBlur={() => handleTrackingEnd("loan_amount", form.getFieldValue('loan_amount'))}
						onFocus={() => handleTrackingStart("loan_amount")}
						onSelect={(value) => handleTrackingEnd("loan_amount", value)}
					/>

					<Form.Item shouldUpdate>
						{() => {
							return (
								<Button
									type="primary" htmlType='submit' size='large'
									style={{ width: '100%' }}
									disabled={
										!(
											form.getFieldValue("name") &&
											form.getFieldValue("gender") &&
											form.getFieldValue("phone") &&
											form.getFieldValue("id_card") &&
											form.getFieldValue("address") &&
											form.getFieldValue("email") &&
											form.getFieldValue("company") &&
											form.getFieldValue("income") &&
											form.getFieldValue("loan_amount") &&
											form.getFieldValue("job") &&
											form.getFieldValue("birthday")
										) ||
										form.getFieldsError().filter(({ errors }) => errors.length).length
									}
								>
									Gửi thông tin
								</Button>
							)
						}}
					</Form.Item>
				</Form >
			</ConfigProvider>
		</>
	)
}