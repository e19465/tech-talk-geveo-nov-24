"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

function NProgressDone() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}

const NProgressDoneComponent = () => (
  <Suspense fallback={null}>
    <NProgressDone />
  </Suspense>
);

export default NProgressDoneComponent;
