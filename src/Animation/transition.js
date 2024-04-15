import { motion } from "framer-motion"; // Import the motion component from framer-motion library

const Transition = ({ OgComponent }) => {
  return (
    <>
      <OgComponent />
      {/* Wrap motion.div around your JSX */}
      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
        exit={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>

      {/* Add another motion.div for the slide-out animation */}
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }} // Change from 1 to 0 to animate from scaleY 1 to scaleY 0
        exit={{ scaleY: 0 }} // Change from 1 to 0 to animate from scaleY 1 to scaleY 0
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>
    </>
  );
};

export default Transition;
