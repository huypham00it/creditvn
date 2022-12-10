import {
    PercentageOutlined,
    ThunderboltOutlined,
    AppstoreAddOutlined,
    ShareAltOutlined,
    UserSwitchOutlined,
    MailOutlined,
    CreditCardOutlined,
    SafetyCertificateOutlined,
    WalletOutlined,
    ShakeOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import credit from '@/assets/img/welcome_ldp/credit_text_white.svg';
import credit_white from '@/assets/img/credit_white.svg';
import banner_bg from '@/assets/img/welcome_ldp/banner_bg.png';
import introduce_bg from '@/assets/img/welcome_ldp/introduce_bg.png';
import experience_bg from '@/assets/img/welcome_ldp/experience_bg.png';
import footer_bg from '@/assets/img/welcome_ldp/footer_bg.png';
import img_01 from '@/assets/img/welcome_ldp/01.png';
import img_02 from '@/assets/img/welcome_ldp/02.png';
import img_03 from '@/assets/img/welcome_ldp/03.png';

export const navigation = [
    {
        label: "Giới thiệu",
        href: "#introduce"
    },
    {
        label: "Giải pháp",
        href: "#solution"
    },
    {
        label: "Lợi ích",
        href: "#benefit"
    },
    {
        label: "Hỗ trợ",
        href: "#support"
    },
    {
        label: "Đăng ký",
        href: "https://credit.vn"
    }
];

export const banner = {
    heading: "Mua trước,\n trả sau",
    sub_heading: "ở đây",
    backgroundImage: banner_bg,
    imgs: {
        img_01,
        img_02
    },
    buy_now: "Buy now",
    pay_later: "Pay later"
}

export const introduce = {
    heading: "Mua Hàng Trước Chia Hoá Đơn Thanh Toán Theo Nhu Cầu",
    description: "Bạn đang mong muốn thoải mái mua sắm nhưng ngần ngại hoá đơn phải thanh toán một lần.\n\nĐến với Credit.vn, bạn có thể mua sắm thả ga thoải mái mua hàng online bằng cách chia hoá đơn của bạn thành các kì thanh toán bằng nhau với nhiều tiện ích thanh toán hoá đơn trong tích tắc và linh hoạt. Có ngay trong tay hạn mức lên đến 20 triệu kèm nhiều đặc quyền hấp dẫn!",
    backgroundImage: introduce_bg,
    imgs: {
        img_03
    }
}

export const solution = {
    heading: "Giải pháp",
    description: "Credit.vn với công nghệ mua sắm thông minh, đa dạng cách thức thanh toán cho mọi nhu cầu. Yên tâm mua sắm mọi thứ trong tầm tay.",
    items: [
        {
            icon: <PercentageOutlined />,
            description: "Lãi suất thấp, trả góp linh hoạt"
        },
        {
            icon: <ThunderboltOutlined />,
            description: "Quy trình duyệt nhanh chóng"
        },
        {
            icon: <AppstoreAddOutlined />,
            description: "Đa dạng tiện ích thanh toán"
        },
        {
            icon: <ShareAltOutlined />,
            description: "Đa dạng đối tác"
        },
        {
            icon: <UserSwitchOutlined />,
            description: "Đăng kí tài khoản nhanh chóng"
        },
    ]
}

export const benefit = {
    heading: "Lợi ích khách hàng",
    items: [
        {
            icon: <ShakeOutlined />,
            description: "Chia đơn hàng để thanh toán"
        },
        {
            icon: <WalletOutlined />,
            description: "Quản lí khả năng chi tiêu mọi lúc mọi nơi"
        },
        {
            icon: <SafetyCertificateOutlined />,
            description: "Sử dụng OTP để bảo mật cho tài khoản của bạn"
        },
        {
            icon: <CreditCardOutlined />,
            description: "Dễ dàng thanh toán"
        },
    ]
}

export const experience = {
    heading: 'Trải nghiệm ngay!',
    description: 'Credit.vn với công nghệ mua sắm thông minh, đa dạng cách thức thanh toán cho mọi nhu cầu. Yên tâm mua sắm mọi thứ trong tầm tay.',
    backgroundImage: experience_bg
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    logo: credit,
    logo_white: credit_white,
    description: "Một sản phẩm từ Công ty Cổ phần Công nghệ RIO Việt Nam.",
    working_time: {
        heading: "Giờ làm việc",
        description: 'Thứ Hai - Thứ Sáu\n09:00 - 18:00'
    },
    contact: {
        heading: "Liên hệ",
        email: {
            icon: <MailOutlined />,
            description: "rio.credit.vn@gmail.com"
        },
        address: {
            icon: <EnvironmentOutlined />,
            description: "70 Nguyễn Phi Khanh, phường Tân Định, Quận 1, thành phố Hồ Chí Minh",
            href: "https://goo.gl/maps/Hf2HVDbhSWFEpCfd6"
        }
    },
    copyright: "Copyright © 2022 Credit.vn",
    start: {
        label: "Bắt đầu",
        href: "https://credit.vn"
    },
    signup: {
        label: "Đăng ký",
        href: "https://credit.vn"
    },
    footer_bg: footer_bg
}