import { SafetyCertificateOutlined, SaveOutlined, StarOutlined, FileTextOutlined, UserSwitchOutlined, CreditCardOutlined, ClusterOutlined } from '@ant-design/icons';

import moneyIcon from '@/assets/icons/money.svg';
import walletIcon from '@/assets/icons/wallet.svg';
import lotte from '@/assets/img/lotte.svg';
import robocash from '@/assets/img/robocash.svg';
import mafc from '@/assets/img/miraeasset.svg';
import atm_online from '@/assets/img/atm_online.svg';
import shinhan from '@/assets/img/shinhan.svg';
import vib from '@/assets/img/vib.svg';
import mcredit from '@/assets/img/mcredit.svg';
import ptf from '@/assets/img/ptf.svg';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    partner: {
        heading: "Đối tác của chúng tôi",
        logo: [lotte, mafc, robocash, atm_online, shinhan, mcredit, vib, ptf],
        more: "Xem thêm"
    },
    safety_security: {
        heading: "An toàn và bảo mật",
        items: [
            {
                icon: <SafetyCertificateOutlined />,
                description: "Thông tin bảo mật,\n an toàn tuyệt đối"
            },
            {
                icon: <SaveOutlined />,
                description: "Lưu trữ bởi Credit.vn,\n không có bên thứ 3"
            },
            {
                icon: <StarOutlined />,
                description: "Đối tác minh bạch,\n chuyên nghiệp"
            },
            {
                icon: <FileTextOutlined />,
                description: "Cam kết chịu trách nhiệm"
            }
        ]
    },
    system: {
        heading: "Hệ thống của chúng tôi",
        top_heading: "Sử dụng công nghệ AI",
        items: [
            {
                icon: <UserSwitchOutlined />,
                heading: "Đem thông tin người dùng vào hệ thống"
            },
            {
                icon: <CreditCardOutlined />,
                heading: "Đánh giá điểm tín dụng dựa trên lịch sử tín dụng, tiêu dùng"
            },
            {
                icon: <ClusterOutlined />,
                heading: "Phân loại những đối tác phù hợp nhất với khách hàng"
            }
        ],
        bottom_heading: "Giúp khách hàng giảm tối thiểu thời gian chờ duyệt và hoàn tất thủ tục"
    },
    general: [
        {
            heading: "Lãi suất thấp, giải ngân nhanh",
            icon: moneyIcon,
            description: "Vì khách hàng đã được Credit.vn chọn lọc đối tác dịch vụ phù hợp, vì thế tỉ lệ đối tác chấp nhận lên đến 80% với lãi suất 1.67%/ tháng"
        },
        {
            heading: "Không cần chứng minh thu nhập",
            icon: walletIcon,
            description: "Đến với Credit.vn bạn không cần chứng minh thu nhập vì bạn được đảm bảo bởi công nghệ độc quyền của Credit.vn đã hỗ trợ sàng lọc và kiểm duyệt thông tin khách hàng."
        }
    ]
}