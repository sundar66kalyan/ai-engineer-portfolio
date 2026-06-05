'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';
import Link from 'next/link';

type Certification = Database['public']['Tables']['certifications']['Row'];

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data } = await supabase
          .from('certifications')
          .select('*')
          .order('issued_date', { ascending: false });
        setCertifications(data || []);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            Certifications & Credentials
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-secondary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="bg-dark-tertiary rounded-lg p-6 border border-accent/10 hover:border-accent/30 transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 212, 255, 0.15)' }}
            >
              <div className="flex items-start gap-4 mb-4">
                {cert.icon_url && (
                  <img
                    src={cert.icon_url}
                    alt={cert.issuer}
                    className="w-12 h-12 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-accent text-sm">{cert.issuer}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Issued {new Date(cert.issued_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              {cert.credential_url && (
                <Link
                  href={cert.credential_url}
                  target="_blank"
                  className="inline-block px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 transition-all rounded-lg text-sm font-medium"
                >
                  View Credential →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
