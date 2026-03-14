import type { Metadata } from 'next';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Interests',
};

export default function InterestsPage() {
  return (
    <div>
      <PageHeader
        title="Interests"
        description="Skills, professional experience, and areas of research."
      />

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        {/* Interests */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-heading dark:text-dark-text">
            Interests
          </h2>
          <Card>
            <ul className="space-y-2 text-sm text-body dark:text-dark-text">
              {[
                'Cheminformatics; program development for Chemistry & Crystallography',
                'JavaScript (ES6): Single Page Applications (React, Angular 2.x)',
                'Backend development NodeJS + Express + MongoDB',
                'Application of different Algorithms in Chemistry',
                'Applied Crystallography',
                'Data Science, Big Data',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted dark:bg-dark-text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Programming */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-heading dark:text-dark-text">
            Programming
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-body dark:text-dark-text">
            More than 10+ years of experience in developing websites of different complexities,
            including enterprise products with millions of users. Main expertise includes:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'React, NodeJS, C#',
              'JavaScript, ES6, Browser API',
              'Azure, Google Cloud, AWS',
              'Express, MongoDB, CosmosDB',
              'HTML5 & CSS3, LESS, SVG, Canvas',
              'Python, Data Science',
              'TDD, Jest, CI/CD',
            ].map((skill) => (
              <Card key={skill} padding="tight">
                <p className="text-sm font-medium text-heading dark:text-dark-text">{skill}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Chemistry */}
        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-heading dark:text-dark-text">
            Chemistry
          </h2>
          <Card>
            <ul className="space-y-2 text-sm text-body dark:text-dark-text">
              {[
                'Planning and project management',
                'Synthesis of inorganic and coordination compounds',
                'Synthetic organic chemistry',
                'Catalysis and reactivity',
                'Synthesis of air sensitive compounds',
                'Operation of analytical instruments (NMR, IR, X-Ray)',
                'Crystallization',
                'X-Ray crystal structure determination (structure solution & refinement)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted dark:bg-dark-text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
}
