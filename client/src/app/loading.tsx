//@ts-nocheck
"use client"
import { motion } from "framer-motion";

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
  marginLeft: "0.5rem",
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
        Loading 
        <motion.div
          style={LoadingContainer}
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;