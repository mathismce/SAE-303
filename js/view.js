import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

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


// Initialisation du V


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


V.handler_clickOnYear = function(ev){
  if(ev.target.tagName =="INPUT"){
    if (ev.target.checked == false){
      V.uicalendar.setCalendarVisibility(ev.target.id, false);
      console.log('not checked');
    }
    if (ev.target.checked == true){
      V.uicalendar.setCalendarVisibility(ev.target.id, true);
      console.log('checked');
    }
    
  }
}


// Itération 3 : Changer de couleur en fonction des années
V.update_color = function () {
  V.uicalendar.setCalendarColor('mmi1', {
    color: '#e8e8e8',
    backgroundColor: '#00D5F7',
    borderColor: '#a1b56c',
    dragBackgroundColor: '#585858',
  });

  V.uicalendar.setCalendarColor('mmi2', {
    color: '#282828',
    backgroundColor: '#FCF029',
    borderColor: '#a1b56c',
    dragBackgroundColor: '#dc9656',
  });

  V.uicalendar.setCalendarColor('mmi3', {
    color: '#a16946',
    backgroundColor: '#F70000',
    borderColor: '#a1b56c',
    dragBackgroundColor: '#ab4642',
  });

}



export { V };
