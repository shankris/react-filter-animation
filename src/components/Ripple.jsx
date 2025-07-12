import { useRef, forwardRef } from "react";
import styles from "./Ripple.module.css";

const Ripple = forwardRef(function Ripple(
  {
    children,
    onClick,
    className = "",
    as: Component = "button",
    rippleColor = "rgba(0, 0, 0, 0.3)", // Default ripple color
    ...props
  },
  ref
) {
  const localRef = useRef(null);
  const combinedRef = ref || localRef;

  const createRipple = (event) => {
    const element = combinedRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - element.getBoundingClientRect().top - radius}px`;
    circle.style.backgroundColor = rippleColor;
    circle.classList.add(styles.ripple);

    element.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  const handleClick = (event) => {
    createRipple(event);
    if (onClick) onClick(event);
  };

  return (
    <Component
      ref={combinedRef}
      className={`${styles.rippleWrapper} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Ripple;
