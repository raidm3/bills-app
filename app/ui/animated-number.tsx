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
    let interval = 10;
    let step = (end / duration) * interval;

    const counter = setInterval(() => {
      setCount(prevCount => {
        const nextCount = prevCount + step;
        if (nextCount > end) {
          clearInterval(counter);
          return end;
        }
        return nextCount;
      });
    }, interval);

    // Cleanup interval on component unmount
    return () => clearInterval(counter);
  }, [end, duration]);

  return (
    <>
      <span>{formatCurrency(Math.round(count))}</span>
    </>
  );
};

export default AnimatedNumber;
