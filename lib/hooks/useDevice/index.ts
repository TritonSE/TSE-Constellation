import React from "react";

// Define the width breakpoint for screens (upper bounds)
const MOBILE_WIDTH_BREAKPOINT = 480;

const DESKTOP_WIDTH_BREAKPOINT = 1124;

type ViewportProperties = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  width: number;
};
export type UseDevice = () => ViewportProperties;

/**
 * Media query hook to determine the current device type based on the viewport width.
 */
export const useDevice: UseDevice = () => {
  const [width, setWidth] = React.useState(1000);
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
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isDesktop, isTablet, isMobile, width };
};
