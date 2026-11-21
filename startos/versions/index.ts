import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v0_8_8_27_1 } from './v0_8_8_27_1'
import { v0_8_8_29_0 } from './v0_8_8_29_0'
import { v0_8_8_30_0 } from './v0_8_8_30_0'
import { v0_9_0_0 } from './v0_9_0_0'
import { v0_9_10_0 } from './v0_9_10_0'
import { v0_9_11_0 } from './v0_9_11_0'
import { v0_9_7_0 } from './v0_9_7_0'
import { v0_9_7_1 } from './v0_9_7_1'
import { v0_9_8_0 } from './v0_9_8_0'
import { v0_9_9_0 } from './v0_9_9_0'
import { v0_9_9_1 } from './v0_9_9_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [
    v0_9_11_0,
    v0_9_10_0,
    v0_9_9_1,
    v0_9_9_0,
    v0_9_8_0,
    v0_9_7_1,
    v0_9_7_0,
    v0_9_0_0,
    v0_8_8_30_0,
    v0_8_8_29_0,
    v0_8_8_27_1,
  ],
})
