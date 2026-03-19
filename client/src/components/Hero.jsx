import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { client } from '../lib/sanityClient';

const CIRCLE_POSITIONS = [
  { left: '10%', top: '15%' },
  { left: '60%', top: '5%' },
  { left: '80%', top: '50%' },
  { left: '25%', top: '70%' },
  { left: '50%', top: '40%' },
];

const PARTICLE_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  duration: 4 + (i % 3),
  delay: (i * 0.15) % 2,
}));

const FALLBACK = {
  name: 'Savanth',
  roles: ['MERN Stack Developer', 'Full Stack Engineer', 'Web Developer'],
  description: 'Building modern web applications with React.js, Next.js, Node.js, PHP, and the MERN stack',
};

const Hero = () => {
  const [hero, setHero] = React.useState(null);

  React.useEffect(() => {
    client.fetch(`*[_type == "hero"][0]`).then(setHero).catch(() => {});
  }, []);

  const data = hero || FALLBACK;
  const sequence = data.roles.flatMap((role) => [role, 2000]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at center, rgba(59,130,246,${0.1 + i * 0.05}) 0%, transparent 70%)`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: CIRCLE_POSITIONS[i].left,
              top: CIRCLE_POSITIONS[i].top,
            }}
            animate={{ x: [0, 30, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {PARTICLE_POSITIONS.map((pos, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            style={{ left: pos.left, top: pos.top }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{ duration: pos.duration, repeat: Infinity, ease: "linear", delay: pos.delay }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{data.name}</span>
          </motion.h1>

          <div className="text-xl sm:text-2xl text-gray-300 mb-8">
            <TypeAnimation
              key={sequence.join(',')}
              sequence={sequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            />
          </div>

          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {data.description}
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              href="#contact"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              Contact Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              href="#projects"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
