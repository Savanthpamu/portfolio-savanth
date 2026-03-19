export default {
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Certificate Title',
      type: 'string',
    },
    {
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2024',
    },
    {
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Certificate Image URL',
      type: 'url',
    },
    {
      name: 'skills',
      title: 'Skills Covered',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'verifyLink',
      title: 'Verify Link',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
}
