import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client } from '../lib/sanityClient';

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    title: 'Verirate Project',
    description: 'A streamlined platform for efficient workforce management, providing administrators with tools to manage employees, track performance, and oversee company workflows.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    features: [
      'User-Friendly Dashboard – Built with React.js and styled using Tailwind CSS',
      'Employee Data Management – HR and managers can add, edit, and organize employee records',
      'Backend & Database – Developed with Node.js and Express.js, with PostgreSQL for secure data storage',
      'Role-Based Access Control – Different permission levels for admins, managers, and employees',
      'Attendance & Performance Tracking – Real-time tracking of employee attendance and work hours',
      'Dynamic API Integration – Uses REST APIs to fetch, update, and manage employee data seamlessly'
    ],
    liveLink: '#',
    githubLink: 'https://github.com/savanthpamu',
    featured: true,
    comingSoon: false,
  },
  {
    _id: '2',
    title: 'Project Coming Soon',
    description: 'New exciting project in development. Stay tuned for updates!',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['To be updated'],
    liveLink: '#',
    githubLink: '#',
    comingSoon: true,
  },
  {
    _id: '3',
    title: 'Project Coming Soon',
    description: 'Another innovative project in the pipeline. More details coming soon!',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['To be updated'],
    liveLink: '#',
    githubLink: '#',
    comingSoon: true,
  },
];

const Projects = () => {
  const [projects, setProjects] = React.useState(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  React.useEffect(() => {
    client
      .fetch(`*[_type == "project"] | order(order asc)`)
      .then(setProjects)
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  const projectsData = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <section id="projects" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              animate={hasAnimated ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: index * 0.2 }
              } : { opacity: 0, y: 50 }}
              className={`group relative bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                project.comingSoon ? 'opacity-75' : ''
              }`}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {project.featured && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}

                {project.comingSoon && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                {project.features && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">Key Features:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies && project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.comingSoon ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-blue-400'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: project.comingSoon ? 1 : 1.05 }}
                    whileTap={{ scale: project.comingSoon ? 1 : 0.95 }}
                    href={project.comingSoon ? '#' : project.liveLink}
                    target={project.comingSoon ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className={`flex-1 px-4 py-2 rounded-lg text-center font-medium transition-all duration-300 ${
                      project.comingSoon
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                    }`}
                  >
                    {project.comingSoon ? 'Coming Soon' : 'Live Demo'}
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: project.comingSoon ? 1 : 1.05 }}
                    whileTap={{ scale: project.comingSoon ? 1 : 0.95 }}
                    href={project.comingSoon ? '#' : project.githubLink}
                    target={project.comingSoon ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className={`flex-1 px-4 py-2 rounded-lg text-center font-medium transition-all duration-300 ${
                      project.comingSoon
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
