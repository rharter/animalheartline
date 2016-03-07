unique = 0

jsonp = (url, callback, context) ->
  # init
  name = "_jsonp_" + unique++
  url += if url.match(/\?/) then "&callback=" + name else "?callback=" + name

  # create scripts
  script = document.createElement 'script'
  script.type = 'text/javascript'
  script.src = url

  # setup handler
  window[name] = (data) ->
    callback.call((context || window), data)
    document.getElementsByTagName('head')[0].removeChild(script)
    script = null
    delete window[name]

  # load JSON
  document.getElementsByTagName('head')[0].appendChild(script);
