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
})