import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v0_8_8_27_1 } from './v0_8_8_27_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v0_8_8_27_1],
})
