'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Skill = Database['public']['Tables']['skills']['Row'];

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await supabase
          .from('skills')
          .select('*')
          .order('category', { ascending: true });
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">Loading...</div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-secondary rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      className="bg-dark-tertiary rounded-xl p-6 border border-accent/10 hover:border-accent/30 transition-all duration-300 group cursor-pointer"
                      whileHover={{ y: -10, boxShadow: '0 10px 40px rgba(0, 212, 255, 0.2)' }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                          {skill.name}
                        </h4>
                        {skill.icon_url && (
                          <img
                            src={skill.icon_url}
                            alt={skill.name}
                            className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </div>
                      <div className="w-full bg-dark/50 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-accent to-accent-secondary h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-2">{skill.proficiency}%</p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
