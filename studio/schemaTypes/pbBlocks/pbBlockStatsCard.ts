import { defineField, defineType } from 'sanity'
import { statsCardIcon } from '../../lib/customIcons'

export const modifierOptions = [
  { title: 'None', value: 'none' },
  { title: '<', value: 'less' },
  { title: '>', value: 'more' },
  { title: '+', value: 'plus' },
  { title: '-', value: 'minus' },
  { title: '~', value: 'about' },
]

export default defineType({
  name: 'pbBlockStatsCard',
  title: 'Stats Card',
  type: 'object',
  icon: statsCardIcon,
  fields: [
    defineField({
      title: 'Background Color',
      name: 'bgColor',
      type: 'string',
      initialValue: 'bg-bg-subtle',
      options: {
        list: [
          { title: 'Tan', value: 'bg-bg-subtle' },
          { title: 'Salmon', value: 'bg-salmon' },
        ],
      },
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'modifier',
              title: 'Modifier',
              type: 'string',
              initialValue: 'none',
              options: {
                list: modifierOptions,
              },
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
            }),
            defineField({
              name: 'includeDollarSign',
              title: 'Include Dollar Sign?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'unit',
              title: 'Unit (Optional. E.g. "%", "B", "mg", etc.)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              modifier: 'modifier',
              value: 'value',
              includeDollarSign: 'includeDollarSign',
              unit: 'unit',
            },
            prepare({ label, modifier, value, includeDollarSign, unit }) {
              const modifierText =
                modifier && modifier !== 'none'
                  ? modifierOptions.find((o) => o.value === modifier)?.title
                  : ''
              const valueText = value ? value : 0
              const unitText = unit ? unit : ''
              const text = `${modifierText ? modifierText : ''} ${includeDollarSign ? '$' : ''}${valueText}${unitText ? unitText : ''}`
              return {
                title: label ? label : 'No Label',
                subtitle: text,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? `Stats Card: ${title}` : 'Stats Card',
        media: statsCardIcon,
      }
    },
  },
})
