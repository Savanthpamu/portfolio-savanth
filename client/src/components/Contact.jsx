import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlineChatAlt2, HiOutlineLocationMarker, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const cardVariants = {
  offscreen: { opacity: 0, y: 80, rotateY: -20 },
  onscreen: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: { type: 'spring', bounce: 0.25, duration: 1.1 }
  }
};

const messageSuggestions = [
  'I am interested in working with you.',
  'Can you tell me more about your experience?',
  'Let’s schedule a call to discuss further.',
  'I would like to collaborate on a project.',
  'Can you send me your resume?',
  'Thank you for your time!',
  'I have a question about your portfolio.',
  'How can I get in touch for a freelance project?',
  'Can you share your availability for a meeting?',
  'I am impressed by your work!',
  'Let’s connect and discuss opportunities.',
  'Could you provide more details about your services?',
  'I would like to know your rates.',
  'How soon can you start on a new project?',
  'Do you offer remote collaboration?'
];

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [activeField, setActiveField] = useState('');
  const [showMsgSuggestions, setShowMsgSuggestions] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'message') {
      setShowMsgSuggestions(true);
    }
  };

  const handleFocus = (field) => {
    setActiveField(field);
    if (field === 'message') setShowMsgSuggestions(true);
  };
  const handleBlur = () => {
    setActiveField('');
    setTimeout(() => setShowMsgSuggestions(false), 200); // allow click on suggestion
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, message: suggestion });
    setShowMsgSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5005'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch {
      clearTimeout(timeoutId);
      setStatus('error');
    }
    setTimeout(() => setStatus(''), 5000);
  };


  // Filter message suggestions based on input
  const filteredSuggestions = formData.message
    ? messageSuggestions.filter(s => s.toLowerCase().includes(formData.message.toLowerCase()) && s.toLowerCase() !== formData.message.toLowerCase())
    : messageSuggestions;


  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background gradients and floating shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-gray-900/60 backdrop-blur-2xl"
        />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl mix-blend-lighten"
            style={{
              background: `radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 80%)`,
              width: `${220 + i * 80}px`,
              height: `${220 + i * 80}px`,
              left: `${5 + i * 30}%`,
              top: `${10 + i * 25}%`,
            }}
            animate={{
              y: [0, 40, 0],
              x: [0, -30, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 mx-auto rounded-full shadow-lg" />
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-stretch justify-center">
          {/* Contact Info Card with 3D/tilt effect */}
          <motion.div
            whileHover={{ scale: 1.04, rotateY: 8, boxShadow: '0 8px 40px 0 #6366f1cc' }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="flex-1 flex flex-col justify-between bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 mb-6 md:mb-0 border border-white/20 hover:border-blue-400/40 cursor-pointer transform-gpu"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-blue-300 text-2xl"><HiOutlineMail /></span>
                <div>
                  <h4 className="font-semibold text-gray-200">Email</h4>
                  <a href="mailto:savanthpamu333@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">savanthpamu333@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-purple-300 text-2xl"><HiOutlineLocationMarker /></span>
                <div>
                  <h4 className="font-semibold text-gray-200">Location</h4>
                  <p className="text-gray-300">Hyderabad</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-200 mb-3">Connect With Me</h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/savanthpamu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 text-xl shadow-lg"
                  whileHover={{ scale: 1.15, rotate: -8 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href="https://github.com/savanthpamu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300 text-xl shadow-lg"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                >
                  <FaGithub />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card with 3D/tilt effect and disappearing labels */}
          <motion.div
            whileHover={{ scale: 1.04, rotateY: -8, boxShadow: '0 8px 40px 0 #a78bfa99' }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="flex-1 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 hover:border-orange-400/40 relative cursor-pointer transform-gpu"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
              {/* Name Field */}
              <div className="relative mt-2">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none z-10" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-black/40 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-black/60 transition-all duration-300 peer shadow-md placeholder-gray-400 hover:bg-black/60 hover:border-blue-400 hover:shadow-blue-400/10"
                  placeholder="Name"
                  id="contact-name"
                  autoComplete="off"
                />
              </div>
              {/* Email Field */}
              <div className="relative mt-2">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none z-10" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-black/40 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-black/60 transition-all duration-300 peer shadow-md placeholder-gray-400 hover:bg-black/60 hover:border-purple-400 hover:shadow-purple-400/10"
                  placeholder="Email"
                  id="contact-email"
                  autoComplete="email"
                />
              </div>
              {/* Message Field with suggestions */}
              <div className="relative mt-2">
                <HiOutlineChatAlt2 className="absolute left-4 top-6 text-orange-400 text-xl pointer-events-none z-10" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows="4"
                  className="w-full pl-12 pr-4 py-3 bg-black/40 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-black/60 transition-all duration-300 peer resize-none shadow-md placeholder-gray-400 hover:bg-black/60 hover:border-orange-400 hover:shadow-orange-400/10"
                  placeholder="Message"
                  id="contact-message"
                  autoComplete="off"
                />
                {/* Suggestions dropdown */}
                <AnimatePresence>
                  {showMsgSuggestions && filteredSuggestions.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-black/90 border border-orange-400 rounded-lg shadow-lg z-30 text-sm text-gray-200 max-h-52 overflow-y-auto"
                    >
                      {filteredSuggestions.map((s, i) => (
                        <li
                          key={i}
                          className="px-4 py-2 hover:bg-orange-500/20 cursor-pointer transition-colors"
                          onMouseDown={() => handleSuggestionClick(s)}
                        >
                          {s}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full relative bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60 text-lg tracking-wide overflow-hidden group"
                whileHover={{}}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10">{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                {/* Shine effect (silver) */}
                <span className="absolute left-0 top-0 h-full w-full pointer-events-none">
                  <span className="block h-full w-full group-hover:animate-shine" style={{
                    background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                    opacity: 0.8,
                    transform: 'translateX(-100%)',
                  }}></span>
                </span>
              </motion.button>
              {/* Status Messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg mt-2 text-green-300 shadow"
                  >
                    <HiOutlineCheckCircle className="text-green-400 text-xl" />
                    <span>Message sent successfully. I appreciate your interest and will get back to you promptly.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg mt-2 text-red-300 shadow"
                  >
                    <HiOutlineExclamationCircle className="text-red-400 text-xl" />
                    <span>Failed to send message. Please try again or contact me directly.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;