import React from "react";

const useDevice = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const isMobile = React.useMemo(() => width <= 800, [width]);

  const isDesktop = React.useMemo(() => width > 800, [width]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isDesktop, isMobile, width };
};

export default useDevice;
