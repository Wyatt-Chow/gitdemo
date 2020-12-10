;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-steerrightzhuanyou" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M438.893711 1023.89761c-121.843816 0-225.462254-42.594141-310.855314-127.987201C42.747725 810.619738 0.051195 707.0013 0.051195 585.055094c0-121.843816 42.69653-225.462254 127.987201-310.855314 85.290671-85.290671 188.909109-127.987201 310.855314-127.987201l303.9952 0L626.266973 31.945605c-9.112689-9.112689-9.112689-18.327767 0-27.440456C632.410359 1.535846 636.915508 0 639.987201 0c3.071693 0 7.576842 1.535846 13.720228 4.607539l146.314969 146.314969c1.535846 3.071693 2.252575 5.426657 2.252575 6.860114 1.535846 4.607539 1.535846 9.112689 0 13.720228 0 1.535846-0.819118 3.071693-2.252575 4.607539l0 2.252575L653.707429 324.575542c-9.112689 9.112689-18.327767 9.112689-27.440456 0-9.112689-9.112689-9.112689-18.327767 0-27.440456l116.519548-114.266973L438.893711 182.868113c-111.19528 0-206.110589 39.215278-284.541146 117.748225-78.430557 78.532947-117.748225 173.345865-117.748225 284.541146 0 111.19528 39.215278 206.110589 117.748225 284.541146 78.430557 78.532947 173.345865 117.748225 284.541146 117.748225l347.408459 0c12.184382 0 18.327767 6.143386 18.327767 18.327767 0 12.286771-6.143386 18.327767-18.327767 18.327767L438.893711 1024.10239z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)