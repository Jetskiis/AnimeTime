import { motion, Transition } from "framer-motion";

const LoadingDot = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "black",
  borderRadius: "50%",
};

const LoadingContainer = {
  width: "3rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginLeft: "0.5rem"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  repeatType: "reverse",
  repeat: Infinity,
  ease: "easeInOut",
};

const Loader = () => {
  return (
    <div className="fw-bold h-screen pt-28 text-center text-5xl">
      <div className="flex flex-row justify-center items-center">
      Loading data
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition as Transition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition as Transition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition as Transition}
        />
      </motion.div>
      </div>
      <p className="text-base">(reload if there are errors)</p>
    </div>
  );
};

export default Loader;
