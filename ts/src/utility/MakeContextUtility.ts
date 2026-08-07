
import { Hook0SDK } from '../Hook0SDK'

import { Utility } from './Utility'

import type {
  Operation,
  Spec,
  Response,
  Result,
} from '../types'

import {
  Context
} from '../types'


function makeContext(ctxmap: Record<string, any>, basectx?: Context): any {
  const ctx = new Context(ctxmap, basectx)
  return ctx
}



export {
  makeContext,
}
