import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiGit
} from 'react-icons/si';
import { client } from '../lib/sanityClient';

const BLOB_POSITIONS = [
  { left: '5%', top: '10%' },
  { left: '45%', top: '30%' },
  { left: '75%', top: '60%' },
];

// Icon + color map keyed by skill name (from Sanity)
const SKILL_META = {
  'MongoDB':    { icon: SiMongodb,    color: 'from-green-500 to-green-700',   bgColor: 'bg-green-500/10',   borderColor: 'border-green-500/20',   iconColor: 'text-green-500' },
  'Express.js': { icon: SiExpress,    color: 'from-gray-600 to-gray-800',     bgColor: 'bg-gray-500/10',    borderColor: 'border-gray-500/20',    iconColor: 'text-gray-400' },
  'React.js':   { icon: SiReact,      color: 'from-blue-400 to-blue-600',     bgColor: 'bg-blue-500/10',    borderColor: 'border-blue-500/20',    iconColor: 'text-blue-500' },
  'Next.js':    { icon: SiNextdotjs,  color: 'from-indigo-600 to-purple-700', bgColor: 'bg-indigo-500/10',  borderColor: 'border-indigo-500/20',  iconColor: 'text-indigo-500' },
  'Node.js':    { icon: SiNodedotjs,  color: 'from-green-600 to-green-800',   bgColor: 'bg-green-600/10',   borderColor: 'border-green-600/20',   iconColor: 'text-green-600' },
  'PHP':        { icon: SiPhp,        color: 'from-purple-500 to-purple-700', bgColor: 'bg-purple-500/10',  borderColor: 'border-purple-500/20',  iconColor: 'text-purple-500' },
  'JavaScript': { icon: SiJavascript, color: 'from-yellow-400 to-yellow-600', bgColor: 'bg-yellow-500/10',  borderColor: 'border-yellow-500/20',  iconColor: 'text-yellow-500' },
  'TypeScript': { icon: SiTypescript, color: 'from-blue-500 to-blue-700',     bgColor: 'bg-blue-600/10',    borderColor: 'border-blue-600/20',    iconColor: 'text-blue-600' },
  'HTML/CSS':   { icon: SiHtml5,      color: 'from-orange-500 to-red-500',    bgColor: 'bg-orange-500/10',  borderColor: 'border-orange-500/20',  iconColor: 'text-orange-500' },
  'Git':        { icon: SiGit,        color: 'from-orange-600 to-red-600',    bgColor: 'bg-orange-600/10',  borderColor: 'border-orange-600/20',  iconColor: 'text-orange-600' },
};

const DEFAULT_META = { icon: SiReact, color: 'from-blue-400 to-purple-600', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20', iconColor: 'text-blue-400' };

const FALLBACK_SKILLS = [
  { _id: '1', name: 'MongoDB',    level: 90, order: 1 },
  { _id: '2', name: 'Express.js', level: 85, order: 2 },
  { _id: '3', name: 'React.js',   level: 95, order: 3 },
  { _id: '4', name: 'Next.js',    level: 88, order: 4 },
  { _id: '5', name: 'Node.js',    level: 88, order: 5 },
  { _id: '6', name: 'PHP',        level: 82, order: 6 },
  { _id: '7', name: 'JavaScript', level: 92, order: 7 },
  { _id: '8', name: 'TypeScript', level: 80, order: 8 },
  { _id: '9', name: 'HTML/CSS',   level: 90, order: 9 },
  { _id: '10', name: 'Git',       level: 85, order: 10 },
];

const Skills = () => {
  const [skills, setSkills] = React.useState(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '50px' });

  React.useEffect(() => {
    client.fetch(`*[_type == "skill"] | order(order asc)`).then(setSkills).catch(() => {});
  }, []);

  React.useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  const skillsData = skills && skills.length > 0 ? skills : FALLBACK_SKILLS;

  return (
    <section id="skills" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.1) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at center, rgba(59,130,246,${0.1 + i * 0.05}) 0%, transparent 70%)`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: BLOB_POSITIONS[i].left,
              top: BLOB_POSITIONS[i].top,
            }}
            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div ref={ref} initial="hidden" animate={hasAnimated ? "visible" : "hidden"} className="text-center mb-16">
          <motion.h2
            className="text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent"
              initial={{ scaleX: 0 }}
              animate={hasAnimated ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ originX: 0 }}
            >
              Skills
            </motion.span>
            <motion.span
              className="text-white"
              initial={{ opacity: 0 }}
              animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {" "}&{" "}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent"
              initial={{ scaleX: 0 }}
              animate={hasAnimated ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ originX: 1 }}
            >
              Technologies
            </motion.span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={hasAnimated ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.p
            className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            My expertise spans across modern web technologies, from frontend frameworks to backend development and database management.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => {
            const meta = SKILL_META[skill.name] || DEFAULT_META;
            const IconComponent = meta.icon;
            return (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 30 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ease-out hover:transform hover:translate-y-[-8px] hover:shadow-xl ${meta.bgColor} ${meta.borderColor} border`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 ${meta.iconColor}`}>
                        <IconComponent className="w-6 h-6 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-lg font-semibold text-white">{skill.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-gray-800/50 rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={hasAnimated ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${meta.color} relative`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.1 + 1 }}
                      />
                    </motion.div>
                  </div>

                  <div className="mt-3 flex justify-between text-xs text-gray-400">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm">Continuously learning and expanding my skill set</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
