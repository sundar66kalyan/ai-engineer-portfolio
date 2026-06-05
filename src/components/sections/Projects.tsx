'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';
import Link from 'next/link';
import Image from 'next/image';

type Project = Database['public']['Tables']['projects']['Row'];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter));
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4">Loading...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-secondary rounded-full" />
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-accent text-dark'
                : 'bg-dark-tertiary text-gray-300 hover:text-accent border border-accent/20'
            }`}
          >
            All Projects
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tag
                  ? 'bg-accent text-dark'
                  : 'bg-dark-tertiary text-gray-300 hover:text-accent border border-accent/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group bg-dark-tertiary rounded-xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)' }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-dark overflow-hidden">
                {project.image_url && (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-tertiary via-transparent to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                {project.metrics && Object.keys(project.metrics).length > 0 && (
                  <div className="mb-4 pb-4 border-b border-accent/10 flex gap-4 text-xs">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-gray-400">{key}</p>
                        <p className="text-accent font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3">
                  {project.github_url && (
                    <Link
                      href={project.github_url}
                      target="_blank"
                      className="flex-1 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all text-sm font-medium text-center"
                    >
                      GitHub
                    </Link>
                  )}
                  {project.live_url && (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent-secondary text-dark hover:shadow-lg hover:shadow-accent/50 transition-all text-sm font-medium text-center"
                    >
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
