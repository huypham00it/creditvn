import { Steps, Grid } from 'antd';

const { useBreakpoint } = Grid;

const { Step } = Steps;

const Form_Steps = (props) => {
    const screen = useBreakpoint();
    return (
        <div style={{ margin: '0 auto 16px', maxWidth: '720px' }}>
            <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Điền thông tin vay</h4>
            <p style={{ fontSize: 14, fontWeifht: 400, marginBottom: 15 }}>Vui lòng nhập đúng thông tin để được vay</p>
            <Steps size={screen.md ? 'default' : 'small'} {...props} progressDot={false}>
                {props.steps.map((step, index) => (
                    <Step title={step.title} key={index} />
                ))}
            </Steps>
        </div>
    )
}

export default Form_Steps;