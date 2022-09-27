import { useEffect, useRef } from 'react';

function useScrollTop(pathname) {
  const contentRef = useRef(null);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (contentRef.current?.scrollTop) {
      contentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return contentRef;
}

export default useScrollTop;
