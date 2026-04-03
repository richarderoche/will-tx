import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '',
  deployment: { appId: 'hwz6ony6v6fntep3ewl1koyt', autoUpdates: false },
  typegen: {
    path: './src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
