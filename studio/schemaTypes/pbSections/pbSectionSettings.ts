import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const margins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default defineType({
  title: 'Section Settings',
  name: 'pbSectionSettings',
  description: '(Show/Hide, Anchor ID, & Margins)',
  type: 'object',
  icon: CogIcon,
  fieldsets: [
    { title: 'Extra Padding', name: 'margin', options: { columns: 2 } },
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      title: 'Enable Section',
      name: 'enableSection',
      type: 'boolean',
      description: 'Disable to hide this section without deleting it',
      initialValue: true,
    }),
    defineField({
      title: 'Section Title',
      description: 'Only public if you generate an anchor link',
      name: 'sectionTitle',
      type: 'string',
    }),
    defineField({
      title: 'Enable Anchor Link',
      description: 'Enable if you want an anchor link to this section in the main navigation. Must have a section title above.',
      name: 'enableAnchorLink',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.sectionTitle,
    }),
    defineField({
      title: 'Color Theme',
      name: 'colorTheme',
      type: 'string',
      options: {
        list: [
          { title: 'Light (Default)', value: 'light-theme' },
          { title: 'Dark', value: 'dark-theme' },
        ],
      },
      initialValue: 'light-theme',
    }),
    defineField({
      title: 'Top',
      name: 'marginTop',
      type: 'number',
      fieldset: 'margin',
      options: {
        list: margins,
      },
    }),
    defineField({
      title: 'Bottom',
      name: 'marginBottom',
      type: 'number',
      fieldset: 'margin',
      options: {
        list: margins,
      },
    }),
    defineField({
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'image',
    }),
    defineField({
      title: 'Background Image Opacity (in %)',
      name: 'backgroundImageOpacity',
      type: 'number',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(1).max(100),
      hidden: ({ parent }) => !parent?.backgroundImage,
    }),
  ],
})
