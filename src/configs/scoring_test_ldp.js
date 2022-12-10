import {
    MailOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import banner_bg from '@/assets/img/scoring_credit/banner_bg.png';
import header_logo from '@/assets/img/scoring_credit/header_logo.svg';
import footer_logo from '@/assets/img/scoring_credit/footer_logo.svg';
import lotte from '@/assets/img/lotte.svg';
import mafc from '@/assets/img/miraeasset.svg';
import robocash from '@/assets/img/robocash.svg';
import atm_online from '@/assets/img/atm_online.svg';
import shinhan from '@/assets/img/shinhan.svg';
import mcredit from '@/assets/img/mcredit.svg';
import vib from '@/assets/img/vib.svg';
import ptf from '@/assets/img/ptf.svg';
import icon_01 from '@/assets/img/scoring_credit/01.svg';
import icon_02 from '@/assets/img/scoring_credit/02.svg';
import icon_03 from '@/assets/img/scoring_credit/03.svg';
import icon_04 from '@/assets/img/scoring_credit/04.svg';
import icon_05 from '@/assets/img/scoring_credit/05.svg';
import icon_06 from '@/assets/img/scoring_credit/06.svg';
import banner_decor from '@/assets/img/scoring_credit/banner_decor.png';
export const navigation = [
    {
        label: "Giới thiệu",
        href: "#introduce"
    },
    {
        label: "Nổi bật",
        href: "#special"
    },
    {
        label: "Đối tác",
        href: "#partner"
    },
    {
        label: "Tư vấn",
        href: "#support"
    },
    {
        label: "Đăng ký",
        href: "https://credit.vn"
    }
];

export const banner = {
    heading: "Credit.vn\nHệ thống bảo vệ an toàn thông tin tín dụng",
    backgroundImage: banner_bg,
    description: "Credit.vn là hệ thống đánh giá tín dụng của dựa trên lịch sử tín dụng và tiêu dùng. Đây là hệ thống giúp khách hàng giám sát và đảm bảo được thông tin điểm tín dụng đang có ở mức báo động hay không.\n\nĐiểm tín dụng là cơ sở để ngân hàng và tổ chức tài chính đánh giá mức độ tín nhiệm của bạn, điểm tín nhiệm càng cao sẽ giúp cho bạn dễ dàng được chấp nhận giải ngân từ ngân hàng và các tổ chức tài chính.",
    items: [
        {
            icon: icon_06,
            label: "Thực hiện chức năng giám sát và bảo vệ an toàn điểm tín dụng"
        },
        {
            icon: icon_06,
            label: "Phân tích và giúp cải thiện điểm tín dụng"
        },
        {
            icon: icon_06,
            label: "Cảnh báo rủi ro rò rỉ thông tin tín dụng"
        }
    ],
    decor: banner_decor
}

export const special = {
    heading: "Nổi bật",
    description: "Khi hợp tác cùng Credit.vn, Đối tác sẽ nhận được những quyền lợi vượt trội",
    items: [
        {
            icon: icon_01,
            description: "Hợp tác với các đối tác hàng đầu Việt Nam",
            color: "#FA8C16"
        },
        {
            icon: icon_02,
            description: "Bảo mật chặt chẽ tuyệt đối",
            color: "#13C2C2"
        },
        {
            icon: icon_03,
            description: "Gửi cảnh báo điểm tín dụng",
            color: "#FF4D4F"
        },
        {
            icon: icon_03,
            description: "Phân loại hồ sơ khách hàng với đối tác phù hợp",
            color: "#1890FF"
        },
        {
            icon: icon_04,
            description: "Hỗ trợ duyệt hồ sơ khách hàng nhanh nhất",
            color: "#7E73E7"
        },
    ]
}

export const partners = {
    heading: "Đối tác",
    items: [lotte, mafc, robocash, atm_online, shinhan, mcredit, vib, ptf]
}

export const float_box = {
    heading: "Kiểm tra điểm tín dụng"
}

export const support = {
    heading: "Bạn thường xuyên phải đối mặt với",
    items: [
        {
            icon: icon_05,
            description: "Thường xuyên bị quấy rối nhưng không vay"
        },
        {
            icon: icon_05,
            description: "Mất thời gian kiểm tra điểm tín dụng"
        }
    ]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    header_logo: header_logo,
    footer_logo: footer_logo,
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
    test: {
        label: "Kiểm tra ngay",
        href: "https://credit.vn"
    },
    signup: {
        label: "Đăng ký",
        href: "https://credit.vn"
    },
    support: {
        label: "Tư vấn ngay",
        href: "https://credit.vn"
    }
}