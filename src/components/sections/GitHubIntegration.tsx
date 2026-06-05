'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getGitHubRepos, getGitHubStats } from '@/lib/github';
import Link from 'next/link';

const GitHubIntegration = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'sundar66kalyan';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [repoData, statsData] = await Promise.all([
          getGitHubRepos(username, 6),
          getGitHubStats(username),
        ]);
        setRepos(repoData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">Loading GitHub data...</div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            GitHub Repositories
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-secondary rounded-full" />
        </motion.div>

        {stats && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Followers', value: stats.followers },
              { label: 'Public Repos', value: stats.publicRepos },
              { label: 'Total Stars', value: stats.totalStars },
              { label: 'Languages', value: stats.languagesCount },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-dark-tertiary rounded-lg p-6 border border-accent/10 text-center"
              >
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              className="bg-dark-tertiary rounded-lg p-6 border border-accent/10 hover:border-accent/30 transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 212, 255, 0.15)' }}
            >
              <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors mb-2">
                {repo.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{repo.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    {repo.language}
                  </span>
                )}
                {repo.topics.map((topic: string) => (
                  <span key={topic} className="px-2 py-1 bg-dark/50 text-gray-300 text-xs rounded-full">
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mb-4 text-sm text-gray-400">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>

              <Link
                href={repo.html_url}
                target="_blank"
                className="inline-block px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 transition-all rounded-lg text-sm font-medium"
              >
                View Repository →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubIntegration;
