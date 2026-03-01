import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '@chemistry',
};

export default function ChemistryJsPage() {
  return (
    <div>
      <h1 className="text-3xl">@chemistry</h1>
      <hr className="my-4 border-t border-black/10" />
      <div className="text-justify">
        <p>
          Set of open source projects related to Chemistry/Crystallography released under MIT
          license on{' '}
          <a href="https://github.com/chemistry" target="_blank" rel="noreferrer">
            github
          </a>
        </p>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">
            <a
              href="https://github.com/chemistry/crystallography.io"
              target="_blank"
              rel="noreferrer"
            >
              @chemistry/crystallography.io
            </a>
          </dt>
          <dd className="ml-4">
            Alternative web interface for COD database website available at:{' '}
            <a href="http://crystallography.io/" target="_blank" rel="noreferrer">
              http://crystallography.io/
            </a>
          </dd>
        </dl>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">
            <a href="https://github.com/chemistry/crystalview" target="_blank" rel="noreferrer">
              @chemistry/crystalview
            </a>
          </dt>
          <dd className="ml-4">Simple molecular viewer for crystal structures</dd>
        </dl>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">
            <a href="https://github.com/chemistry/molpad" target="_blank" rel="noreferrer">
              @chemistry/molpad
            </a>
          </dt>
          <dd className="ml-4">Molecule editor used to draw molecule for search</dd>
        </dl>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">
            <a
              href="https://github.com/chemistry/chemical-libraries"
              target="_blank"
              rel="noreferrer"
            >
              @chemistry/(math,elements,spacegroups)
            </a>
          </dt>
          <dd className="ml-4">
            Set of common functionality / chemical constants that support creation of software for
            chemistry
          </dd>
        </dl>
      </div>
    </div>
  );
}
