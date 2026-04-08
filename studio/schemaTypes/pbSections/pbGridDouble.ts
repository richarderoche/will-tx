import { IconLayoutColumns } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle } from '../../lib/utils'
import { rowWidthField } from '../fields'

export default defineType({
  title: 'Grid: Two Column',
  name: 'pbGridDouble',
  type: 'object',
  icon: IconLayoutColumns,
  fieldsets: [
    {
      title: 'Desktop & Tablet',
      name: 'desktopTablet',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthField),
    defineField({
      title: 'Column Proportions',
      name: 'columnProportions',
      type: 'string',
      initialValue: '50-50',
      fieldset: 'desktopTablet',
      options: {
        list: [
          { title: '50-50', value: '50-50' },
          { title: '60-40', value: '60-40' },
          { title: '40-60', value: '40-60' },
        ],
      },
    }),
    defineField({
      title: 'Vertical Alignment',
      name: 'yAlignment',
      type: 'string',
      initialValue: 'items-start',
      fieldset: 'desktopTablet',
      hidden: ({ parent }) => parent?.showGridLines,
      options: {
        list: [
          { title: 'Top', value: 'items-start' },
          { title: 'Middle', value: 'items-center' },
          { title: 'Bottom', value: 'items-end' },
        ],
      },
    }),
    defineField({
      title: 'Column One',
      name: 'columnOne',
      type: 'column',
    }),
    defineField({
      title: 'Column Two',
      name: 'columnTwo',
      type: 'column',
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionSettings.sectionTitle',
      rowWidth: 'rowWidth',
      anchor: 'sectionSettings.enableAnchorLink',
    },
    prepare({ sectionName, rowWidth, anchor }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      return {
        title: sectionName
          ? `${anchor ? '⚓ ' : ''}${sectionName}`
          : 'Two Column Grid',
        subtitle: `${rowWidthTitle} Width`,
        media: IconLayoutColumns,
      }
    },
  },
})
