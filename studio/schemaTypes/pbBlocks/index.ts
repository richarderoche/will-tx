import { defineType } from 'sanity'

export default defineType({
  title: 'Content Blocks',
  name: 'pbBlocks',
  type: 'array',
  of: [
    { title: 'Rich Text', type: 'pbBlockText' },
    { title: 'Plain Text', type: 'pbBlockPlainText' },
    { title: 'Numbered List', type: 'pbBlockNumberedList' },
    { title: 'Image', type: 'pbBlockImage' },
    { title: 'Video Embed', type: 'pbBlockVideoEmbed' },
    { title: 'Button', type: 'pbBlockButton' },
    { title: 'Divider/Spacer', type: 'pbBlockDivider' },
    { title: 'Team Member', type: 'pbBlockTeamMember' },
    { title: 'Scrolling Marquee', type: 'pbBlockMarquee' },
  ],
  options: {
    insertMenu: {
      groups: [
        {
          name: 'essential',
          title: 'Essential',
          of: [
            'pbBlockText',
            'pbBlockPlainText',
            'pbBlockNumberedList',
            'pbBlockImage',
            'pbBlockVideoEmbed',
            'pbBlockButton',
            'pbBlockDivider',
          ],
        },
        {
          name: 'specialty',
          title: 'Specialty',
          of: ['pbBlockTeamMember', 'pbBlockMarquee'],
        },
      ],
    },
  },
})
