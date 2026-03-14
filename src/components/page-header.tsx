export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="pb-8 pt-16 md:pb-12 md:pt-24">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="mb-3 text-3xl font-medium text-heading dark:text-dark-text md:text-4xl">
          {title}
        </h1>
        <p className="text-lg text-muted dark:text-dark-text-secondary md:text-xl">{description}</p>
      </div>
    </section>
  );
}
