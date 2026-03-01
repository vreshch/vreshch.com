import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volodymyr Vreshch - Home',
};

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <hr className="my-4 border-t border-black/10" />
      <div className="text-justify">
        <p>
          Welcome to my personal website. Here you can find some general information about my
          background, supported projects and contacts
        </p>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">Personal Information</dt>
          <dd className="ml-4">
            Volodymyr D. Vreshch
            <br />
            Senior Software Engineer @ Microsoft
          </dd>
        </dl>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">Career path</dt>
          <dd className="ml-4">
            <b>07.2021-</b>, Senior Software Engineer, <b>Microsoft</b>
            <ul className="ml-4 list-disc">
              <li>Frontend Developer</li>
            </ul>
          </dd>
          <dd className="ml-4">
            <b>07.2016-07.2021</b>, Lead Software Engineer, <b>EPAM Systems</b>
            <ul className="ml-4 list-disc">
              <li>TypeScript, React, Angular 2+</li>
              <li>NodeJS, Cloud</li>
            </ul>
          </dd>
          <dd className="ml-4">
            <b>07.2015-07.2016</b>, Software Engineer, <b>GlobalLogic</b>
            <ul className="ml-4 list-disc">
              <li>JavaScript, Backbone</li>
              <li>LESS, HTML, NodeJS</li>
            </ul>
          </dd>
          <dd className="ml-4">
            <b>2009-2012</b> <i>Post-Doc.</i>, USA (Albany, NY), France (Rennes 1, Toulouse)
          </dd>
          <dd className="ml-4">
            <b>2008</b> <i>Ph.D.</i> in Inorg. Chem., Kyiv, <b>Ukraine</b>
          </dd>
        </dl>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">Supported Projects:</dt>
          <dd className="ml-4">
            <ul className="ml-4 list-disc">
              <li>
                <a href="https://crystallography.io/" target="_blank" rel="noreferrer">
                  crystallography.io
                </a>
              </li>
              <li>
                <a href="https://diffractwd.com/" target="_blank" rel="noreferrer">
                  diffractwd.com
                </a>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
}
