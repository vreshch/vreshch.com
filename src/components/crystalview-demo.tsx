'use client';

import { useEffect, useRef } from 'react';
import { Mol3DView } from '@chemistry/crystalview';
import '@chemistry/crystalview/crystalview.css';

const STRUCTURE = {
  _id: '1518815',
  a: '18.6424(17)',
  b: '13.1149(12)',
  c: '23.982(2)',
  alpha: '90.00',
  beta: '105.293(3)',
  gamma: '90.00',
  sg: 'C 1 2/c 1',
  sgHall: '-C 2yc',
  loops: [
    {
      columns: [
        '_atom_site_label',
        '_atom_site_type_symbol',
        '_atom_site_fract_x',
        '_atom_site_fract_y',
        '_atom_site_fract_z',
        '_atom_site_U_iso_or_equiv',
        '_atom_site_occupancy',
      ],
      data: [
        ['Sn1', 'Sn', '0.390793', '0.83227', '0.445277', '0.03377', '1'],
        ['Cu1', 'Cu', '0.43413', '1.07753', '0.49513', '0.0301', '0.50'],
        ['Cu2', 'Cu', '0.52718', '0.93794', '0.55537', '0.0286', '0.50'],
        ['Cu4', 'Cu', '0.5000', '0.46142', '0.7500', '0.0391', '1'],
        ['O1', 'O', '0.3661', '0.9707', '0.4841', '0.0358', '0.50'],
        ['O4', 'O', '0.57243', '0.5669', '0.78837', '0.0461', '1'],
        ['O5', 'O', '0.56550', '0.4606', '0.68333', '0.0454', '1'],
        ['O6', 'O', '0.56874', '0.3562', '0.79161', '0.0406', '1'],
        ['C13', 'C', '0.5000', '0.7118', '0.7500', '0.0426', '1'],
        ['C14', 'C', '0.5629', '0.6598', '0.7806', '0.0363', '1'],
        ['C17', 'C', '0.6308', '0.4316', '0.6980', '0.0351', '1'],
        ['C18', 'C', '0.6677', '0.3742', '0.7465', '0.0334', '1'],
        ['C19', 'C', '0.6332', '0.3409', '0.7874', '0.0332', '1'],
        ['C20', 'C', '0.6774', '0.2694', '0.8350', '0.0406', '1'],
        ['F4', 'F', '0.74980', '0.2703', '0.84076', '0.0667', '1'],
        ['F5', 'F', '0.6659', '0.2905', '0.88604', '0.0698', '1'],
        ['F6', 'F', '0.6543', '0.1735', '0.82387', '0.0526', '1'],
        ['F7', 'F', '0.6387', '0.4675', '0.60225', '0.0629', '1'],
        ['F8', 'F', '0.7010', '0.5581', '0.66911', '0.0936', '1'],
        ['F9', 'F', '0.7353', '0.4066', '0.6599', '0.132', '1'],
      ],
    },
  ],
};

export function CrystalViewDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Mol3DView | null>(null);

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    const viewer = new Mol3DView({ bgcolor: '#1f2028' });
    viewer.append(containerRef.current);
    viewer.onInit();
    viewer.load(STRUCTURE);
    viewer.center();
    viewerRef.current = viewer;

    return () => {
      viewer.onDestroy();
      viewerRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}
