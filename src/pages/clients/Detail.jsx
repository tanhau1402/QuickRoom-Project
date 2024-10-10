import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

function Detail(props) {
    const { id } = useParams();
    const [room, setRoom] = useState({ imgUrls: [] });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const roomDoc = doc(db, "listRooms", id);
                const roomSnap = await getDoc(roomDoc);

                if (roomSnap.exists()) {
                    setRoom(roomSnap.data()); // Lưu dữ liệu vào state
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching room data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomData();
    }, [id]);
    return (
        <div>
            <div className="card-title container mx-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-2 p-4 mt-4">
                <div className="left flex justify-start  ">
                    <i class="fa-solid fa-house text-xl me-2"></i>
                    <p className="font-sans text-2xl">
                        Ở trong ngôi nhà Purple Rain của Prince
                    </p>
                </div>
                <div className="group-action flex justify-end me-3">
                    <div className="act-1 me-5 text-xl   hover:text-blue-800 cursor-pointer">
                        <i class="fa-regular fa-share-from-square hover:scale-150 duration-300  me-1"></i>
                        Share
                    </div>
                    <div className="act-2 text-xl hover:text-red-800 cursor-pointer">
                        <i class="fa-regular fa-heart me-1 hover:scale-150 duration-300  "></i>
                        <span>Like</span>
                    </div>
                </div>
            </div>
            <div className="image-box container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5">
                {/* Hình ảnh lớn bên trái */}
                <div className="box-left">
                    <img
                        className="w-full hover:scale-105 duration-300   rounded-2xl"
                        style={{ height: "415px" }}
                        src={room.imgUrls[0]}
                        alt=""
                    />
                </div>
                {/* Hình ảnh nhỏ bên phải */}
                <div className="box-right grid grid-cols-2 gap-2">
                    {/* Hình trên */}
                    <div className="top-left flex flex-col gap-2">
                        <img
                            className="w-full hover:scale-105 duration-300 h-auto rounded-tl-2xl "
                            src={room.imgUrls[1]}
                            alt=""
                        />
                        <img
                            className="w-full hover:scale-105 duration-300 h-auto rounded-bl-2xl "
                            src={room.imgUrls[2]}
                            alt=""
                        />
                    </div>

                    {/* Hình dưới */}
                    <div className="bottom-left flex flex-col gap-2">
                        <img
                            className="w-full hover:scale-105 duration-300 h-auto rounded-tr-2xl"
                            src={room.imgUrls[3]}
                            alt=""
                        />
                        <img
                            className="w-full hover:scale-105 duration-300 h-auto rounded-br-2xl"
                            src={room.imgUrls[4]}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="container r grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto p-5 gap-5  ">
                <div className="main-left">
                    <div class="header">
                        <p className="text-2xl font-bold me-3">
                            Minneapolis, Minnesota, Hoa Kỳ
                        </p>
                        <p className="text-2xl text-green-700 font-light me-3">
                            {room.available}
                        </p>

                        <hr className="mt-2 mb-2" />
                        <p className="text-xl font-semibold">Thông tin phòng :</p>
                        <p className="text-lg font-mono text-gray-600">
                            <i class="fa-solid fa-person text-2xl me-2"></i>
                            {room.persons} khách
                        </p>
                        <p className="text-lg font-mono text-gray-600">
                            <i class="fa-solid fa-dollar-sign text-2xl me-2"></i>
                            {room.price_per_night} USD/đêm
                        </p>
                        <p className="text-lg font-mono text-gray-600">
                            <i class="fa-solid fa-paw text-2xl me-2"></i>
                            {room.animals ? "Cho nuôi thú cưng" : "Không cho nuôi thú cưng"}
                        </p>
                        <hr className="mt-2 mb-2" />
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
                    <div className="user-info">
                        <hr className="mt-7" />
                        <p className="text-2xl mt-8 mb-5">Gặp gỡ Chủ nhà</p>
                        <div className="wrap hover:scale-110 duration-300 text-center w-96 bg-white-600 h-auto p-4 rounded-2xl shadow-2xl">
                            <div className="relative">
                                <img
                                    src="https://a0.muscache.com/im/pictures/user/User-571409646/original/ea5debfb-2394-444c-ae7a-e30e13363e59.jpeg?im_w=240"
                                    alt="Avatar"
                                    class="w-24 h-24 rounded-full mx-auto"
                                />
                                <i style={{ right: "117px" }} class="fa-solid absolute bottom-2  text-3xl text-pink-600  fa-circle-check"></i>
                            </div>
                            <p className="font-semibold text-xl">Wendy And Lisa</p>
                            <p className="font-extralight">Bắt đầu đón tiếp khách từ năm 2024</p>
                        </div>
                        <div className="user-list mt-4">
                            <div className="job mb-3 ">
                                <i class="fa-solid fa-briefcase me-3 text-2xl text-gray-600"></i>
                                <span className="font-extralight text-lg">Công việc của tôi: Nghệ sĩ âm nhạc/Nhạc sĩ</span>
                            </div>
                            <div className="language mb-3 text-2xl ">
                                <i class="fa-solid fa-language me-3 text-gray-600"></i>
                                <span className="font-extralight text-lg">Nói Tiếng Anh</span>
                            </div>
                            <div className="living mb-3 text-2xl">
                                <i class="fa-solid fa-earth-americas me-3 text-gray-600"></i>
                                <span className="font-extralight text-lg"> Sống tại Los Angeles, California</span>
                            </div>
                            <div className="user-des font-thin">
                                Xin chào! Chúng tôi là Wendy và Lisa. Chúng tôi là bộ đôi âm nhạc từng đoạt giải thưởng, những người bạn từ thuở nhỏ, và thành viên đáng tự hào của ban nhạc rock huyền thoại The Revolution. Hồi những năm 1980, chúng tôi đã hợp tác với người bạn thân, cũng là trưởng nhóm Revolution, Prince, để đưa ca khúc và bộ phim "Purple Rain" trứ danh trở thành hiện thực. Chúng tôi vô cùng háo hức khi được ngược dòng thời gian về nơi chứng kiến tất cả, và chia sẻ với bạn những kỷ niệm còn kỳ diệu hơn nữa!
                            </div>
                        </div>
                        <hr className="mt-7" />
                    </div>
                    <div className="bed-room mt-7">
                        <span className="text-2xl mt-8 mb-5">Nơi bạn sẽ ngủ nghỉ</span>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-5">
                            <div className="room-1 ">
                                <img
                                    className="w-full h-auto mb-3 rounded-2xl"
                                    src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                                    alt=""
                                />
                                <p className="font-medium text-lg ">Phòng ngủ 1</p>
                                <span className="font-extralight">1 giường queen</span>
                            </div>
                            <div className="room-2 ">
                                <img
                                    className="w-full h-auto mb-3 rounded-2xl"
                                    src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                                    alt=""
                                />
                                <p className=" font-medium text-lg ">Phòng ngủ 2</p>
                                <span className="font-extralight">1 giường đôi</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-right ">
                    <div class="bg-gray-200 p-4 rounded-lg">
                        <p class="text-center text-gray-700 font-bold">
                            Nhận đặt phòng
                        </p>
                        <button class="mt-4 w-full hover:scale-105 duration-300 hover:bg-green-500 bg-gray-400 text-white py-2 rounded-lg">
                            Yêu cầu
                        </button>
                    </div>
                </div>
            </div>
            <div className="highlight container  mx-auto p-5 gap-5 ">
                <hr className="mb-4" />
                <p className="font-semibold mb-3">Điểm nổi bật trong khu vực</p>
                <p className="font-extralight">Bạn muốn biết mình sẽ đến đâu?? Bạn sẽ có mặt tại CHÍNH căn nhà Purple Rain nơi quê nhà của The Kid, ở Minneapolis, Minnesota! CHÍNH là nơi đó. Chúng tôi đã trang hoàng cho nơi này như một địa điểm tưởng nhớ di sản bất hủ của người bạn của chúng tôi, cũng như bộ phim kinh điển được nhiều người yêu mến. Hãy sẵn sàng để cảm nhận phép màu của The Kid trong sắc tím hoàng gia thời đỉnh cao.</p>
                <hr className="mt-6" />
            </div>
            <div className="booking container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 p-5">
                <div className="box-1">
                    <i class="fa-regular fa-envelope text-3xl"></i>
                    <p className="font-semibold mt-1 mb-1">Yêu cầu đặt phòng</p>
                    <p className="font-extralight">Chọn ngày mong muốn, thêm khách, sau đó trả lời câu hỏi về lý do bạn muốn đi.</p>
                </div>
                <div className="box-2">
                    <i class="fa-regular fa-circle-check text-3xl"></i>
                    <p className="font-semibold mt-1 mb-1">Quy trình lựa chọn</p>
                    <p className="font-extralight">Trước tiên, chúng tôi sẽ chọn ngẫu nhiên một nhóm khách tiềm năng. Tiếp theo, chúng tôi sẽ xem xét câu trả lời của nhóm khách này để rút ra những quan điểm và cảm nhận riêng của họ về nơi ở biểu tượng. Sau đó, chúng tôi sẽ mời những khách được chọn đặt phòng..</p>
                </div>
                <div className="box-3">
                    <i class="fa-regular fa-address-card text-3xl"></i>
                    <p className="font-semibold mt-1 mb-1">Yêu cầu cần đáp ứng</p>
                    <p className="font-extralight">Để tham gia, bạn phải có tài khoản Airbnb đang hoạt động và đã tải ứng dụng; đồng thời, bạn phải là cư dân của một quốc gia hoặc khu vực hợp lệ. Việc gửi yêu cầu là hoàn toàn miễn phí.</p>
                </div>
            </div>
            <div className="terms container mx-auto p-5">
                <hr className="mb-4" />
                <p className="text-sm font-light text-gray-500">Nếu bạn được chọn và quyết định đặt phòng, bạn sẽ có 24 giờ để hoàn tất giao dịch. Không bao gồm chi phí đi lại. Vui lòng tham khảo <br /> quy tắc đầy đủ, bao gồm quy định về độ tuổi và vị trí địa lý đủ điều kiện, cách thức dữ liệu sẽ được sử dụng, xác suất được chọn và các <br /> điều khoản khác.</p>
                <hr className="mt-4" />
            </div>
            <div className="clauses container mx-auto   p-5">
                <p className="text-2xl font-semibold">Những điều cần biết</p>
                <div className="clauses-item grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                    <div className="clauses-1 mt-5">
                        <p className="font-bold mb-2">Nội quy nhà</p>
                        <p className="mb-2">Nhận phòng sau 16:00</p>
                        <p className="mb-2">Trả phòng trước 11:00</p>
                        <p>Tối đa 4 khách</p>
                    </div>
                    <div className="clauses-2 mt-5">
                        <p className="font-bold mb-2">An toàn và chỗ ở</p>
                        <p className="mb-2">Chỗ ở có camera an ninh ngoài nhà</p>
                        <p className="mb-2">Máy phát hiện khí CO</p>
                        <p>Máy báo khói</p>
                    </div>
                </div>
                <hr className="mt-5 mb-3" />
            </div>
        </div>
    );
}

export default Detail;
