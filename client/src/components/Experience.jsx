import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineBriefcase, HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineCheckCircle } from 'react-icons/hi2';
import { client } from '../lib/sanityClient';

const FALLBACK_EXPERIENCE = [
  {
    _id: '1',
    title: 'Full Stack Developer',
    company: 'Edgroom',
    period: '2025 - Present',
    description: 'Currently working at Edgroom, a product-based startup focused on building an innovative education community platform that connects learners, educators, and industry professionals.',
    achievements: [
      'Developing and maintaining the main website using modern web technologies including React.js, Next.js, and PHP',
      'Building responsive and interactive user interfaces for the education community platform',
      'Implementing features for course management, user profiles, community discussions, and learning analytics',
      'Collaborating with cross-functional teams to deliver high-quality educational technology solutions',
      'Working on both frontend and backend development to create seamless user experiences',
      "Contributing to the platform's scalability and performance optimization for growing user base"
    ],
    order: 1,
  },
  {
    _id: '2',
    title: 'Junior Full Stack Developer',
    company: 'Busitron IT Solutions',
    period: '2025',
    description: 'Worked as a Junior Full Stack Developer, focusing on web application development using the MERN stack.',
    achievements: [
      'Developed and maintained web applications using React.js and Node.js',
      'Collaborated with team members on various projects',
      'Implemented responsive designs and user-friendly interfaces'
    ],
    order: 2,
  },
  {
    _id: '3',
    title: 'MERN Stack Intern',
    company: 'Busitron IT Solutions',
    period: '2024',
    description: 'Completed internship program focusing on MERN stack development.',
    achievements: [
      'Learned and applied MERN stack technologies in real-world projects',
      'Participated in development of web applications',
      'Gained hands-on experience with MongoDB, Express.js, React.js, and Node.js'
    ],
    order: 3,
  }
];

const Experience = () => {
  const [experience, setExperience] = React.useState(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '50px' });

  React.useEffect(() => {
    client.fetch(`*[_type == "experience"] | order(order asc)`).then(setExperience).catch(() => {});
  }, []);

  React.useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  const experienceData = experience && experience.length > 0 ? experience : FALLBACK_EXPERIENCE;
  const currentIdx = experienceData.findIndex(e => e.period && e.period.includes('Present'));

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-gray-900/60 backdrop-blur-2xl"
        />
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl mix-blend-lighten"
            style={{
              background: `radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 80%)`,
              width: `${180 + i * 80}px`,
              height: `${180 + i * 80}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{ y: [0, 40, 0], x: [0, -30, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 1.2 }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 mx-auto mb-6"></div>
        </motion.div>

        <div className="relative flex flex-col items-start md:items-center">
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-400 z-0" />

          <div className="w-full flex flex-col gap-12">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 40 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative z-10 flex items-center group ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-shrink-0 flex flex-col items-center mr-4 md:mr-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-20">
                  <div className={`w-8 h-8 rounded-full border-4 border-gray-900 shadow-lg ${idx === currentIdx ? 'bg-gradient-to-br from-yellow-300 via-orange-400 to-white animate-gold-glow' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400'}`} />
                </div>
                <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 md:p-6 group-hover:scale-105 transition-transform duration-300 relative ml-0 md:ml-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-blue-400 text-2xl"><HiOutlineBriefcase /></span>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {exp.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-purple-400 text-lg"><HiOutlineBuildingOffice2 /></span>
                    <span className="text-purple-300 font-medium text-sm">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-orange-400 text-lg"><HiOutlineCalendar /></span>
                    <span className="text-orange-300 text-xs font-mono">{exp.period}</span>
                  </div>
                  <p className="text-gray-300 mb-3 text-sm">{exp.description}</p>
                  <ul className="list-none space-y-2">
                    {exp.achievements && exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-200 text-xs">
                        <HiOutlineCheckCircle className="mt-0.5 text-green-400 text-base" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
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
