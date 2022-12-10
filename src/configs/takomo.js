import Logo from '@/assets/img/takomo.svg';
import TamoBanner from '@/assets/img/tamo_banner.png';//
import BannerMobile from '@/assets/img/takomo_banner_mobile.png';
import BackgroundForm from '@/assets/img/takomo_bg.png';
import { PhoneOutlined, FieldTimeOutlined, MailFilled } from '@ant-design/icons';
import moment from 'moment';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    logo: Logo,
    backgroundForm: BackgroundForm,
    bannerMobile: BannerMobile,
    primaryColor: "#594DC9",
    steps: [{ title: "Thông tin\n cá nhân" }, { title: "Nơi cư trú và\n làm việc" }, { title: "Người thân\n đồng nghiệp" }, { title: "Xác thực\n danh tính" }],
    resident_time: [
        { label: "0 - 1 năm", value: "0 - 1 năm" },
        { label: "1 - 2 năm", value: "1 - 2 năm" },
        { label: "2 - 3 năm", value: "2 - 3 năm" },
        { label: "3 - 4 năm", value: "3 - 4 năm" },
        { label: "4 - 5 năm", value: "4 - 5 năm" },
        { label: "5 - 6 năm", value: "5 - 6 năm" },
        { label: "6 - 7 năm", value: "6 - 7 năm" },
        { label: "7 - 8 năm", value: "7 - 8 năm" },
        { label: "8 - 9 năm", value: "8 - 9 năm" },
        { label: "9 - 10 năm", value: "9 - 10 năm" },
        { label: "Nhiều hơn 10 năm", value: "Nhiều hơn 10 năm" }

    ],
    marital_status: [
        { label: "Cưới nhau", value: "Cưới nhau" },
        { label: "Đã ly hôn", value: "Đã ly hôn" },
        { label: "Độc thân", value: "Độc thân" },
        { label: "Góa vợ", value: "Góa vợ" },
    ],
    jobs: [
        { label: "Bán thời gian", value: "Bán thời gian" },
        { label: "Thất nghiệp", value: "Thất nghiệp" },
        { label: "Chủ doanh nghiệp", value: "Chủ doanh nghiệp" },
        { label: "Doanh nhân", value: "Doanh nhân" },
        { label: "Giám đốc", value: "Giám đốc" },
        { label: "Nhân viên văn phòng", value: "Nhân viên văn phòng" },
        { label: "Nhân viên", value: "Nhân viên" },
    ],
    job_fields: [
        { label: "Nội trợ", value: "Nội trợ" },
        { label: "Cảnh sát", value: "Cảnh sát" },
        { label: "Quân đội", value: "Quân đội" },
        { label: "Thất nghiệp", value: "Thất nghiệp" },
        { label: "Sinh viên", value: "Sinh viên" },
        { label: "Về hưu", value: "Về hưu" },
        { label: "Lĩnh vực tín dụng / Bảo hiêm", value: "Lĩnh vực tín dụng / Bảo hiêm" },
        { label: "Tài chính / Bất động sản", value: "Tài chính / Bất động sản" },
        { label: "Xây dựng", value: "Xây dựng" },
        { label: "Công nghệ thông tin", value: "Công nghệ thông tin" },
        { label: "Giáo dục", value: "Giáo dục" },
        { label: "Chăm sóc sức khoẻ", value: "Chăm sóc sức khoẻ" },
        { label: "Dịch vụ khách sạn", value: "Dịch vụ khách sạn" },
        { label: "Chế tạo", value: "Chế tạo" },
        { label: "Bán hàng và marketing", value: "Bán hàng và marketing" },
        { label: "Dịch vụ ăn uống", value: "Dịch vụ ăn uống" },
        { label: "Dịch vụ vận tải", value: "Dịch vụ vận tải" },
        { label: "Bán lẻ", value: "Bán lẻ" },
        { label: "Khác", value: "Khác" },
    ],
    working_time: [
        { label: "0 - 1 năm", value: "0 - 1 năm" },
        { label: "1 - 2 năm", value: "1 - 2 năm" },
        { label: "2 - 3 năm", value: "2 - 3 năm" },
        { label: "3 - 4 năm", value: "3 - 4 năm" },
        { label: "4 - 5 năm", value: "4 - 5 năm" },
        { label: "5 - 6 năm", value: "5 - 6 năm" },
        { label: "6 - 7 năm", value: "6 - 7 năm" },
        { label: "7 - 8 năm", value: "7 - 8 năm" },
        { label: "8 - 9 năm", value: "8 - 9 năm" },
        { label: "9 - 10 năm", value: "9 - 10 năm" },
        { label: "Nhiều hơn 10 năm", value: "Nhiều hơn 10 năm" }
    ],
    income_range: [
        { label: "Không có thu nhập", value: "Không có thu nhập" },
        { label: "1,5 - 3 triệu đồng", value: "1,5 - 3 triệu đồng" },
        { label: "3 - 5 triệu đồng", value: "3 - 5 triệu đồng" },
        { label: "5 - 7 triệu đồng", value: "5 - 7 triệu đồng" },
        { label: "7 - 9 triệu đồng", value: "7 - 9 triệu đồng" },
        { label: "9 - 11 triệu đồng", value: "9 - 11 triệu đồng" },
        { label: "11 - 15 triệu đồng", value: "11 - 15 triệu đồng" },
        { label: "15 - 20 triệu đồng", value: "15 - 20 triệu đồng" },
        { label: "Trên 20 triệu đồng", value: "Trên 20 triệu đồng" },
    ],
    personal_relations: [
        { label: "Vợ / Chồng", value: "Vợ / Chồng" },
        { label: "Mẹ ", value: "Mẹ " },
        { label: "Bố", value: "Bố" },
        { label: "Anh trai", value: "Anh trai" },
        { label: "Em gái", value: "Em gái" },
        { label: "Khác", value: "Khác" },
    ]
}