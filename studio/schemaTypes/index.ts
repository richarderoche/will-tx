//import page from './documents/page'
import navExternal from './objects/navExternal'
import ptBasic from './objects/ptBasic'
import ptBody from './objects/ptBody'
import ptSingle from './objects/ptSingle'
import ptSlim from './objects/ptSlim'
import seo from './objects/seo'
import seoGlobal from './objects/seoGlobal'
import socialLink from './objects/socialLink'
import pbBlocks from './pbBlocks'
import pbBlockButton from './pbBlocks/pbBlockButton'
import pbBlockDivider from './pbBlocks/pbBlockDivider'
import pbBlockImage from './pbBlocks/pbBlockImage'
import pbBlockMarquee from './pbBlocks/pbBlockMarquee'
import pbBlockNumberedList from './pbBlocks/pbBlockNumberedList'
import pbBlockPlainText from './pbBlocks/pbBlockPlainText'
import pbBlockTeamMember from './pbBlocks/pbBlockTeamMember'
import pbBlockText from './pbBlocks/pbBlockText'
import pbBlockVideoEmbed from './pbBlocks/pbBlockVideoEmbed'
import pbSections from './pbSections'
import column from './pbSections/column'
import pbColSettings from './pbSections/pbColSettings'
import pbGridDouble from './pbSections/pbGridDouble'
import pbGridMulti from './pbSections/pbGridMulti'
import pbGridSingle from './pbSections/pbGridSingle'
import pbPipeline from './pbSections/pbPipeline'
import pbSectionSettings from './pbSections/pbSectionSettings'
import home from './singletons/home'
import settings from './singletons/settings'

export const singletonSchemaTypes = [home, settings]

export const schemaTypes = [
  // Singletons
  home,
  settings,
  // Documents
  //page,
  // Objects
  column,
  navExternal,
  //navLinks,
  //navPage,
  pbBlockImage,
  pbBlockButton,
  pbBlocks,
  pbBlockDivider,
  pbBlockMarquee,
  pbBlockNumberedList,
  pbBlockPlainText,
  pbBlockTeamMember,
  pbBlockText,
  pbBlockVideoEmbed,
  pbColSettings,
  pbGridMulti,
  pbGridSingle,
  pbGridDouble,
  pbPipeline,
  pbSections,
  pbSectionSettings,
  ptBasic,
  ptBody,
  ptSingle,
  ptSlim,
  seo,
  seoGlobal,
  socialLink,
]

export const singletons = []
