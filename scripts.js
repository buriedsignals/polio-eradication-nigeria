document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-button').forEach(trigger => {
    const infoIconContainer = document.createElement("span")
    infoIconContainer.setAttribute('class','modal-button-icon')
    const infoIcon = document.createTextNode("ⓘ")
    infoIconContainer.appendChild(infoIcon)
    trigger.appendChild(infoIconContainer)
    trigger.addEventListener('click', () => {
      trigger.parentElement.previousElementSibling.classList.remove('hide')
      document.querySelector('html').classList.add('overflow-hidden')
    })
  }) 
  document.querySelectorAll('.modal-close, .button-close').forEach(trigger => {
    trigger.addEventListener('click', () => {
      trigger.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('hide')
      document.querySelector('html').classList.remove('overflow-hidden')
    })
  })
  
  const navWrapper = document.querySelector('.nav-wrapper')
  
  document.querySelectorAll('.burger-button').forEach(trigger => {
    trigger.addEventListener('click', () => {
      navWrapper.classList.add('is-burger')
      trigger.nextElementSibling.classList.remove('hide')
      document.querySelector('html').classList.add('overflow-hidden')
    })
  }) 
  document.querySelectorAll('.burger-button-close').forEach(trigger => {
    trigger.addEventListener('click', () => {
      navWrapper.classList.remove('is-burger')
      trigger.parentElement.parentElement.classList.add('hide')
      document.querySelector('html').classList.remove('overflow-hidden')
    })
  })

  function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }

  function obCallback(entries, observer) {
    entries.forEach(entry => {
      entry.target.classList.remove('is-active')
      navWrapper.querySelector('.nav-scroll').classList.remove('theme-light')
      document.querySelectorAll('.nav-link').forEach(trigger => {
        trigger.classList.remove('theme-light')
      })
      if(entry.isIntersecting) {
        entry.target.classList.add('is-active')
      }
    });
  }
  const ob = new IntersectionObserver(obCallback, {
    root: null,
    threshold: 0
  })
  
  let totalHeightPage = document.body.scrollHeight
  document.addEventListener('scroll', () => {
  const currentTarget = document.querySelector('.chapter.is-active')
    if (currentTarget && window.pageYOffset + currentTarget.offsetTop > window.innerHeight) {
      if (currentTarget.classList.contains('page-light-container')) {
        navWrapper.querySelector('.nav-scroll').classList.add('theme-light')
      } else {
        navWrapper.querySelector('.nav-scroll').classList.remove('theme-light')
      }
      document.querySelectorAll('.nav-link').forEach(trigger => {
        if (currentTarget.classList.contains('page-light-container')) {
          trigger.classList.add('theme-light')
        } else {
          trigger.classList.remove('theme-light')
        }
        trigger.classList.remove('is-active')
        if (trigger.dataset.index == currentTarget.dataset.index) {
          trigger.classList.add('is-active')
        }
      })
    }
    
    
    navWrapper.classList.add('hide')
    if (window.pageYOffset > window.innerHeight) {
      navWrapper.classList.remove('hide')
    }
    navWrapper.querySelector('.nav-scroll').style.width = `${ window.pageYOffset * 100 / totalHeightPage }%`
  })
  document.querySelectorAll('.chapter').forEach(trigger => {
    ob.observe(trigger);
    let id = ''
    let chapter = ''
    trigger.classList.forEach(target => {
      if (target.includes('chapter-')) {
        id = target.split('chapter-').pop()
        chapter = id.replaceAll('_', ' ')
      }
    })
    let heightSection = trigger.offsetHeight
    const navChapterLenght = navWrapper.childElementCount
    trigger.setAttribute('id',`${ id }`)
    trigger.setAttribute('data-index',`${ navChapterLenght }`)
    const newNavChapter = document.createElement("a")
    newNavChapter.setAttribute('href',`#${ id }`)
    newNavChapter.setAttribute('class','nav-link')
    newNavChapter.setAttribute('data-index',`${ navChapterLenght }`)
    const newNavChapterText = document.createTextNode(`${ romanize(navChapterLenght) }. ${ chapter }`)
    newNavChapter.appendChild(newNavChapterText)
    navWrapper.appendChild(newNavChapter)
  })

  // Mapbox Scripts
  mapboxgl.accessToken = 'pk.eyJ1IjoiYnVyaWVkc2lnbmFscyIsImEiOiJjbDBhdmlhZTgwM3dtM2RxOTQ5cndsYXl0In0.Gvcq3DBOKDVRhy3QLjImiA'

  var darkPolioStyle = 'mapbox://styles/buriedsignals/clnaapgmw03md01qx182ndz1h'
  var lightPolioStyle = 'mapbox://styles/buriedsignals/clnybvpbh000g01qx3alt4tki'

  var map = new mapboxgl.Map({
    container: 'map',
    style: darkPolioStyle,
    center: [12.02, 5.97],
    zoom: 2,
    pitch: 0,
    bearing: 0,
    antialias: true,
    interactive: false
  })

  const qs = (s) => document.querySelector(s)
  const dateLabelElement = qs("#date-label")
  const caseCountElement = qs("#case-count")
  const caseCountParentElement = qs("#case-count-wrap")

  var center = [7.9, 9.5] // default center

  var chapters = {
    'nigeria-wild-1': {
      duration: 3000,
      bearing: 0,
      center,
      zoom: 5
    },
    'nigeria-wild-2': {
      center,
      bearing: 0,
      zoom: 5
    },
    'nigeria-variant-1': {
      duration: 3000,
      bearing: 0,
      center,
      zoom: 5.25
    },
    'nigeria-variant-2': {
      center,
      bearing: 0,
      zoom: 5.25
    },
    'nigeria-risk-1': {
      duration: 5000,
      bearing: 0,
      center: [10.119, 5.97],
      zoom: 4.5
    },
    'nigeria-risk-2': {
      duration: 5000,
      center: [10.019, 5.9],
      bearing: 0,
      zoom: 3.5
    },
    'nigeria-vaccine-1': {
      bearing: 0,
      center,
      zoom: 5
    },
    'nigeria-community-1': {
      center: [10.02, 5.9],
      duration: 5000,
      bearing: 0,
      zoom: 12
    },
    'polio-eradication-1': {
      center: [10.02, 5.9],
      bearing: 0,
      zoom: 3.5
    },
    'polio-eradication-2': {
      duration: 5000,
      bearing: 0,
      center: [10.02, 5.9],
      zoom: 3.5
    }
  }

  var darkPolioChapters = [
    'nigeria-wild-2', 'nigeria-wild-1', 'nigeria-variant-1', 'nigeria-variant-2', 'nigeria-risk-2', 'nigeria-risk-1'
  ]

  var lightPolioChapters = [
    'nigeria-vaccine-1', 'nigeria-community-1', 'polio-eradication-1', 'polio-eradication-2'
  ]

  function animateExpandingPolio() {
    var red = '#803118'
    map.setPaintProperty('expanding-polio', 'fill-color', [
      'match',
      ['get', 'name_en'],
      'Nigeria', '#f8cd6b',
      'Chad', red,
      'Cameroon', red,
      'Niger', red,
      'Benin', red,
      'Ghana', red,
      'Burkina Faso', red,
      'Mali', red,
      'Togo', red,
      'transparent'  // Default
    ])
  }

  var polioAnimationHandler
  var vaccineAnimationHandler

  function animateVaccineHeatmap(layerId, options = { duration: 6000 }) {
    map.setPaintProperty(layerId, "fill-opacity", 1)
    map.setPaintProperty(layerId, "fill-color", "#e6dec1")

    const min = 5857784
    const max = 17984889
    const range = max - min
    const duration = options.duration ?? 6000

    dateLabelElement.style.display = "none"
    caseCountParentElement.style.display = "none"
    cancelAnimationFrame(polioAnimationHandler)
    cancelAnimationFrame(vaccineAnimationHandler)

    var t0

    const loop = (_t) => {
      if (!t0) t0 = _t
      const t = _t - t0
      const progress = t / duration

      if (progress >= 1) return cancelAnimationFrame(vaccineAnimationHandler)

      // Animate from [max, max + range] to [min, max]
      map.setPaintProperty(
        layerId,
        'fill-color',
        [
          "interpolate",
          ["linear"],
          ["get", "total_immunized"],
          max - progress * range - 1,
          "#e6dec1",
          max + (1 - progress) * range,
          "#94da92"
        ]
      )

      vaccineAnimationHandler = requestAnimationFrame(loop)
    }
    vaccineAnimationHandler = requestAnimationFrame(loop)
  }

  // # features whose properties satisfy a condition
  function countPolioCases(layerId, condition = () => true) {
    var count = 0
    var features = map.queryRenderedFeatures({ layers: [layerId] })
    features.forEach(({ properties }) => { count += condition(properties) ? 1 : 0 })
    return count
  }

  const timestamp = (date) => new Date(date).getTime()

  const keyDates = {
    "wild-polio": {
      start: timestamp("2001-01-11"),
      peak: timestamp("2008-10-10"),
      end: timestamp("2015-05-01")
    },
    "variant-polio": {
      start: timestamp("2010-02-17"),
      peak: timestamp("2022-03-01"),
      end: timestamp("2024-12-31")
    },
  }

  var animationRefreshRate = 50 // update every 50ms

  function animatePolioCases(layerId, options = { to: "peak", from: "start" }) {
    const { to, from } = options
    const dateEnd = keyDates[layerId][to]
    const dateStart = keyDates[layerId][from]
    const duration = options.duration ?? 15000
    const dateWindow = options.dateWindow ?? 1000 * 60 * 60 * 24 * 365 * 0.5 // 6mo window

    dateLabelElement.style.display = "inline"
    caseCountParentElement.style.display = "inline"
    cancelAnimationFrame(polioAnimationHandler)

    var t0
    var lastPaint = 0

    const loop = (_t) => {
      if (!t0) t0 = _t
      const t = _t - t0
      const progress = t / duration

      // Debounce to avoid excessive repaints
      if (t - lastPaint < animationRefreshRate) {
        polioAnimationHandler = requestAnimationFrame(loop)
        return
      }

      if (progress >= 1) return cancelAnimationFrame(polioAnimationHandler)

      const d1 = dateStart + progress * (dateEnd - dateStart)
      const d0 = d1 - dateWindow

      // Opacity = 1 when in date window
      map.setPaintProperty(
        layerId,
        'circle-opacity',
        ["case",
          [
            "all",
            [">=", ["get", "dateInt"], d0],
            ["<=", ["get", "dateInt"], d1],
          ],
          1,
          0
        ]
      )

      // Update UI
      dateLabelElement.innerText = [d0, d1].map((d) => new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })).join(" – ")

      caseCountElement.innerText = countPolioCases(layerId, (p) => p.dateInt >= d0 && p.dateInt <= d1)

      lastPaint = t
      polioAnimationHandler = requestAnimationFrame(loop)
    }

    polioAnimationHandler = requestAnimationFrame(loop)
  }

  // On scroll, check which element is on screen
  window.onscroll = function () {
    var chapterNames = Object.keys(chapters);
    for (var i = 0; i < chapterNames.length; i++) {
      var chapterName = chapterNames[i];
      var offset = (chapterName === 'nigeria-risk-2') ? -window.innerHeight * 0.5 : 0; // 50vh offset
      if (isElementOnScreen(chapterName, offset)) {
        setActiveChapter(chapterName);
        break;
      }
    }
  };

  var activeChapterName = 'nigeria-wild-2'
  var currentStyle = darkPolioStyle

  function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return

    map.flyTo({ padding: { left: 200 }, ...chapters[chapterName] })

    var targetStyle = lightPolioChapters.includes(chapterName)
      ? lightPolioStyle
      : darkPolioChapters.includes(chapterName)
        ? darkPolioStyle
        : currentStyle

    if (targetStyle !== currentStyle) {
      map.setStyle(targetStyle)
      map.on('style.load', () => {
        currentStyle = targetStyle
      })
    }

    updateChapter()

    function updateChapter() {
      // Only update chapter after style has loaded
      if (currentStyle !== targetStyle) return setTimeout(() => updateChapter(), 50)

      switch (chapterName) {
        case 'nigeria-wild-1':
        case 'nigeria-wild-2':
          map.setLayoutProperty('wild-polio', 'visibility', 'visible');
          map.setLayoutProperty('variant-polio', 'visibility', 'none');
          var from = chapterName === 'nigeria-wild-1' ? 'start' : 'peak';
          var to = chapterName === 'nigeria-wild-1' ? 'peak' : 'end';
          animatePolioCases('wild-polio', { to, from })
          break;
        case 'nigeria-variant-1':
        case 'nigeria-variant-2':
          map.setLayoutProperty('wild-polio', 'visibility', 'none');
          map.setLayoutProperty('expanding-polio', 'visibility', 'none');
          map.setLayoutProperty('variant-polio', 'visibility', 'visible');
          if (chapterName === 'nigeria-variant-1') { animatePolioCases('variant-polio', { to: 'peak', from: 'start', dateWindow: 1000 * 60 * 60 * 24 * 365 /* 12mo window */ }) }
          break;
        case 'nigeria-risk-1':
          map.setLayoutProperty('variant-polio', 'visibility', 'none');
          map.setLayoutProperty('expanding-polio', 'visibility', 'visible');
          break;
        case 'nigeria-risk-2':
          animateExpandingPolio();
          break;
        case 'nigeria-vaccine-1':
          map.setLayoutProperty('immunized-population', 'visibility', 'visible')
          map.setLayoutProperty('nigeria-fill', 'visibility', 'visible')
          animateVaccineHeatmap('immunized-population');
          break;
        case 'nigeria-community-1':
          map.setLayoutProperty('immunized-population', 'visibility', 'none');
          map.setLayoutProperty('variant-polio', 'visibility', 'none');
          break;
        case 'polio-eradication-1':
          map.setLayoutProperty('variant-polio', 'visibility', 'visible');
          animatePolioCases('variant-polio', { to: 'end', from: 'peak', duration: 8000, dateWindow: 1000 * 60 * 60 * 24 * 365 /* 12mo window */ })
          break;
        case 'polio-eradication-2':
          map.setLayoutProperty('variant-polio', 'visibility', 'none');
          break;
      }

      qs(`#${chapterName}`).setAttribute('class', 'active')
      qs(`#${activeChapterName}`).setAttribute('class', '')

      activeChapterName = chapterName
    }
  }

  function isElementOnScreen(id, offset = 0) {
    var element = qs(`#${id}`)
    var bounds = element.getBoundingClientRect()
    return bounds.top < (window.innerHeight + offset) && bounds.bottom > 300
  }

})