import { getSkills } from "@/lib/data";

export default function Skills() {
  const skills = getSkills();

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div className="rounded-lg border p-4">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ul className="flex flex-wrap gap-2 text-sm">
        {items.map((item) => (
          <li
            key={item}
            className="rounded bg-gray-100 px-3 py-1 text-gray-800"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-3xl font-bold">Skills</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Section title="Languages" items={skills.languages} />
        <Section title="Machine Learning / Deep Learning" items={skills.machineLearning} />
        <Section title="NLP / GenAI" items={skills.nlpGenAI} />
        <Section title="Data & Visualization" items={skills.data} />
        <Section title="MLOps & Deployment" items={skills.mlops} />
        {skills.cloud && <Section title="Cloud" items={skills.cloud} />}
      </div>
    </section>
  );
}
