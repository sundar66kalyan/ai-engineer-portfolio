'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, 50, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-accent-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            y: [0, -50, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            y: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item} className="mb-6">
          <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium inline-block">
            Welcome to My Portfolio
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent"
        >
          AI Engineer & Full-Stack Developer
        </motion.h1>

        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Building intelligent systems and scalable applications with Next.js, AI/ML, and modern cloud technologies.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-accent to-accent-secondary rounded-lg font-semibold text-dark hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            View My Work
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 border-2 border-accent rounded-lg font-semibold text-accent hover:bg-accent/10 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm">Scroll to explore</span>
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
