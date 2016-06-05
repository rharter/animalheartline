@api = new AdoptAPetApi "1981d87af94bd821420b2d62732ef185", 71169
# @api = new PetfinderApi "fa3e8027860c3d7bbdc832c86e8c81d4", "IL115"
#@api = new TestApi

hasClass = (elem, className) ->
  RegExp(' ' + className + ' ').test(' ' + elem.className + ' ')

toggleClass = (elem, className) ->
  newClass = " #{elem.className.replace(/[\t\r\n]/g, ' ')} "
  if hasClass(elem, className)
    newClass = newClass.replace(" #{className} ", " ") while newClass.indexOf(" #{className} ") >= 0
    elem.className = newClass.replace(/^\s+|\s+$/g, '')
  else
    elem.className += " #{className}"
    
$ ->
  $("a#menu").click ->
    toggleClass document.querySelector('.nav-list'), 'nav-active'
