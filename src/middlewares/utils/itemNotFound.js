import {buildErrObject} from './buildErrObject.js'

const itemNotFound = (err = {}, item = {}, message = 'NOT_FOUND') => {
  return new Promise((resolve, reject) => {
    if (err) {
      return reject(buildErrObject(422, err.message))
    }
    if (!item) {
      return reject("Empty object")
    }
    resolve()
  })
}

export { itemNotFound }
