import Logo from '@/assets/img/tamo.svg';
import TamoBanner from '@/assets/img/tamo_banner.png';
import TamoBannerMobile from '@/assets/img/tamo_banner_mobile.png';
import TamoBg from '@/assets/img/tamo_bg.png';
import { PhoneOutlined, FieldTimeOutlined, MailFilled } from '@ant-design/icons';
import moment from 'moment';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    copyright: {
        text: "© 2022. Bản quyền thuộc về Tamo.vn",
        background: "#00B3B2",
        color: "#000000"
    },
    logo: Logo,
    backgroundImage: TamoBg,
    bannerMobile: TamoBannerMobile,
    description: "Tamo.vn là nền tảng tư vấn và cung cấp các giải pháp tài chính trực tuyến 24/7, nhằm hỗ trợ cho các nhu cầu tài chính đột xuất của bạn. Thấu hiểu được những vấn đề tài chính bạn đang gặp phải, chúng tôi cố gắng mang đến bạn những giải pháp tài chính đơn giản, nhanh chóng và thuận tiện nhất.",
    support: [
        {
            heading: "Hỗ trợ thanh toán",
            phone: {
                icon: <PhoneOutlined />,
                text: "086 627 2345"
            },
            mail: {
                icon: <MailFilled />,
                text: "hotro@tamo.vn"
            }
        },
        {
            heading: "Chăm sóc khách hàng",
            phone: {
                icon: <PhoneOutlined />,
                text: "190 098 9980"
            },
            mail: {
                icon: <MailFilled />,
                text: "hotrothanhtoan@tamo.vn"
            }
        }],
    worktime: {
        icon: <FieldTimeOutlined />,
        heading: "Thời gian làm việc",
        content: ["Thứ Hai - Chủ Nhật: 08:00 - 18:00"]
    },
    primaryColor: "#00B3B2",
    signup: {
        tabs: ["Khách hàng mới", "Khách hàng cũ"],
        first_pay: () => {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            return moment(date).format("DD/MM/YYYY");
        },
        calcPayment: (value) => {
            if (1000000 <= value && value <= 2750000) {
                return Math.round(value * (1 + 0.54));
            }

            if (3000000 <= value && value <= 4750000) {
                return Math.round(value * (1 + 0.495));
            }

            if (5000000 <= value && value <= 5750000) {
                return Math.round(value * (1 + 0.48));
            }

            if (600000 <= value && value <= 7000000) {
                return Math.round(value * (1 + 0.465));
            }
        }, 
        min: {label: '1 000 000', value: 1000000 },
        max: {label: '7 000 000', value: 7000000 },
        step: 250000,
        defaultValue: 4000000,
        terms_conditions: "https://www.tamo.vn/privacy-policy",
        pivacy_policy: "https://www.tamo.vn/privacy-policy"
    },
    bannerImage: TamoBanner,
    steps: [{ title: "Thông tin\n cá nhân" }, { title: "Nghề nghiệp\n Thu nhập" }, { title: "Xác thực\n Danh tính" }],
    occupations: [
        { label: "Nhân viên chính thức", value: "Nhân viên chính thức" },
        { label: "Nhân viên làm việc không chính thức", value: "Nhân viên làm việc không chính thức" },
        { label: "Chủ doanh nghiệp", value: "Chủ doanh nghiệp" },
        { label: "Nghề tự do", value: "Nghề tự do" },
        { label: "Không làm việc", value: "Không làm việc" },
        { label: "Học sinh/sinh viên", value: "Học sinh/sinh viên" },
        { label: "Nhân viên bán thời gian", value: "Nhân viên bán thời gian" },
        { label: "Đã nghỉ hưu, đang công tác", value: "Đã nghỉ hưu, đang công tác" },
        { label: "Đã nghỉ hưu", value: "Đã nghỉ hưu" },
    ],
    job_fields: [
        { label: "Giáo dục/ Đào tạo", value: "Giáo dục/ Đào tạo" },
        { label: "Kinh doanh hộ gia đình", value: "Kinh doanh hộ gia đình" },
        { label: "Nhà máy, xí nghiệp", value: "Nhà máy, xí nghiệp" },
        { label: "Điện/Khí/ Nhiên liệu", value: "Điện/Khí/ Nhiên liệu" },
        { label: "Nông nghiệp", value: "Nông nghiệp" },
        { label: "Cảnh sát/ Quân đội/ An ninh", value: "Cảnh sát/ Quân đội/ An ninh" },
        { label: "Ngư nghiệp", value: "Ngư nghiệp" },
        { label: "Chăm sóc sức khỏe", value: "Chăm sóc sức khỏe" },
        { label: "Dịch vụ hậu cần/ Vận tải/ Taxi", value: "Dịch vụ hậu cần/ Vận tải/ Taxi" },
        { label: "Nghệ thuật/ Giải trí", value: "Nghệ thuật/ Giải trí" },
        { label: "Nhân viên văn phòng", value: "Nhân viên văn phòng" },
        { label: "Chính phủ", value: "Chính phủ" },
        { label: "Xây dựng", value: "Xây dựng" },
        { label: "Thương mại", value: "Thương mại" },
        { label: "Công nghệ thông tin/ Thiết kế Web", value: "Công nghệ thông tin/ Thiết kế Web" },
        { label: "Khác", value: "Khác" },
    ],
    personal_relations: [
        { label: "Chồng", value: "Chồng" },
        { label: "Vợ", value: "Vợ" },
        { label: "Mẹ ", value: "Mẹ " },
        { label: "Cha", value: "Cha" },
        { label: "Con trai", value: "Con trai" },
        { label: "Con gái", value: "Con gái" },
        { label: "Chị/Em gái", value: "Chị/Em gái" },
        { label: "Anh/Em trai", value: "Anh/Em trai" },
    ]
}