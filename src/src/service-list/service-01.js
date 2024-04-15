import { Modal as BaseModal } from '@mui/base/Modal';
import { TextField } from '@mui/material';
import { Image } from "antd";
import { motion } from "framer-motion";
import { default as React, useState } from "react";
import { Link } from "react-router-dom";
import { fadeIn } from '../Animation/variants';
import { waveVariants } from "../Animation/waveVariants";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import Service2Image from "../images/service2-image.png";
import Service3Image from "../images/service3-image.png";
import BuildImage from "../images/vgbuild-image.png";
import DesignImage from "../images/vgdesign-image.png";
import './service-info.css';


const Service = () => {
   const [showModal, setShowModal] = useState(false);
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      note: ''
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      // Do something with formData
      handleCloseModal(); // Close modal after submission
  };

  const handleOpenModal = () => {
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
  };

   return (
      <>
         <HeaderComponent />
         <motion.div className="service1"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            exit={{ scaleX: 0, originX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
            <div className='service__image-banner'>
               {/* <Image
                  style={{ width: "100vw", height: "auto" }}
                  src={ProjectListBannerImage}
                  className='bg-white'
                  preview={false}
               /> */}
            </div>
            <div className='service__container'>
               <div className='header'>
                  <motion.div className='title'
                  variants={fadeIn('down', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>
                  

                     GÓI DỊCH VỤ
                  </motion.div>
                  <motion.div className='description'
                  variants={fadeIn('down', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>

                  

                     Thiết kế và thi công trọn gói căn hộ</motion.div>
                  <hr />
               </div>
               <div className="body">
               <div className="service1__content-head"
            style={{
               textAlign: 'center',
        fontSize: '30px',
        fontWeight: 600,
        marginTop: '20px'
            }}
            >
                     🌟  Một giải pháp thông minh cho những ai đang tìm kiếm sự chuyên nghiệp và sáng tạo trong việc thiết kế không gian sống !!! 🌟
                  </div>
                  
                  <div className="content">
                     <div className="content-01">
                        <div className="left-content">
                           <motion.div className="content-name"
                              variants={fadeIn('right', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}
                           >
                              VG DESIGN
                           </motion.div>
                           <motion.hr
                              variants={fadeIn('right', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}
                           />
                           <div className="content-desc">
                              Với đội ngũ kiến trúc sư tài năng và giàu kinh nghiệm, chúng tôi cam kết mang đến cho khách hàng những giải pháp độc đáo và phản ánh chính xác nhu cầu và phong cách của họ.<br />
                              Từ việc tư vấn thiết kế ban đầu đến việc triển khai dự án, chúng tôi luôn đảm bảo sự chăm sóc và hỗ trợ toàn diện, giúp khách hàng hoàn thiện mọi ý tưởng thành hiện thực một cách hoàn hảo nhất.<br />
                              Đặc biệt, dịch vụ cho thuê kiến trúc sư của chúng tôi linh hoạt và phù hợp với mọi quy mô dự án, từ nhỏ đến lớn, từ cá nhân đến doanh nghiệp. Hãy để chúng tôi làm điều kỳ diệu cho không gian của bạn!
                           </div>
                        </div>
                        <motion.div className="image"

                        >
                           <Image
                              style={{ width: "100vw", height: "600px", objectFit: "cover" }}
                              src={DesignImage}
                              className='bg-white'
                              preview={false}
                           />
                        </motion.div>
                     </div>
                     <div className="content-02">
                        <div className="left-content">
                           <motion.div className="content-name"
                              variants={fadeIn('left', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}

                           >
                              VG BUILD
                           </motion.div>
                           <motion.hr
                              variants={fadeIn('left', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}
                           />
                           <div className="content-desc">
                              Bắt đầu từ việc lắng nghe và hiểu rõ nhu cầu và mong muốn của khách hàng cùng với đội ngũ thiết kế sẽ tạo ra các bản vẽ và mô hình 3D để minh họa ý tưởng và thiết kế.<br />
                              Khi đạt được sự hài lòng về thiết kế, chúng tôi tiến hành chọn lựa các vật liệu và công nghệ sản xuất phù hợp nhất từ những mẫu mã sản phẩm cho tới các kỹ thuật lắp ráp.<br />
                              Quá trình sản xuất sản phẩm sẽ bắt đầu với sự chăm sóc tỉ mỉ từ việc cắt, gia công, và lắp ráp. Chúng tôi luôn tuân thủ các tiêu chuẩn chất lượng nghiêm ngặt để đảm bảo mỗi sản phẩm đều đạt được độ hoàn hảo cao nhất.<br />
                              Sau khi hoàn thành, đội ngũ kiểm tra chất lượng sẽ kiểm tra từng chi tiết để đảm bảo sản phẩm đáp ứng đúng các yêu cầu và tiêu chuẩn.
                           </div>
                        </div>
                        <motion.div className="image"

                        >
                           <Image
                              style={{ width: "100vw", height: "800px", objectFit: "cover" }}
                              src={BuildImage}
                              className='bg-white'
                              preview={false}
                           />
                        </motion.div>
                     </div>
                     <div className="content-03">
                        <div className="content-desc">
                           Cuối cùng, sản phẩm được giao đến khách hàng với sự chăm sóc và dịch vụ hậu mãi tốt nhất. Quy trình sản xuất nội thất của chúng tôi không chỉ đảm bảo sự chất lượng mà còn đem lại sự hài lòng tuyệt đối cho khách hàng.
                        </div>
                        <div>
                        {/* Nút để mở modal */}
                       
                        <motion.Button variant="contained" onClick={handleOpenModal} className="button" type="button"
                            variants={waveVariants}
                            animate="wave"
                        >
                            Nhận tư vấn báo giá
                        </motion.Button>

                        {/* Lớp overlay */}
                        {showModal && <div className="overlay" onClick={handleCloseModal}></div>}

                        {/* Modal */}
                        <BaseModal
                            open={showModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                            className="modal-container"
                        >
                            {/* Nội dung modal */}
                            <div className="modal">
                                <h2 id="modal-title" className="modal-title">Nhận tư vấn báo giá</h2>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        id="name"
                                        label="Họ và tên"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="phone"
                                        label="Số điện thoại"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="address"
                                        label="Địa chỉ"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        multiline
                                        rows={2}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        id="note"
                                        label="Ghi chú"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        multiline
                                        rows={4}
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <motion.button
                                        className="button"
                                        type="button"
                                        initial="hidden"
                                        whileInView={"show"}
                                        viewport={{ once: false, amount: 0.7 }}
                                    >
                                        <>Gửi yêu cầu</>
                                    </motion.button>
                                </form>
                            </div>
                        </BaseModal>
                    </div>
                        
                     </div>
                  </div>
                  <div className="footer">
                     <div className="other-service">
                        <div className="title">
                           CÁC DỊCH VỤ KHÁC
                        </div>
                        <hr />
                        <div className="list-services">
                           <div className="service-child">
                              <motion.div
                                 variants={fadeIn('right', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                              > <Image
                                    style={{ width: "200px", height: "200px" }}
                                    src={Service2Image}
                                    className='bg-white'
                                    preview={false}
                                 /></motion.div>
                              <div className="info">
                                 <motion.div className="text"

                                    variants={fadeIn('down', 0.2)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: false, amount: 0.7 }}

                                 >
                                    Tư vấn thiết kế sang trọng, đẹp mắt và nhanh chóng ...
                                 </motion.div>
                                 <motion.button
                                    className="button"
                                    type="button"
                                    variants={fadeIn('up', 0.2)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: false, amount: 0.7 }}
                                 >
                                    <Link to="/service/02">ĐỌC THÊM</Link>
                                 </motion.button>
                              </div>
                           </div>
                           <div className="service-child">
                              <motion.div
                                 variants={fadeIn('right', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                              >
                                 <Image
                                    style={{ width: "200px", height: "200px" }}
                                    src={Service3Image}
                                    className='bg-white'
                                    preview={false}
                                 />
                              </motion.div>
                              <div className="info">
                                 <motion.div className="text"
                                    variants={fadeIn('down', 0.2)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: false, amount: 0.7 }}
                                 >
                                    Tư vấn thi công nhanh chóng <br />(không cần thiết kế)
                                 </motion.div>
                                 <motion.button
                                    className="button"
                                    type="button"
                                    variants={fadeIn('up', 0.2)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: false, amount: 0.7 }}
                                 >
                                    <Link to="/service/03">ĐỌC THÊM</Link>
                                 </motion.button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </motion.div>
         <FooterComponent />
      </>
   )
};

export default Service;