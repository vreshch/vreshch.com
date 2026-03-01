import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volodymyr Vreshch - Interests',
};

export default function InterestsPage() {
  return (
    <div>
      <h1 className="text-3xl">Interests</h1>
      <hr className="my-4 border-t border-black/10" />
      <div className="text-justify">
        <ul className="ml-4 list-disc">
          <li>Cheminformatics; program development for Chemistry &amp; Crystallography</li>
          <li>JavaScript (ES6): Single Page Applications (React, Angular 2.x)</li>
          <li>Backend development NodeJS + Express + MongoDB</li>
          <li>Application of different Algorithms in Chemistry</li>
          <li>Applied Crystallography</li>
          <li>Data Science, Big Data</li>
        </ul>
      </div>
    </div>
  );
}
