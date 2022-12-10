import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import buttonStyle from '@/assets/Button.module.css';

export default function DirectionArrow(props) {
	return (
		<div className={props.className}>
			<Button
				icon={
					<LeftOutlined
						className={buttonStyle.icon_arrow}
					/>
				}
				onClick={props.onClickPrev}
				disabled={props.prevDisabled}
			/>
			<Button
				icon={
					<RightOutlined
						className={`${buttonStyle.icon_arrow} ${props.isDisabled && buttonStyle.icon_arrow_disabled}`}
					/>
				}
				onClick={props.onClickNext}
				disabled={props.nextDisabled}
				id={props.id}
			/>
		</div>
	);
}
