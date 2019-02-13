# view middleware for koa with nunjucks

## install

```
npm i @gem-mine/nunjucks -S
```

## useage

正常使用 koa 的中间件：

```js
app.use(views({
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
}))
```

例子：

```js
const nunjucks = require('nunjucks')

const env = process.env.NODE_ENV
export default views({
  watch: env === 'local',
  noCache: env !== 'production'
})
```
