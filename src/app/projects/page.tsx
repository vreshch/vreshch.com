import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl">Projects</h1>
      <hr className="my-4 border-t border-black/10" />
      <div className="text-justify">
        <p>Currently I am supporting 2 projects, both are in active development phase;</p>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/2">
            <a href="https://crystallography.io" target="_blank" rel="noreferrer">
              <Image
                src="/images/crystallography_online.jpg"
                width={397}
                height={284}
                className="h-auto w-full"
                alt="crystallography.io"
              />
              <br />
              crystallography.io
            </a>
          </div>
          <div className="w-full md:w-1/2">
            <a href="http://diffractwd.com" target="_blank" rel="noreferrer">
              <Image
                src="/images/diffractwd.jpg"
                width={397}
                height={284}
                className="h-auto w-full"
                alt="diffractwd.com"
              />
              <br />
              diffractwd.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
