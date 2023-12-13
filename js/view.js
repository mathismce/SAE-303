import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

V.init = function () {
  // IT2: Sélection semaine
  let nav = document.querySelector("nav");
  nav.addEventListener("click", V.handler_clickOnWeek);

  // IT8: Sélection vue
  let view = document.querySelector(".view");
  view.addEventListener("click", V.handler_clickOnView);

};

// Itération 3 : Map pour les couleurs des groupes 
let colorMap = {
  mmi1: {
    TP: '#7E93FF',
    TD: '#3F497F',
    CM: '#202540',
    others:'#9173B4'
  },
  mmi2: {
    TP: '#F8A968',
    TD: '#F27127',
    CM: '#8C0303',
    others:'#E9B940'
  },
  mmi3: {
    TP: '#F2969E',
    TD: '#C24457',
    CM: '#961A1E',
    others:'#FF5233'
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

  localStorage.removeItem('view');
  localStorage.setItem('view', ev.target.id)
}


V.Format = function(){
  if(window.innerWidth <= 768){
    V.uicalendar.changeView('day');
  }
  else {
    V.uicalendar.changeView('week');
  }
}

export { V };
