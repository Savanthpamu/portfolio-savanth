import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client, urlFor } from '../lib/sanityClient';

const FALLBACK = {
  name: 'Savanth Pamu',
  role: 'Full Stack Developer',
  bio1: 'Passionate about creating innovative web solutions using modern technologies. With expertise in MongoDB, Express.js, React.js, Next.js, Node.js, and PHP, I specialize in building scalable and efficient web applications that deliver exceptional user experiences.',
  bio2: "Currently working at Edgroom, a product-based startup, where I'm building an education community platform that connects learners and educators. I thrive on turning complex problems into elegant, user-friendly solutions, combining technical expertise with creative problem-solving to deliver impactful educational technology.",
  profileImage: null,
};

const About = () => {
  const [about, setAbout] = React.useState(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '50px' });

  React.useEffect(() => {
    client.fetch(`*[_type == "about"][0]`).then(setAbout).catch(() => {});
  }, []);

  React.useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  const data = about || FALLBACK;
  const imgSrc = data.profileImage ? urlFor(data.profileImage).width(560).url() : '/savanth_pic.jpg';

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/SavanthPamu_resume (3).pdf';
    link.download = 'SavanthPamu_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-20 min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden flex items-center">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-gray-900/60 backdrop-blur-2xl"
        />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl mix-blend-lighten"
            style={{
              background: `radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 80%)`,
              width: `${220 + i * 80}px`,
              height: `${220 + i * 80}px`,
              left: `${10 + i * 30}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{ y: [0, 40, 0], x: [0, -30, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 1.2 }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 z-10 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px 0 #a78bfa99' }}
            className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/5 backdrop-blur-lg flex-shrink-0 mb-8 lg:mb-0"
            style={{ width: '280px', height: '420px' }}
          >
            <img
              src={imgSrc}
              alt={data.name}
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6 w-full max-w-2xl"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
                {data.name}
              </h3>
              <h4 className="text-xl sm:text-2xl lg:text-2xl font-semibold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
                {data.role}
              </h4>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{data.bio1}</p>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{data.bio2}</p>
            </div>

            <div className="text-center lg:text-left mt-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 24px #a78bfa' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadResume}
                className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base sm:text-lg tracking-wide overflow-hidden group w-full sm:w-auto"
              >
                <span className="relative z-10">Download Resume</span>
                <span className="absolute left-0 top-0 h-full w-full pointer-events-none">
                  <span className="block h-full w-full group-hover:animate-shine" style={{
                    background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                    opacity: 0.8,
                    transform: 'translateX(-100%)',
                  }}></span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
