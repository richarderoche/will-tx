import { ListOrdered } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { textColorOptions, textStyleOptions } from './pbBlockPlainText'

export default defineType({
  name: 'pbBlockNumberedList',
  title: 'Numbered List',
  type: 'object',
  icon: ListOrdered,
  fields: [
    defineField({
      title: 'Text Style',
      name: 'textStyle',
      type: 'string',
      options: {
        list: textStyleOptions,
      },
      initialValue: 'ts-p-md',
    }),
    defineField({
      title: 'Color',
      name: 'color',
      type: 'string',
      initialValue: 'text-body',
      options: {
        list: textColorOptions,
      },
    }),
    defineField({
      title: 'Balance Lines?',
      name: 'balanceLines',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'textContent',
              title: 'Text',
              type: 'text',
              rows: 3,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      textContent: 'textContent',
      textStyle: 'textStyle',
    },
    prepare({ textContent, textStyle }) {
      const bodyTextSizeText =
        textStyleOptions.find((o) => o.value === textStyle)?.title ?? 'Default'
      return {
        title: 'Text: ' + bodyTextSizeText,
        subtitle: textContent ? textContent : 'No Text',
        media: ListOrdered,
      }
    },
  },
})
