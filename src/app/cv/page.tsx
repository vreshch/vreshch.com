import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curriculum Vitae',
};

export default function CvPage() {
  return (
    <div>
      <h1 className="text-3xl">Curriculum Vitae</h1>
      <hr className="my-4 border-t border-black/10" />
      <div className="text-justify">
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">Programming</dt>
          <p>
            In general, more than 10+ year of experience in developing of websites of different
            difficulties, including enterprise products with millions of users Main expertise
            includes:
          </p>
          <dd className="ml-4">
            <ul className="ml-4 list-disc">
              <li>React, NodeJS, C#</li>
              <li>JavaScript, ES6, Browser API</li>
              <li>Azure, Google Cloud, AWS</li>
              <li>Express, MongoDB, CosmosDB</li>
              <li>HTML5 &amp; CSS3, LESS, SVG, Canvas</li>
              <li>Python, Data Science</li>
              <li>TDD, Jest, CI/CD</li>
            </ul>
          </dd>
        </dl>
        <dl className="mb-4">
          <dt className="mb-4 text-xl font-bold text-heading">Chemistry</dt>
          <dd className="ml-4">
            <ul className="ml-4 list-disc">
              <li>Planning and project management</li>
              <li>Synthesis of inorganic and coordination compounds</li>
              <li>Synthetic organic chemistry</li>
              <li>Catalysis and reactivity</li>
              <li>Synthesis of air sensitive compounds</li>
              <li>Operation of analytical instruments (NMR, IR, X-Ray)</li>
              <li>Crystallization</li>
              <li>X-Ray crystal structure determination (structure solution &amp; refinement)</li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
}
