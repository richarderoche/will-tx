import { defineType } from 'sanity'

export default defineType({
  name: 'ptSingle',
  title: 'RTE',
  type: 'array',
  of: [
    {
      type: 'block',
      options: {
        oneLine: true,
      },
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
      },
      styles: [],
      lists: [],
    },
  ],
})
