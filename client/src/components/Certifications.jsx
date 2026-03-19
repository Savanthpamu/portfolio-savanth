import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const certificationsData = [
  {
    id: 1,
    title: 'React Developer Certification',
    issuer: 'Meta',
    date: '2024',
    credentialId: 'META-REACT-2024',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center',
    skills: ['React.js', 'JSX', 'Hooks', 'State Management'],
    verifyLink: '#',
    description: 'Comprehensive certification covering React fundamentals, advanced patterns, and best practices.'
  },
  {
    id: 2,
    title: 'Full Stack Web Development',
    issuer: 'freeCodeCamp',
    date: '2023',
    credentialId: 'FCC-FULLSTACK-2023',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center',
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    verifyLink: '#',
    description: 'Complete full-stack development certification covering frontend and backend technologies.'
  },
  {
    id: 3,
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023',
    credentialId: 'FCC-JS-2023',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center',
    skills: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving'],
    verifyLink: '#',
    description: 'Advanced JavaScript certification focusing on algorithms and data structures implementation.'
  },
  {
    id: 4,
    title: 'MongoDB Developer Certification',
    issuer: 'MongoDB University',
    date: '2024',
    credentialId: 'MONGO-DEV-2024',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop&crop=center',
    skills: ['MongoDB', 'Database Design', 'Aggregation', 'Indexing'],
    verifyLink: '#',
    description: 'Professional MongoDB certification covering database design, queries, and optimization.'
  }
];

const Certifications = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="certifications" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`cert-particle-${i}`}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            Certifications & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 mx-auto mb-6 rounded-full shadow-lg"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Professional certifications that validate my expertise in modern web development technologies
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700/50 hover:border-orange-500/50 scale-90 md:scale-90 lg:scale-90"
              whileHover={{ y: -4, scale: 0.96 }}
              onClick={() => setSelectedCert(cert)}
            >
              {/* Certificate Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
                {/* Orange accent overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating badge */}
                <div className="absolute top-2 right-2 bg-orange-500/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {cert.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 relative">
                {/* Orange accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500/70 to-transparent rounded-r-full" />
                <h3 className="text-lg font-bold mb-1 text-white group-hover:text-orange-400 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-orange-400 font-medium mb-2 text-sm">{cert.issuer}</p>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-md text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded-md text-[10px]">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                  >
                    View Details
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 border border-purple-500 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/10 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Verify
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for certificate details */}
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h3>
                  <p className="text-purple-400 font-medium">{selectedCert.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                  <p className="text-gray-300">{selectedCert.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Skills Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-md text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Issue Date</h4>
                    <p className="text-white">{selectedCert.date}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Credential ID</h4>
                    <p className="text-white font-mono text-sm">{selectedCert.credentialId}</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <a
                    href={selectedCert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg text-center font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Verify Certificate
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;