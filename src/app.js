const currentDate = new Date()
const currentYear = currentDate.getFullYear() // number - 2022
const currentMonth = currentDate.getMonth() // number - 5
const currentDay = String(currentDate.getDate()) // 24

console.log({ weekday: currentDate.getDay() }) //day of the week (0-6)
console.log({ 'month day': currentDate.getDate() }) //day of the month (1-31)
console.log({ 'month number': currentDate.getMonth() }) //month (0-11)
console.log({ year: currentDate.getFullYear() })
console.log(currentDate.toDateString())

// setInterval(() => {
//   console.log(date.getSeconds())

// }, 1000);

const monthInfo = [
  {
    month: 'january',
    days: 31,
  },
  {
    month: 'february',
    days: 28,
  },
  {
    month: 'march',
    days: 31,
  },
  {
    month: 'april',
    days: 30,
  },
  {
    month: 'may',
    days: 31,
  },
  {
    month: 'june',
    days: 30,
  },
  {
    month: 'july',
    days: 31,
  },
  {
    month: 'august',
    days: 31,
  },
  {
    month: 'september',
    days: 30,
  },
  {
    month: 'october',
    days: 31,
  },
  {
    month: 'november',
    days: 30,
  },
  {
    month: 'december',
    days: 31,
  },
]

const visibleInfo = {
  visibleYear: currentYear, // 2022
  visibleMonth: currentMonth, // 5
}

// for (const month of monthInfo) {
//   console.log(month.month);
// }

const $calendarTitle = document.getElementById('calendarTitle')
const $calendarDays = document.getElementById('calendarDays')
const $prevMonthBtn = document.querySelector('.calendar__prev-button')
const $nextMonthBtn = document.querySelector('.calendar__next-button')

// console.log($calendarTitle)
console.log($calendarDays)

//when page loads -> call a function that gets the current date and set the title to the corresponding year and month, also call another function that sets the days of the month based on the current year and month, and puts that on the UI

function setTitle({ visibleYear, visibleMonth }) {
  // debugger
  $calendarTitle.textContent = `${visibleYear} - ${monthInfo[visibleMonth].month}`
}

function setDays(month) {
  // console.log(($calendarDays.children.length))
  // for (let i = 7; i < $calendarDays.children.length; i++) {
  //   $calendarDays.children[i].remove()
  // }

  console.log(month) //5
  //based on the month, go to the monthInfo object and get the amount of days, then create a fragment and add all the day html elements to it. Finally, append that fragment to the $calendarDays div

  const daysToAdd = monthInfo[month].days // 30
  const daysFragment = document.createDocumentFragment()

  for (let i = 1; i <= daysToAdd; i++) {
    //for the first day, create a date with the visible year (based on the title on the html), the month(which we pass to this function) and the day (i=1), get the week day and set the CSS class for its starting position.
    const day = document.createElement('SPAN')
    day.className = 'calendar__day'
    day.dataset.type = 'number'
    day.textContent = i

    if (i === 1) {
      const currentYear = $calendarTitle.textContent.slice(0, 4)
      const dateBasedOnFirstDay = new Date(currentYear, month, i)
      const weekDay = dateBasedOnFirstDay.getDay()
      const CSSClass = `calendar__day--start-at-${weekDay + 1}`
      day.classList.add(CSSClass)
    }
    // if (i === 24) debugger
    if (
      day.textContent === currentDay &&
      month === currentMonth &&
      $calendarTitle.textContent.slice(0, 4) === String(currentYear)
    ) {
      day.classList.add('calendar__day--today')
    }
    daysFragment.appendChild(day)
  }

  $calendarDays.appendChild(daysFragment)
}

function showPreviousMonth() {
  const allCalendarNumbers = document.querySelectorAll(
    '.calendar__day[data-type="number"]'
  )
  allCalendarNumbers.forEach(number => {
    number.remove()
  })

  visibleInfo.visibleMonth -= 1
  if (visibleInfo.visibleMonth < 0) {
    visibleInfo.visibleYear -= 1
    visibleInfo.visibleMonth = 11
  }
  setTitle(visibleInfo)
  setDays(visibleInfo.visibleMonth)
}

function showNextMonth() {
  const allCalendarNumbers = document.querySelectorAll(
    '.calendar__day[data-type="number"]'
  )
  allCalendarNumbers.forEach(number => {
    number.remove()
  })

  visibleInfo.visibleMonth += 1
  if (visibleInfo.visibleMonth > 11) {
    visibleInfo.visibleYear += 1
    visibleInfo.visibleMonth = 0
  }
  setTitle(visibleInfo)
  setDays(visibleInfo.visibleMonth)
}

document.addEventListener('DOMContentLoaded', e => {
  console.log("let's call the initial function")

  setTitle(visibleInfo)
  setDays(visibleInfo.visibleMonth)
})

$prevMonthBtn.addEventListener('click', e => {
  console.log('~~~SHOW PREVIOUS MONTH~~~')
  showPreviousMonth()
})
$nextMonthBtn.addEventListener('click', e => {
  console.log('~~~SHOW NEXT MONTH~~~')
  showNextMonth()
})

console.log(typeof visibleInfo.visibleYear)
