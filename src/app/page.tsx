export default function Home() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
          Welcome
        </p>
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Hi, I am Your Name.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-neutral-600">
          This is a minimal home base for writing, projects, and notes. I will keep
          it simple, focused, and easy to explore.
        </p>
      </div>

      <div className="grid gap-6 border-t border-neutral-200 pt-6 sm:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Now
          </h2>
          <p className="text-sm leading-6 text-neutral-600">
            Building a clean portfolio, documenting work, and collecting ideas for
            future posts.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Next
          </h2>
          <p className="text-sm leading-6 text-neutral-600">
            Publish a first project overview and begin a short blog series on
            design, code, and process.
          </p>
        </div>
      </div>
    </section>
  );
}
