import { Image } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';
import { fadeIn } from '../Animation/variants';
import FooterComponent from '../footer';
import HeaderComponent from "../header/index";
import fourdolaIcon from '../images/fouricon.png';
import fourImage from '../images/fourimage.png';
import AnhQuyen from '../images/image 30.png';
import onedolaIcon from '../images/onedola.png';
import oneImage from '../images/oneimage.png';
import threedolaIcon from '../images/threeicon.png';
import threeImage from '../images/threeimage.png';
import twodolaIcon from '../images/twoicon.png';
import twoImage from '../images/twoimage.png';
import './about_screen.css';

const AboutScreen = () => {
   const ImageContentStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
   }

   return (
      <div>
         <HeaderComponent />
         <motion.div className='about-screen'
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
            exit={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >

            <motion.div className='about-screen title'>

            </motion.div>
            <motion.div className='Text-content'

               variants={fadeIn('down', 0.2)}
               initial="hidden"
               whileInView={"show"}
               viewport={{ once: false, amount: 0.7 }}
            >
               Doanh Nghiệp
            </motion.div>

            <div className='about-screen container'>
               <motion.div className='images'>
                  <Image
                     style={ImageContentStyle}
                     src={AnhQuyen}
                     className='bg-white'
                     preview={true}
                  />
               </motion.div>
               <motion.div className="content">
                  Chúng ta đã có nhiều năm gia công cho các thương hiệu nội thất lớn trên thế giới. Các sản phẩm được sản xuất tại Việt Nam, gắn thương hiệu ngoại và quay trở lại bán cho người Việt với giá gấp nhiều lần giá trị sử dụng thực.
                  <br /><br />Xuất phát từ lòng tự hào dân tộc, khởi nguồn từ khao khát người Việt Nam được dùng hàng hiệu Việt với tiêu chuẩn châu Âu cùng mức chi phí tối ưu. Vũ Gia ra đời với đầy đủ phẩm chất của một thương hiệu gia công chế tác Nội thất cao cấp.
                  <br /><br />Vũ Gia Furniture nâng tầm phong cách sống sang trọng, đẳng cấp với những giá trị bền vững đi cùng mức chi phí hợp lý.
               </motion.div>
               <div className='data'>
                  <motion.div className='item'
                     variants={fadeIn('right', 0.2)}
                     initial="hidden"
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.7 }}
                  >
                     <p style={{ fontSize: "40px", color: '#A14C17' }}>1 Tỷ</p>
                     <p>Hoàn trả nếu không đúng nguyên vật liệu</p>
                  </motion.div>
                  <motion.div className='item'
                     variants={fadeIn('up', 0.2)}
                     initial="hidden"
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.7 }}
                  >
                     <p style={{
                        fontSize: "40px",
                        color: '#A14C17'
                     }}>5 năm</p>
                     <p> Bảo hành sản phẩm </p>

                  </motion.div>
                  <motion.div className='item'
                     variants={fadeIn('left', 0.2)}
                     initial="hidden"
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.7 }}
                  >
                     <p style={{
                        fontSize: "40px",
                        color: '#A14C17'
                     }}>100%</p>
                     <p> Cam kết chính xác so với hồ sơ thiết kế </p>
                  </motion.div>
               </div>
            </div>
            <div className='about-screen slogan'>
               <span style={{ textAlign: 'left' }}>NỘI THẤT VŨ GIA _</span>
               <span style={{ textAlign: 'right' }}>_ ĐEM ƯỚC MƠ VỀ TỚI CỬA NHÀ</span>
            </div>

            <div className="features-container">
               <div className="feature-first">
                  <motion.div className="feature-icon"
                  variants={fadeIn('right', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     <Image
                        width={"100%"}
                        height={"auto"}
                        src={onedolaIcon}
                        className="bg-white"
                        preview={false}
                     />
                  </motion.div>
                  <motion.div className="feature-title"
                  variants={fadeIn('right', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     TỐI ƯU<br /><span style={{ color: '#984B1A' }}> CHI PHÍ</span>
                  </motion.div>
                  <div className="feature-description">
                     Chi phí gia công chế tác được tính toán cẩn thận sao cho tối ưu nhất với mục tiêu giúp khách hàng Việt có thể tiếp cận các sản phẩm Nội thất chất lượng cao với mức chi phí hợp lý nhất.
                  </div>
                  <div className="feature-image">
                     <Image
                        width='100%'
                        height='auto'
                        style={{
                           borderRadius: '30px'
                        }}
                        src={oneImage}
                        className="bg-white"
                        preview={false}
                     />
                  </div>
               </div>

               <div className="feature-second">
                  <motion.div className="feature-icon"
                  variants={fadeIn('left', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     <Image
                        width={"100%"}
                        height={"auto"}
                        src={twodolaIcon}
                        className="bg-white"
                        preview={false}
                     />
                  </motion.div>
                  <motion.div className="feature-title"
                  variants={fadeIn('left', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     TỐI ƯU<br /><span style={{ color: '#984B1A' }}> THỜI GIAN</span>
                  </motion.div>
                  <div className="feature-description">
                     Tinh tốc hoàn thiện sản phẩm, tối ưu thời gian chế tác của từng khâu, xóa bỏ mọi bước vận chuyển, cung cấp giải pháp sản xuất đồng bộ cho tất cả đồ nội thất.
                  </div>
                  <div className="feature-image">
                     <Image
                        width='100%'
                        height='auto'
                        style={{
                           borderRadius: '30px'
                        }}
                        src={twoImage}
                        className="bg-white"
                        preview={false}
                     />
                  </div>
               </div>

               <div className="feature-third">
                  <motion.div className="feature-icon"
                  variants={fadeIn('right', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     <Image
                        width={"100%"}
                        height={"auto"}
                        src={threedolaIcon}
                        className="bg-white"
                        preview={false}
                     />
                  </motion.div>
                  <motion.div className="feature-title"
                  variants={fadeIn('right', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     TỐI ƯU<br /><span style={{ color: '#984B1A' }}> LINH HOẠT</span>
                  </motion.div>
                  <div className="feature-description">
                     Với một nhà máy độc quyền riêng biệt chỉ dành cho Vũ Gia, khách hàng có nhiều lựa chọn tinh chỉnh nội thất theo style cá nhân của chính mình.
                  </div>
                  <div className="feature-image">
                     <Image
                        width='100%'
                        height='auto'
                        style={{
                           borderRadius: '30px'
                        }}
                        src={threeImage}
                        className="bg-white"
                        preview={false}
                     />
                  </div>
               </div>
               <div className="feature-fourth">
                  <motion.div className="feature-icon"
                  variants={fadeIn('left', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     <Image
                        width={"100%"}
                        height={"auto"}
                        src={fourdolaIcon}
                        className="bg-white"
                        preview={false}
                     />
                  </motion.div>
                  <motion.div className="feature-title"
                  variants={fadeIn('left', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                  >
                     TỐI ƯU<br /><span style={{ color: '#984B1A' }}> TRẢI NGHIỆM</span>
                  </motion.div>
                  <div className="feature-description">
                     Khách hàng có thể trực tiếp tham gia vào quá trình sản xuất, thậm chí có thể tham gia quyết định chỉnh sửa thiết kế sản phẩm cũng như vật liệu ngay trong quá trình chế tác dưới sự hỗ trợ của đội ngũ các Nhà thiết kế, Nghệ nhân của Vũ Gia Furniture.
                  </div>
                  <div className="feature-image">
                     <Image
                        width='100%'
                        height='auto'
                        style={{
                           borderRadius: '30px'
                        }}
                        src={fourImage}
                        className="bg-white"
                        preview={false}
                     />
                  </div>
               </div>
            </div>

            <FooterComponent />
         </motion.div>
      </div>
   )
}
export default AboutScreen;