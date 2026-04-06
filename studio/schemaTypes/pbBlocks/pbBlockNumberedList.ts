import { ListOrdered } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import {
  fontWeightOptions,
  textColorOptions,
  textStyleOptions,
} from './pbBlockPlainText'

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
      title: 'Font Weight',
      name: 'fontWeight',
      type: 'string',
      initialValue: 'font-normal',
      options: {
        list: fontWeightOptions,
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
          preview: {
            select: {
              textContent: 'textContent',
            },
            prepare({ textContent }) {
              return {
                title: textContent ? textContent : 'No Text',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      listItems: 'listItems',
      textStyle: 'textStyle',
    },
    prepare({ listItems = 0, textStyle }) {
      const count = listItems ? listItems.length : 0
      const bodyTextSizeText =
        textStyleOptions.find((o) => o.value === textStyle)?.title ?? 'Default'
      return {
        title: 'Numbered List',
        subtitle: 'Items: ' + count,
        media: ListOrdered,
      }
    },
  },
})
