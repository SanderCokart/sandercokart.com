'use client';

import { motion, useScroll } from 'framer-motion';

import { useRef } from 'react';

export function Line() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [0, 1, 0, 1],
  });

  return (
    <div ref={ref} className="relative z-0 mx-auto my-16 w-2/3 max-w-4xl lg:w-full">
      <hr className="z-0 w-full border-2 border-black dark:border-white" />
      <motion.hr
        className="absolute top-0 z-10 w-full border-2 border-accent"
        initial={{ scaleX: 0 }}
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
