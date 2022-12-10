import logo from '@/assets/img/ptf.svg';
import background from '@/assets/img/mafc_bg.png';
import banner from '@/assets/img/ptf_banner.png';

const data = {
    logo,
    background,
    banner,
    headerColor: "#004179",
    offer_id: "ptf",
    thanks: "Cảm ơn bạn đã đăng ký hồ sơ tại PTF. Chúng tôi sẽ liên hệ để tư vấn trong thời gian sớm nhất",
    loan_amounts: {
        options: [
            { label: "10 triệu", value: "10 triệu" },
            { label: "12 triệu", value: "12 triệu" },
            { label: "15 triệu", value: "15 triệu" },
            { label: "18 triệu", value: "18 triệu" },
            { label: "20 triệu", value: "20 triệu" },
            { label: "25 triệu", value: "25 triệu" }
        ],
        placeholder: "Số tiền bạn cần"
    },
    borrow_times: {
        options: [
            { label: "6 tháng", value: "6 tháng" },
            { label: "12 tháng", value: "12 tháng" },
            { label: "18 tháng", value: "18 tháng" },
            { label: "24 tháng", value: "24 tháng" },
            { label: "30 tháng", value: "30 tháng" },
            { label: "36 tháng", value: "36 tháng" }
        ],
        placeholder: "Thời gian vay"
    },
    assets: {
        options: [
            { label: "Bảng sao kê lương", value: "Bảng sao kê lương" },
            { label: "Sao kê tài khoản ngân hàng", value: "Sao kê tài khoản ngân hàng" },
            { label: "Hợp đồng bảo hiểm", value: "Hợp đồng bảo hiểm" },
            { label: "Hóa đơn tiền điện", value: "Hóa đơn tiền điện" },
            { label: "Đăng kí xe ô tô/mô tô", value: "Đăng kí xe ô tô/mô tô" },
            { label: "Thẻ tín dụng ngân hàng", value: "Thẻ tín dụng ngân hàng" },
            { label: "Hợp đồng tín dụng tại công ty tài chính khác", value: "Hợp đồng tín dụng tại công ty tài chính khác" }
        ],
        placeholder: "Giấy tờ cung cấp"
    }
}

export default data;