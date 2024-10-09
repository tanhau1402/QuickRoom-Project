import React from "react";
import { useParams } from "react-router-dom";


function Detail(props) {
    const { id } = useParams();

    console.log(id);
    return (
        <div>
            <div className="card-title mx-auto flex justify-around p-4">
                <div className="left flex  ">
                    <i class="fa-solid fa-house text-xl"></i>
                    <p className="font-light text-2xl">
                        Ở trong ngôi nhà Purple Rain của Prince
                    </p>
                </div>
                <div className="group-action flex">
                    <div className="act-1 me-3">
                        <i class="fa-regular fa-share-from-square"></i>
                        Share
                    </div>

                    <div className="act-2">
                        <i class="fa-regular fa-heart"></i>
                        Like
                    </div>
                </div>
            </div>
            <div className="image-box container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5">
                {/* Hình ảnh lớn bên trái */}
                <div className="box-left">
                    <img
                        className="w-full   rounded-2xl"
                        style={{ height: "415px" }}
                        src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                        alt=""
                    />
                </div>

                {/* Hình ảnh nhỏ bên phải */}
                <div className="box-right grid grid-cols-2 gap-2">
                    {/* Hình trên */}
                    <div className="top-left flex flex-col gap-2">
                        <img
                            className="w-full h-auto rounded-tl-2xl "
                            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                            alt=""
                        />
                        <img
                            className="w-full h-auto rounded-bl-2xl "
                            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                            alt=""
                        />
                    </div>

                    {/* Hình dưới */}
                    <div className="bottom-left flex flex-col gap-2">
                        <img
                            className="w-full h-auto rounded-tr-2xl"
                            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                            alt=""
                        />
                        <img
                            className="w-full h-auto rounded-br-2xl"
                            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="container grid-container mx-auto p-5 gap-5  ">
                <div className="main-left">
                    <div class="header">
                        <p className="text-2xl font-bold me-3">
                            Minneapolis, Minnesota, Hoa Kỳ
                        </p>
                        <p className="text-sm text-gray-600">
                            4 khách · 2 phòng ngủ · 2 giường · 2 phòng tắm
                        </p>
                    </div>

                    <div class="host flex items-center space-x-2 mt-3">
                        <img
                            src="https://a0.muscache.com/im/pictures/user/User-571409646/original/ea5debfb-2394-444c-ae7a-e30e13363e59.jpeg?im_w=240"
                            alt="Avatar"
                            class="w-10 h-10 rounded-full"
                        />
                        <span>Chủ nhà/Người tổ chức: Wendy And Lisa</span>
                    </div>

                    <div class="amenities flex flex-wrap gap-2 mt-3">
                        <div class="bg-blue-100 p-2 rounded">
                            <span>Tham quan ngôi nhà Purple Rain ngoài đời</span>
                        </div>
                    </div>

                    <div class="description text-gray-700 mt-3">
                        Purple Rain là bộ phim vĩ đại nhất mọi thời đại. Đây không phải là quan điểm, mà là sự thực. Giờ đây, 40 năm kể từ ngày công chiếu, chúng tôi sẽ tái hiện bộ phim này. Không chỉ chọn ngôi nhà thời thơ ấu khó quên của The Kid, mà chúng tôi còn khôi phục nội thất bên trong, đưa căn nhà trở lại thời vàng son thuở nào. Toàn bộ công trình là sự tưởng nhớ, hay đúng hơn là sự tôn vinh, đến cả bản thân bộ phim và khoảnh khắc đã đưa Prince lên đỉnh cao. Vì nếu chỉ nói về một trong hai điều này là chưa đủ. Thú vị phải không? Chắc chắn rồi. <br />

                        Những hoạt động dành cho bạn
                        Không dám khoe khoang, nhưng chúng tôi thực sự đã vượt qua chính mình. Nơi này chất đầy những kỷ vật mang tính lịch sử, sẽ cho bạn cơ hội hiếm hoi được quan sát quá trình sáng tạo của Prince từ kỷ nguyên Purple Rain – dưới cái nhìn của hai con người đã trực tiếp trải qua (chính chúng tôi!). Vậy thì, để khám phá những gì diễn ra trong bộ óc của người nghệ sĩ, còn cách nào hay hơn là lắng nghe bộ sưu tập băng nhạc cá nhân của Prince, ngắm nhìn những bộ trang phục mà ông từng mặc, rồi thưởng thức kho tàng mùi hương chọn lọc, gồm những loại nước hoa ông yêu thích nhất? Những điều đó, cùng với dấu ấn thập niên 1980 đậm nét trong từng hơi thở. Xin mời bạn. <br />

                        Hãy cùng thỏa sức khám phá nhé? <br />

                        • Đó vẫn là thế giới của The Kid, và bạn đang được sống trong đó. Không gian tầng dưới được trang trí với giấy dán tường màu tím thẫm và hệ thống âm thanh nổi cổ điển từ thập niên 1980, được nạp sẵn những bài hát đã truyền cảm hứng cho The Kid. Thậm chí còn có một chiếc ghế sofa họa tiết da báo để bạn có thể xem bộ phim Purple Rain theo một phong cách thật ngầu. Quét mã QR để xem chú giải và thông tin chuyên sâu riêng của chúng tôi. Bạn sẽ thích những thông tin này. <br />

                        • Thư giãn trong phòng spa được trang trí để tưởng nhớ một trong những video nhạc mà chúng tôi yêu thích nhất: "When Doves Cry". Bồn tắm chân móng vuốt? Có. Cửa sổ kính màu? Cũng có. Khoác lên người bộ áo choàng tắm màu tím sang trọng, đắp mặt nạ thư giãn, ném vào bồn tắm vài viên bom tắm mùi oải hương, vậy là bạn đã trở thành những ông hoàng, bà hoàng thực thụ. <br />

                        • Chiêm ngưỡng kỳ quan trong căn nhà – tủ quần áo. Những bộ trang phục huyền thoại nhất của Prince được trưng bày sau lớp kính – không được chạm vào, mà chỉ có thể ngắm nhìn. Nhưng nếu bạn muốn ướm thử phần nào, thì chúng tôi đã chuẩn bị một bộ sưu tập các loại trang phục lấy cảm hứng thập niên 1980, để siêu sao nhạc rock bên trong bạn có dịp được bộc lộ (dĩ nhiên có cả tóc giả, phụ kiện và đồ trang điểm mắt). <br />

                        • Bạn có muốn thử không? Ghé thăm phòng cảm hứng. Dù bạn thích gảy đàn nhẹ nhàng, vỗ thùng đàn, khoe kỹ thuật điêu luyện trên guitar hay khiến cả thế giới mê đắm với giọng giả thanh tuyệt đỉnh, chúng tôi cũng sẽ giới thiệu cho bạn một ứng dụng sẽ dạy bạn cách chơi (hoặc hát) nhạc phẩm "Purple Rain". <br />

                        • Phần tuyệt nhất của căn nhà chính là không gian bí mật – nếu bạn tìm được. Hãy kích hoạt cánh cửa bí mật vào căn phòng đầy những món đồ trân quý (chúng tôi không bật mí cách mở đâu). Đặc biệt, bìa album giả vinyl có chứa 7 manh mối. Nếu bạn trả lời đúng 7 câu hỏi này, một thế giới hạnh phúc bất tận sẽ mở ra. <br />

                        • Ngon giấc như Prince trong phòng ngủ của The Kid, được trang hoàng y hệt như trong bộ phim. Hoặc thức để khám phá bộ sưu tập băng nhạc cá nhân của ông, bao gồm một trong những bản thu âm thử chính gốc của Prince. <br />
                    </div>
                    .
                </div>
                <div className="main-right ">
                    <div class="bg-gray-200 p-4 rounded-lg">
                        <p class="text-center text-gray-700 font-bold">
                            Đã dừng nhận đặt phòng
                        </p>
                        <button class="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg">
                            Yêu cầu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
