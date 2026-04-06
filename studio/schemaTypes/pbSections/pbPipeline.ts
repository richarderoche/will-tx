import { Blend } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthField } from '../fields'

export default defineType({
  title: 'Pipeline',
  name: 'pbPipeline',
  type: 'object',
  icon: Blend,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthField),
    defineField({
      title: 'Small Circle',
      name: 'smallCircle',
      type: 'object',
      fields: [
        defineField({
          title: 'Label',
          name: 'label',
          type: 'string',
        }),
        defineField({
          title: 'List',
          name: 'list',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      title: 'Big Circle',
      name: 'bigCircle',
      type: 'object',
      fields: [
        defineField({
          title: 'Label',
          name: 'label',
          type: 'string',
        }),
        defineField({
          title: 'List',
          name: 'list',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      rowWidth: 'rowWidth',
      title: 'sectionSettings.sectionTitle',
      anchor: 'sectionSettings.enableAnchorLink',
    },
    prepare({ rowWidth, title, anchor }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      return {
        title: title
          ? `${anchor ? '⚓ ' : ''}${title}`
          : 'Pipeline Infographic',
        subtitle: `${rowWidthTitle} Width`,
        media: Blend,
      }
    },
  },
})
