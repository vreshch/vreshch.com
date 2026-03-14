export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-light py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="text-base text-white/70">{description}</p>
      </div>
    </section>
  );
}
