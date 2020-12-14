import React from "react";
import { Header } from "semantic-ui-react";
import "./style.css";
const Faqs = () => {
    document.title = "Faqs"
  return (
    <div>
      <Header as="h2" textAlign="center" content="FAQS" className="s-text3" />
      <p className="s-text4">1. Tôi có thể xem dung tích chai ở đâu?</p>
      <p className="s-text5">
        Ở mỗi trang chi tiết sản phẩm đều có bảng size áo, bạn có thể kéo xuống
        bên dưới mục mô tả để tìm size áo phù hợp với mình.
      </p>
      <p className="s-text4">2. Bao lâu thì tôi nhận được hàng?</p>
      <p className="s-text5">
        Tùy thuộc vào khu vực mà có thoừi gian nhận hàng khác nhau:
      </p>
      <p className="s-text5">- Ở TP.Hồ Chí Minh, từ 1-2 ngày</p>
      <p className="s-text5">- Ở khu vực khác, từ 3-5 ngày</p>
      <p className="s-text4">3. Tôi cần làm gì nếu muốn đổi trả hàng?</p>
      <p className="s-text5">
        Trong trường hợp muốn đổi hoặc trả hàng, bạn vui lòng nhắn tin đến fan
        page hoặc gọi đến số 0892 565 223.
      </p>
      <p className="s-text4">4. Bạn có phải mất phí đổi trả hàng không?</p>
      <p className="s-text5">Chúng tôi sẽ chịu 100% chi phí đổi trả hàng</p>
      <p className="s-text4">5. Tôi làm gì nếu không nhận được hàng?</p>
      <p className="s-text5">
        Bạn vui lòng liên hệ với chúng tôi nếu không nhận được hàng sau 1 tuần
        kể từ lúc đặt hàng. Chúng tôi sẽ kiểm tra lại, giúp bạn biết đơn hàng
        của bạn đang ở đâu hoặc giao sản phẩm mới đến cho bạn.
      </p>
    </div>
  );
};

export default Faqs;
