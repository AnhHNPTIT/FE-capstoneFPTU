import { Modal as BaseModal } from '@mui/base/Modal';
import { TextField } from '@mui/material';
import { Image } from "antd";
import { motion } from "framer-motion";
import { default as React, useState } from "react";
import { Link } from "react-router-dom";
import { fadeIn } from "../Animation/variants";
import { waveVariants } from "../Animation/waveVariants";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import CT1SV2Image from "../images/content-img1.png";
import CT2SV2Image from "../images/ct2-sv2-image.png";
import CT3SV2Image from "../images/ct3-sv2-image.png";
import Service1Image from "../images/service1-image.png";
import Service3Image from "../images/service3-image.png";
import ImageTitle from "../images/sv2-image-title.png";
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
         <motion.div className="service2"
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1, originX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
            
            <div className='service__container'>
               <div className='header'>
                  <motion.div className='title'
                  variants={fadeIn('down', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>
                  
                     GÓI DỊCH VỤ
                  </motion.div>
                  <motion.p className='description'
                  variants={fadeIn('down', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>
                  Tư vấn thiết kế sang trọng, đẹp mắt và nhanh chóng ...</motion.p>
                  <hr />
               </div>
               <div className="body">
                  <div className="service2__content-head">
                     🌟 Khám Phá Sự Đẳng Cấp với Dịch Vụ Tư Vấn Thiết Kế Của Chúng Tôi! 🌟
                  </div>
                  <div className="first-content">
                     <div className="text">
                        Chúng tôi tự hào giới thiệu đến bạn gói dịch vụ tư vấn thiết kế, nơi mọi ý tưởng độc đáo của bạn trở thành hiện thực sống động. Với đội ngũ chuyên gia giàu kinh nghiệm và sáng tạo, chúng tôi cam kết mang đến cho bạn những lợi ích không thể bỏ qua.
                     </div>
                     <div className="image">
                        <Image
                           style={{ width: "25vw", height: "auto" }}
                           src={ImageTitle}
                           className='bg-white'
                           preview={true}
                        />
                     </div>
                  </div>
                  <div className="content">
                     <div className="content-child">
                        <motion.div className="content-title"

                           variants={fadeIn('down', 0.2)}
                           initial="hidden"
                           whileInView={"show"}
                           viewport={{ once: false, amount: 0.7 }}

                        >
                           Sự sáng tạo phi giới hạn
                        </motion.div>
                        <motion.hr
                           variants={fadeIn('down', 0.2)}
                           initial="hidden"
                           whileInView={"show"}
                           viewport={{ once: false, amount: 0.7 }}
                        />
                        <div className="content-detail">
                           <motion.div className="image"
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
                                 style={{ width: "100vw", height: "600px", objectFit: "cover" }}
                                 src={CT1SV2Image}
                                 className='bg-white'
                                 preview={false}
                              />
                           </motion.div>
                           <motion.div className="background-text-content"
                              variants={fadeIn('right', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}
                           >
                              <div className="background-white" />
                              <div className="background-middle" />
                              <div className="background-brown" />
                              <div className="text" style={{ fontSize: '39px' }}>
                                 Mỗi dự án được tạo ra từ tư duy sáng tạo và lòng đam mê của chúng tôi. Chúng tôi không ngừng tìm kiếm và thực hiện những ý tưởng mới để tạo ra không gian sống độc đáo và đáng nhớ cho bạn.
                              </div>
                           </motion.div>
                        </div>
                     </div>
                     <div className="content-child">
                        <motion.div className="content-title"

                           variants={fadeIn('down', 0.2)}
                           initial="hidden"
                           whileInView={"show"}
                           viewport={{ once: false, amount: 0.7 }}

                        >
                           Thiết kế độc quyền và phù hợp
                        </motion.div>
                        <motion.hr
                           variants={fadeIn('down', 0.2)}
                           initial="hidden"
                           whileInView={"show"}
                           viewport={{ once: false, amount: 0.7 }}
                        />
                        <div className="content-detail">
                           <motion.div className="image"
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
                                 style={{ width: "100vw", height: "600px", objectFit: "cover" }}
                                 src={CT2SV2Image}
                                 className='bg-white'
                                 preview={false}
                              />
                           </motion.div>
                           <motion.div className="background-text-content"
                              variants={fadeIn('right', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}
                           >
                              <div className="background-white" />
                              <div className="background-middle" />
                              <div className="background-brown" />
                              <div className="text" style={{ fontSize: '35px' }}>
                                 Chúng tôi không chỉ tạo ra các thiết kế độc đáo, mà còn đảm bảo rằng chúng phản ánh chính xác phong cách và nhu cầu của bạn. Với sự kết hợp tinh tế giữa thẩm mỹ và sự tiện ích, mỗi không gian sẽ trở thành nơi bạn muốn trở về sau mỗi ngày làm việc.
                              </div>
                           </motion.div>
                        </div>
                     </div>
                     <div className="content-child">
                        <motion.div className="content-title"
                           variants={fadeIn('down', 0.2)}
                           initial="hidden"
                           whileInView={"show"}
                           viewport={{ once: false, amount: 0.7 }}
                        >
                           Hỗ trợ tận tâm và toàn diện
                        </motion.div>
                        <motion.hr
                           variants={fadeIn('down', 0.2)}
                           initial="hidden"
                           whileInView={"show"}
                           viewport={{ once: false, amount: 0.7 }}
                        />
                        <div className="content-detail">
                           <motion.div className="image"
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
                                 style={{ width: "100vw", height: "600px", objectFit: "cover" }}
                                 src={CT3SV2Image}
                                 className='bg-white'
                                 preview={false}
                              />
                           </motion.div>
                           <motion.div className="background-text-content"
                              variants={fadeIn('right', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}>
                              <div className="background-white" />
                              <div className="background-middle" />
                              <div className="background-brown" />
                              <div className="text" style={{ fontSize: '35px' }}>
                                 Chúng tôi không chỉ là những nhà thiết kế, mà còn là những người bạn đồng hành trung thành trong hành trình xây dựng không gian của bạn. Với dịch vụ tư vấn thiết kế của chúng tôi, bạn sẽ nhận được sự hỗ trợ tận tâm và chuyên nghiệp từ đầu đến cuối dự án.
                              </div>
                           </motion.div>
                        </div>
                     </div>
                     <div className="content-03">
                        <div className="content-desc">
                           Hãy để chúng tôi giúp bạn biến ước mơ về không gian sống lý tưởng thành hiện thực! <br />
                           Liên hệ với chúng tôi ngay hôm nay để bắt đầu hành trình tìm kiếm sự hoàn hảo và phong cách cho ngôi nhà của bạn!
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
               </div>
               <div className="footer">
                  <div className="other-service">
                     <div className="title">
                        CÁC DỊCH VỤ KHÁC
                     </div>
                     <hr />
                     <div className="list-services">
                        <div className="service-child">
                           <div
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
                           </div>
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
                           <div
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
                           </div>
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