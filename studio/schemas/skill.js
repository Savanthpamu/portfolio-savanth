export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      description: 'Must match exactly: MongoDB, Express.js, React.js, Next.js, Node.js, PHP, JavaScript, TypeScript, HTML/CSS, Git',
    },
    {
      name: 'level',
      title: 'Proficiency Level (0-100)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first',
    },
  ],
}
