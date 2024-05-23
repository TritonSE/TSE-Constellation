import React from "react";

// Define the width breakpoint for screens (upper bounds)
const MOBILE_WIDTH_BREAKPOINT = 480;

const DESKTOP_WIDTH_BREAKPOINT = 1124;

/**
 * Media query hook to determine the current device type based on the viewport width.
 */
export const useDevice = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const isMobile = React.useMemo(() => width <= MOBILE_WIDTH_BREAKPOINT, [width]);

  const isTablet = React.useMemo(
    () => MOBILE_WIDTH_BREAKPOINT < width && width <= DESKTOP_WIDTH_BREAKPOINT,
    [width],
  );

  const isDesktop = React.useMemo(() => width > DESKTOP_WIDTH_BREAKPOINT, [width]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isDesktop, isTablet, isMobile, width };
};
