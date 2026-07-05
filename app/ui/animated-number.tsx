'use client';

import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/app/lib/utils';

const AnimatedNumber = ({
  end,
  duration = 1000,
}: {
  end: number,
  duration: number,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(end * progress);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return (
    <>
      <span>{formatCurrency(Math.round(count))}</span>
    </>
  );
};

export default AnimatedNumber;
