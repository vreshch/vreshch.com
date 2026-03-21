'use client';

import { useEffect, useRef } from 'react';
import { MolPad } from '@chemistry/molpad';
import type { MolPadHandle } from '@chemistry/molpad';

import '@chemistry/molpad/molpad.css';

const CAFFEINE = {
  id: 'caffeine',
  title: 'Caffeine',
  atoms: [
    [0.47, 2.5688, 0, 'O'],
    [-3.1271, -0.4436, 0, 'O'],
    [-0.9686, -1.3125, 0, 'N'],
    [2.2182, 0.1412, 0, 'N'],
    [-1.3477, 1.0797, 0, 'N'],
    [1.4119, -1.9372, 0, 'N'],
    [0.8579, 0.2592, 0, 'C'],
    [0.3897, -1.0264, 0, 'C'],
    [0.0307, 1.422, 0, 'C'],
    [-1.9061, -0.2495, 0, 'C'],
    [2.5032, -1.1998, 0, 'C'],
    [-1.4276, -2.696, 0, 'C'],
    [3.1926, 1.2061, 0, 'C'],
    [-2.2969, 2.1881, 0, 'C'],
  ] as [number, number, number, string][],
  bonds: [
    [1, 9, 2],
    [2, 10, 2],
    [3, 8, 1],
    [3, 10, 1],
    [3, 12, 1],
    [4, 7, 1],
    [4, 11, 1],
    [4, 13, 1],
    [5, 9, 1],
    [5, 10, 1],
    [5, 14, 1],
    [6, 8, 1],
    [6, 11, 2],
    [7, 8, 2],
    [7, 9, 1],
  ] as [number, number, number][],
};

export function MolPadDemo() {
  const ref = useRef<MolPadHandle>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.loadMolecule(CAFFEINE);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full">
      <MolPad ref={ref} />
    </div>
  );
}
