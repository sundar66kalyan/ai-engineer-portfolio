'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Experience = Database['public']['Tables']['experience']['Row'];

const Experience = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data } = await supabase
          .from('experience')
          .select('*')
          .order('start_date', { ascending: false });
        setExperience(data || []);
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) return null;

  return (
    <section id="experience" className="py-20 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-secondary rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent-secondary to-transparent transform -translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`md:flex gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="hidden md:flex justify-center">
                  <div className="relative z-10">
                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-dark" />
                  </div>
                </div>

                <div className="md:w-1/2">
                  <motion.div
                    className="bg-dark-tertiary rounded-lg p-6 border border-accent/10"
                    whileHover={{ borderColor: 'rgba(0, 212, 255, 0.3)' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                      {exp.current && (
                        <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full font-semibold">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-accent font-semibold mb-3">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(exp.start_date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                      {' - '}
                      {exp.end_date
                        ? new Date(exp.end_date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Present'}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
