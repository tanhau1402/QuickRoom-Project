import React from "react";

function Footer(props) {
  return (
    <div>
      <footer className="flex justify-around p-5 border-b">
        <div className="footer-left ">
          <p className="mb-1 text-sm font-bold">Hỗ trợ</p>
          <p className="mb-1 text-sm font-extralight">Trung tâm trợ giúp</p>
          <p className="mb-1 text-sm font-extralight">AirCover</p>
          <p className="mb-1 text-sm font-extralight">Chống phân biệt đối xử</p>
          <p className="mb-1 text-sm font-extralight">
            Hỗ trợ người khuyết tật
          </p>
          <p className="mb-1 text-sm font-extralight">Các tùy chọn hủy</p>
          <p className="mb-1 text-sm font-extralight">
            Báo cáo lo ngại của khu dân cư
          </p>
        </div>
        <div className="footer-center ">
          <p className="mb-1 text-sm font-bold">Đón tiếp khách</p>
          <p className="mb-1 text-sm font-extralight">
            Cho thuê nhà trên Airbnb
          </p>
          <p className="mb-1 text-sm font-extralight">AirCover cho Chủ nhà</p>
          <p className="mb-1 text-sm font-extralight">
            Tài nguyên về đón tiếp khách
          </p>
          <p className="mb-1 text-sm font-extralight">Diễn đàn cộng đồng</p>
          <p className="mb-1 text-sm font-extralight">
            Đón tiếp khách có trách nhiệm
          </p>
          <p className="mb-1 text-sm font-extralight">Tham gia khóa học</p>
        </div>
        <div className="footer-right ">
          <p className="mb-1 text-sm font-bold">Airbnb</p>
          <p className="mb-1 text-sm font-extralight">Trang tin tức</p>
          <p className="mb-1 text-sm font-extralight">Tính năng mới</p>
          <p className="mb-1 text-sm font-extralight">Cơ hội nghề nghiệp</p>
          <p className="mb-1 text-sm font-extralight">Nhà đầu tư</p>
          <p className="mb-1 text-sm font-extralight">
            Chỗ ở khẩn cấp Airbnb.org
          </p>
        </div>
      </footer>
      <div className="final-footer  grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 p-5">
        <div className="left">
          <p className="font-thin">
            © 2024 Inc.·Quyền riêng tư·Điều khoản·Sơ đồ trang web
          </p>
        </div>
        <div className="a"></div>
        <div className="right text-end">
          <span className="me-2 font-thin">Tiếng Việt (VN)-VND</span>
          <i class="fa-brands fa-square-facebook text-xl me-1"></i>
          <i class="fa-brands fa-square-instagram text-xl me-1"></i>
          <i class="fa-brands fa-square-twitter text-xl"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer;
