import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes, singletonSchemaTypes } from './schemaTypes'
import { pageStructure } from './structure'

//import { muxInput } from 'sanity-plugin-mux-input'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

/*const muxConfig = {
  max_resolution_tier: '2160p',
  encoding_tier: 'smart',
  allowedRolesForConfiguration: ['administrator'],
}
*/
export default defineConfig({
  name: 'default',
  title: 'Sanity / Will TX',

  projectId: projectId,
  dataset: dataset,

  scheduledDrafts: {
    enabled: false,
  },

  releases: {
    enabled: false,
  },

  plugins: [
    // The order determines the order in the studio menu
    structureTool({
      structure: pageStructure(singletonSchemaTypes),
    }),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: { enable: '/api/draft-mode/enable' },
      },
    }),
    //muxInput(muxConfig),
    ...(process.env.NODE_ENV !== 'production' ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },
})
