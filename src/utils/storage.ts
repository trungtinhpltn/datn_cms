function buildKeyCache(KEY: string) {
  return `CACHE_CMS_AI_${KEY}`
}

/**
 *
 * @param {*} KEY
 * @param {*} data
 * @param {*} ttl : by second
 */
export function setCacheData(KEY: string, data: any, ttl = 60 * 10) {
  const saveData = { data, ttl, start: new Date() }
  return localStorage.setItem(buildKeyCache(KEY), JSON.stringify(saveData))
}
export function removeCacheData(KEY: string) {
  const keyStore = buildKeyCache(KEY)
  return localStorage.removeItem(keyStore)
}

export function getCachedData(KEY: string) {
  try {
    const keyStore = buildKeyCache(KEY)
    const data = localStorage.getItem(keyStore)
    if (!data) return null
    const { data: dataSave, ttl, start } = JSON.parse(data) || {}
    const duration = (new Date().getTime() - new Date(start).getTime()) / 1000
    if (duration > ttl) {
      localStorage.removeItem(keyStore)
      return null
    }
    return dataSave
  } catch (ex) {
    console.log(ex)
  }
  return null
}
