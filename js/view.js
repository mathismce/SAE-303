import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

// Itération 3 : Map pour les couleurs des groupes 
let colorMap = {
  mmi1: {
    TP: '#C5E2FF',
    TD: '#5CACFF',
    CM: '#0060C4',
    others:'#0B1A4F'
  },
  mmi2: {
    TP: '#A6FF82',
    TD: '#40E100',
    CM: '#00A038',
    others:'#094213'
  },
  mmi3: {
    TP: '#FF7A7A',
    TD: '#FF1919',
    CM: '#9C0000',
    others:'#640A0A'
  }
};


V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time: function (event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },


});



// Itération 2 : Changer de semaine
V.handler_clickOnWeek = function (ev) {
  if (ev.target.id == "prev") {
    V.uicalendar.prev();
  }
  else if (ev.target.id == "current") {
    V.uicalendar.today();
  }
  else if (ev.target.id == "next") {
    V.uicalendar.next();
  }
}


// Itération 3 : Fonction Couleurs des cours
V.course_color = function (objectevents) {
  for (let ev of objectevents) {
      ev.backgroundColor = colorMap[ev.calendarId][ev.type];
    }
};


// Itération 8 : Changer de vue
V.handler_clickOnView = function (ev) {
  if (ev.target.id == "day") {
    V.uicalendar.changeView('day');
  }
  else if (ev.target.id == "week") {
    V.uicalendar.changeView('week');

  }
  else if (ev.target.id == "month") {
    V.uicalendar.changeView('month');
  }
}


export { V };
