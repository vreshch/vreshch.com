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

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        {/* Interests */}
        <section className="mb-16">
          <Card>
            <h2 className="mb-6 text-xl font-medium text-heading dark:text-dark-text">
              Areas of Interest
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
              {[
                'Cheminformatics; program development for Chemistry & Crystallography',
                'JavaScript (ES6): Single Page Applications (React, Angular 2.x)',
                'Backend development NodeJS + Express + MongoDB',
                'Application of different Algorithms in Chemistry',
                'Applied Crystallography',
                'Data Science, Big Data',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Programming */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Programming
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
            More than 10+ years of experience in developing websites of different complexities,
            including enterprise products with millions of users.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'React, NodeJS, C#',
              'JavaScript, ES6, Browser API',
              'Azure, Google Cloud, AWS',
              'Express, MongoDB, CosmosDB',
              'HTML5 & CSS3, LESS, SVG, Canvas',
              'Python, Data Science',
              'TDD, Jest, CI/CD',
            ].map((skill) => (
              <Card key={skill} padding="compact">
                <p className="text-sm font-medium text-heading dark:text-dark-text">{skill}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Chemistry */}
        <section>
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">Chemistry</h2>
          <Card>
            <ul className="space-y-3 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
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
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
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
