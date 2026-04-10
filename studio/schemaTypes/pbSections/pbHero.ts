import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { IconHero } from '../../lib/customIcons'

export default defineType({
  title: 'Hero Section',
  name: 'pbHero',
  type: 'object',
  icon: IconHero,
  fields: [
    defineField({
      title: 'Section Settings',
      name: 'sectionSettingsSlim',
      type: 'object',
      icon: CogIcon,
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          title: 'Section Visibility',
          name: 'enableSection',
          type: 'boolean',
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
          description:
            'Enable if you want an anchor link to this section in the main navigation. Must have a section title above.',
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
          title: 'Background Image',
          name: 'backgroundImage',
          type: 'image',
        }),
      ],
    }),
    defineField({
      title: 'Left Column Content',
      name: 'pbBlocks',
      type: 'pbBlocks',
    }),
    defineField({
      title: 'Image Grid Blush Tint',
      name: 'imageGridBlushTint',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Image Grid (Rounds to first 1, 4, or 9 images)',
      name: 'imageGrid',
      type: 'array',
      validation: (Rule) => Rule.max(9).min(1),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: {
                  previews: [{ title: '3:4', aspectRatio: 0.75 }],
                },
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Image Alt Text',
              name: 'imageAltText',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      sectionName: 'sectionSettings.sectionTitle',
      anchor: 'sectionSettings.enableAnchorLink',
    },
    prepare({ sectionName, anchor }) {
      return {
        title: sectionName
          ? `${anchor ? '⚓ ' : ''}${sectionName}`
          : 'Hero Section',
        media: IconHero,
      }
    },
  },
})
