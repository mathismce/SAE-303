import { M } from "./js/model.js";
import { V } from "./js/view.js";

/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage //pour test//.
   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/


// loadind data (and wait for it !)
await M.init();

// sample events for testing
let edt = [
  {
    id: '1',
    calendarId: '1',
    title: 'my event',
    category: 'time',
    start: '2023-12-11T08:30:00',
    end: '2023-12-11T10:30:00',
  },
  {
    id: '2',
    calendarId: '1',
    title: 'second event',
    category: 'time',
    start: '2023-12-13T14:00:00',
    end: '2023-12-13T15:30:00',
  },
]



// creating events in the calendar
V.uicalendar.createEvents(M.getEvents('mmi1'));
V.uicalendar.createEvents(M.getEvents('mmi2'));
V.uicalendar.createEvents(M.getEvents('mmi3'));




let C = {};



V.init();
V.update_color();


C.course_color = function (cal, cm, td, tp ){
  let calendrier = M.getEvents(cal);

  for (let event of calendrier) {
    if (event.title.includes('TP')) {
      let changes = {
        backgroundColor : tp
      }

      V.uicalendar.updateEvent(event.id, cal, changes)
    }
    else if (event.title.includes('TD')) {
      let changes = {
        backgroundColor : td
      }

      V.uicalendar.updateEvent(event.id, cal, changes)
    }
    else if (event.title.includes('CM')) {
      let changes = {
        backgroundColor : cm
      }

      V.uicalendar.updateEvent(event.id, cal, changes)
    }
  }
}

C.course_color('mmi1', '#0060C4', '#5CACFF', '#C5E2FF');
C.course_color('mmi2', '#00A038', '#40E100', '#A6FF82');
C.course_color('mmi3', '#9C0000', '#FF1919', '#FF7A7A');

console.log(M.getEvents("mmi1"));
C.init();

