import { IconLayoutRows } from '@tabler/icons-react'
import { defineField, defineType } from 'sanity'
import { getRowWidthTitle, getTypeTitles } from '../../lib/utils'
import { rowWidthField } from '../fields'
import { columnFields } from './column'

export default defineType({
  title: 'Grid: Single Column',
  name: 'pbGridSingle',
  type: 'object',
  icon: IconLayoutRows,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettings',
      type: 'pbSectionSettings',
    }),
    defineField(rowWidthField),
    ...columnFields,
  ],
  preview: {
    select: {
      sectionName: 'sectionSettings.sectionTitle',
      rowWidth: 'rowWidth',
      blocks: 'pbBlocks',
      anchor: 'sectionSettings.enableAnchorLink',
    },
    prepare({ sectionName, rowWidth, blocks, anchor }) {
      const rowWidthTitle = getRowWidthTitle(rowWidth)
      const blockList = blocks ? blocks.map((block: any) => block._type) : []
      const blockTitles = getTypeTitles(blockList)
      return {
        title: sectionName
          ? `${anchor ? '⚓ ' : ''}${sectionName}`
          : 'Single Column Section',
        subtitle: `${rowWidthTitle} Width / Blocks: ${blockTitles || 'None'}`,
        media: IconLayoutRows,
      }
    },
  },
})
