import { AnimatePresence, motion } from "framer-motion";

export const Slideshow = ({ image }) => (
    <AnimatePresence>
      <motion.img
        key={image.src} // Đặt key cho hình ảnh để đảm bảo là nó được cập nhật đúng cách khi props thay đổi
        src={image.src} // Đường dẫn của hình ảnh
        initial={{ x: 300, opacity: 0 }} // Trạng thái ban đầu của hình ảnh (di chuyển từ phải sang trái và không hiển thị)
        animate={{ x: 0, opacity: 1 }} // Trạng thái khi hình ảnh được hiển thị (di chuyển về vị trí ban đầu và hiển thị)
        exit={{ x: -300, opacity: 0 }} // Trạng thái khi hình ảnh bị xóa (di chuyển sang trái và biến mất)
      />
    </AnimatePresence>
  )