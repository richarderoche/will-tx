import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seoGlobal',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      title: 'Used for the <meta> description tag',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        ),
    }),
    defineField({
      name: 'image',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'Displayed on social cards and search engine results. Recommended size: 1200x627 (PNG or JPG)',
      options: {
        hotspot: true,
      },
    }),
  ],
})
