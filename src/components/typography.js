import React from "react";
import cn from "classnames";
import "./typography.scss";

// Defining the HTML tag that the component will support
const variantsMapping = {
  h1: "h1",
  h2: "h2",
  h3: "p",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "p",
  subheading2: "p",
  body: "p",
  subtitle1: "p",
  subtitle2: "p",
};

// Create a functional component that take 
// variant: the selected html tag
// color: the selected color
// children: the node passed inside the Component
// ...props: the default attribute of the Component
const Typography = ({ variant, color, children, ...props }) => {
  // If the variant exists in variantsMapping, we use it. 
  // Otherwise, use p tag instead.
  const Component = variant ? variantsMapping[variant] : "p";

  return (
    <Component
      className={cn({
        [`typography--variant-${variant}`]: variant,
        [`typography--color-${color}`]: color,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;