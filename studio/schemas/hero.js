export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Your Name',
      type: 'string',
      description: 'e.g. Savanth',
    },
    {
      name: 'roles',
      title: 'Typing Roles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Roles that cycle in the typing animation (e.g. MERN Stack Developer)',
    },
    {
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      description: 'Short paragraph shown below the typing animation',
    },
  ],
}
