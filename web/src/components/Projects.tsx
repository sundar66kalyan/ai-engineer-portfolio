import { getProjects } from "@/lib/data";

export default function Projects() {
  const projects = getProjects();

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-6">AI Projects</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project: any) => (
          <div
            key={project.id}
            className="rounded-lg border p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>

            <p className="mt-2 text-sm text-gray-600">
              {project.problem}
            </p>

            <div className="mt-3 text-sm space-y-1">
              <p><strong>Domain:</strong> {project.domain}</p>
              <p><strong>Dataset:</strong> {project.dataset}</p>
              <p><strong>Model:</strong> {project.model}</p>
            </div>

            <div className="mt-3 text-sm">
              <strong>Metrics:</strong>
              <ul className="list-disc list-inside">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value as string}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <a
                href={project.github}
                target="_blank"
                className="inline-block rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
