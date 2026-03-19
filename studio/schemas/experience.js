export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g. 2025 - Present',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'achievements',
      title: 'Achievements / Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first (most recent)',
    },
  ],
}
