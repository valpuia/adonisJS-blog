import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'

addCollection(heroIcons)

edge.use(edgeIconify)

edge.global('appUrl', env.get('APP_URL'))
