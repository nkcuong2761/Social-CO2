import {motion, useCycle} from "framer-motion";

const CaretWide = (props) => {
  const [animate, cycle] = useCycle(
    { d: "M265 26L250 22L235 26" },
    { d: "M265 22L250 26L235 22" }
  )

  return (
    <svg width={props.width} height="48" viewBox="0 0 500 48" fill="white" xmlns="http://www.w3.org/2000/svg">
      <motion.rect width={props.width} height="48" fill="white" onTap={cycle}/>
      <motion.path
        style={{
          stroke: "#333333",
          strokeWidth: 3,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }}
        animate={animate}
        onTap={cycle}
      />
    </svg>
  );
}

export default CaretWide;