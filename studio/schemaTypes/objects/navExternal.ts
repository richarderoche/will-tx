import { LaunchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'URL Link',
  name: 'navExternal',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Display Text',
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title: title ?? url,
        subtitle: title && url,
        media: LaunchIcon,
      }
    },
  },
})
