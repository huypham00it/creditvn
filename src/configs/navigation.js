import { InfoCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

const menus = [
    {
        label: "Trang chủ",
        icon: <HomeOutlined />,
        key: "/"
    },
    {
        label: "Hồ sơ",
        icon: <UserOutlined />,
        key: "/info"
    },
    {
        label: "Giới thiệu",
        icon: <InfoCircleOutlined />,
        key: "slider",
    }
];

export default menus;