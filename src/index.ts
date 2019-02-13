import * as Koa from 'koa'
import nunjucks = require('nunjucks')

export interface OPTIONS {
  /** 模板所在目录路径，默认 public */
  path?: string
  /** 当模板变化时重新加载，默认 false */
  watch?: boolean
  /** 不使用缓存，每次都重新编，默认 false */
  noCache?: boolean
  /** 控制输出是否被转义， 默认 true */
  autoescape?: boolean
  /** 当输出为 null 或 undefined 会抛出异常，默认 false */
  throwOnUndefined?: boolean
  /** 自动去除 block/tag 后面的换行符，默认 false */
  trimBlocks?: boolean
  /** 自动去除 block/tag 签名的空格，默认 false */
  lstripBlocks?: boolean
  /** 自定义过滤器，see: http://mozilla.github.io/nunjucks/cn/api.html#addfilter */
  filters?: {
    [name: string]: (...params: any[]) => any
  }
}

function _createEnv(options: OPTIONS) {
  const { path = 'public', watch, noCache, autoescape, throwOnUndefined, trimBlocks, lstripBlocks, filters } = options

  console.log(path)
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path, {
      watch,
      noCache
    }),
    {
      autoescape,
      throwOnUndefined,
      trimBlocks,
      lstripBlocks
    }
  )
  if (filters) {
    Object.keys(filters).forEach(key => {
      env.addFilter(key, filters[key])
    })
  }
  return env
}

function view(options?: OPTIONS): (ctx: Koa.Context, next: () => Promise<any>) => void {
  const env = _createEnv(options || {})
  return async function(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.render = function(view: string, model?: any) {
      ctx.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}))
      ctx.type = 'text/html'
    }
    await next()
  }
}

export default view
