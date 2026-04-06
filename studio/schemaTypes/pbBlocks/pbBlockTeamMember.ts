import { SquareUserRound } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pbBlockTeamMember',
  title: 'Team Member',
  type: 'object',
  icon: SquareUserRound,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: {
          previews: [{ title: '4:5', aspectRatio: 0.8 }],
        },
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'accreditation',
      title: 'Accreditation',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      position: 'position',
      accreditation: 'accreditation',
      image: 'image',
    },
    prepare({ name, position, accreditation, image }) {
      const positionText = position ? position : ''
      const accreditationText = accreditation ? accreditation : ''
      const subtitleArray = [positionText, accreditationText]
      const subtitle = subtitleArray.filter((s) => s !== '').join(' / ')
      return {
        title: name ? name : 'No Name',
        subtitle: subtitle,
        media: image ? image : SquareUserRound,
      }
    },
  },
})
