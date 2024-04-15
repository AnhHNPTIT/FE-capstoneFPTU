import { Modal as BaseModal } from '@mui/base/Modal';
import { TextField } from '@mui/material';
import { Image } from "antd";
import { motion } from "framer-motion";
import { default as React, useState } from "react";
import { Link } from "react-router-dom";
import Video from '../../src/videos/VideoXuong1.mp4';
import { fadeIn } from "../Animation/variants";
import { waveVariants } from "../Animation/waveVariants";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import Service3K from "../images/Service3.0.png";
import Service3kh from "../images/Service3.1.png";
import Service1Image from "../images/service1-image.png";
import Service3Image from "../images/service3-image.png";
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
         <motion.div className="service3"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            exit={{ scaleX: 0, originX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
           
            <div className='service__container'>
               <div className='header'>
                  <motion.div className='header title'
                  variants={fadeIn('down', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>
                  
                     GÓI DỊCH VỤ
                  </motion.div>
                  <motion.p className='service3__content-head'
                  style={{
               textAlign: 'center',
        fontSize: '30px',
        fontWeight: 600,
        marginTop: '20px'
        
            }}
            variants={fadeIn('down', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>
                  🌟 Đăng ký báo giá xây dựng dựa trên các thiết kế tiêu chuẩn 🌟</motion.p>
                  <hr />
               </div>
               <div className="body">
                  <div className="service-intro">
                     <div className="title">
                        GIỚI THIỆU DỊCH VỤ
                     </div>
                     <div className="content">
                        Dịch vụ đăng kí báo giá xây dựng dựa trên các thiết kế tiêu chuẩn là giải pháp giúp bạn dễ dàng dự trù chi phí cho công trình của mình. Với dịch vụ này, bạn chỉ cần cung cấp thông tin về loại công trình, diện tích, thiết kế tiêu chuẩn mong muốn, hệ thống sẽ tự động tính toán và báo giá chi tiết các hạng mục thi công.
                     </div>
                  </div>
                  <div className="service-video">
                     <div className="title">
                        Quá trình sản xuất trực tiếp tại xưởng
                     </div>
                     <div className="video">
                        <video autoPlay loop muted style={{ width: '100%', height: '80%' }}>
                           <source src={Video} type='video/mp4'></source>
                        </video></div>
                  </div>
                  <div className="service-benefit">
                     <div className="title">LỢI ÍCH</div>
                     <div className="text">
                        - <b>Tiết kiệm thời gian:</b> So với việc liên hệ trực tiếp với các nhà thầu để lấy báo giá, dịch vụ này giúp bạn tiết kiệm được rất nhiều thời gian.<br />
                        - <b>So sánh giá cả dễ dàng:</b> Hệ thống sẽ cung cấp báo giá từ nhà thầu Vu Gia, giúp bạn dễ dàng so sánh và lựa chọn nhà thầu phù hợp.<br />
                        - <b>Dự trù chi phí chính xác:</b> Báo giá được cung cấp dựa trên các thiết kế tiêu chuẩn, giúp bạn dự trù chi phí cho công trình một cách chính xác hơn.<br />
                        - <b>Minh bạch và rõ ràng:</b> Hệ thống cung cấp báo giá chi tiết từng hạng mục thi công, giúp bạn nắm rõ chi phí cho công trình của mình.
                     </div>
                     <div className="images">
                        <motion.div className="img"
                        whileHover={{
                                 scale: 1.1,
                                 boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                                 border: "2px solid rgba(0, 0, 0, 0.1)",
                                 filter: "brightness(100%)" // Tăng độ sáng khi trỏ chuột vào
                              }}
                              initial={{
                                 scale: 1,
                                 boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                                 border: "2px solid rgba(0, 0, 0, 0.05)",
                                 filter: "brightness(50%)" // Đặt độ tối ban đầu của ảnh
                              }}
                              transition={{ duration: 0.3 }}
                        >
                           <Image
                              style={{ width: "100vw", height: "auto" }}
                              src={Service3K}
                              className='bg-white'
                              preview={false}
                           />
                        </motion.div>
                        <motion.div className="img"
                        whileHover={{
                                 scale: 1.1,
                                 boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                                 border: "2px solid rgba(0, 0, 0, 0.1)",
                                 filter: "brightness(100%)" // Tăng độ sáng khi trỏ chuột vào
                              }}
                              initial={{
                                 scale: 1,
                                 boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                                 border: "2px solid rgba(0, 0, 0, 0.05)",
                                 filter: "brightness(50%)" // Đặt độ tối ban đầu của ảnh
                              }}
                              transition={{ duration: 0.3 }}
                        >
                           <Image
                              style={{ width: "100vw", height: "auto" }}
                              src={Service3kh}
                              className='bg-white'
                              preview={false}
                           />
                        </motion.div>
                     </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
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
                                <h2 id="modal-title" className="modal-title">Đặt lịch tư vấn</h2>
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
                           >
                              <Image
                                 style={{ width: "200px", height: "200px" }}
                                 src={Service1Image}
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
                                 Thiết kế và thi công trọn gói căn hộ
                              </motion.div>
                              <motion.button className="button" type="button"
                                 variants={fadeIn('up', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                              >
                                 <Link to="/service/01">ĐỌC THÊM</Link>
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
                              <motion.button className="button" type="button"

                                 variants={fadeIn('up', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}>
                                 <Link to="/service/03">ĐỌC THÊM</Link>
                              </motion.button>
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