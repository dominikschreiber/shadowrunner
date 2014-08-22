angular.module 'metaService', [
  'ng'
]

.factory 'meta', ($log) ->
  title =
    prefix: undefined
    suffix: undefined
    separator: ' | '
  description = undefined
  
  title: () -> _.without([title.prefix, title.suffix], undefined).join(title.separator)
  setTitlePrefix: (prefix) -> title.prefix = prefix
  setTitleSeparator: (separator) -> title.separator = separator
  setTitleSuffix: (suffix) -> title.suffix = suffix
  description: () -> description
  setDescription: (desc) -> description = desc