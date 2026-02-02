import { getProfile } from "@/lib/data";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  const profile = getProfile();

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      {/* HERO */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold">{profile.name}</h1>

        <p className="mt-3 text-lg text-gray-600">
          {profile.headline}
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href={profile.github}
            target="_blank"
            className="rounded bg-black px-6 py-2 text-white hover:bg-gray-800"
          >
            View GitHub
          </a>

          <a
            href={profile.resumePath}
            className="rounded border px-6 py-2 hover:bg-gray-100"
          >
            Download Resume
          </a>
        </div>
      </section>

      {/* SKILLS */}
      <Skills />

      {/* PROJECTS */}
      <Projects />
    </main>
  );
}
