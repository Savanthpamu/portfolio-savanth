export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Job Title',
      type: 'string',
      description: 'e.g. Full Stack Developer',
    },
    {
      name: 'bio1',
      title: 'Bio Paragraph 1',
      type: 'text',
    },
    {
      name: 'bio2',
      title: 'Bio Paragraph 2',
      type: 'text',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
