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



// creating events in the calendar
/*V.uicalendar.createEvents(M.getEvents('mmi1'));
V.uicalendar.createEvents(M.getEvents('mmi2'));
V.uicalendar.createEvents(M.getEvents('mmi3'));


*/

// Initialisation du V



let C = {};

C.init = function () {

  V.init();

  // IT4: Sélection Année
  let year = document.querySelector("#year");
  year.addEventListener("click", C.handler_clickOnYear);

  // IT5: Sélection Groupe
  let groups = document.querySelector('#groups');
  groups.addEventListener("change", C.handler_ChangeGroup);

  // IT6-7: Barre de recherche
  let input = document.querySelector("#search");
  input.addEventListener("keyup", C.handler_Research);



  V.Format();

  let all = M.getConcatEvents();

  V.course_color(all)

  V.uicalendar.createEvents(all);


  // Itération 10 : Garder les préférences de l'utilisateur (Vue)
  if (localStorage.getItem('view') != undefined) {
    let view = localStorage.getItem("view");
    V.uicalendar.changeView(view);
  }


  // Itération 10 : Garder les préférences de l'utilisateur (Année)
  const selectedYear = localStorage.getItem('selectedYear');
  const eventsByYear = JSON.parse(selectedYear);

  if (eventsByYear) {

    let allInput = document.querySelectorAll('#year li input');
    
      for(let y of allInput){
        if(selectedYear.includes(y.id)){
          y.checked = true
        }
      }
      C.handler_clickOnYear({target:{tagName:'INPUT'}})
    
  };

  // Itération 10 : Garder les préférences de l'utilisateur (Group)
  const selectedGroup = localStorage.getItem('selectedGroup');
  const eventsByGroup = selectedGroup

  if (eventsByGroup) {
    C.handler_ChangeGroup({target:{value: selectedGroup}});

    let select = document.querySelector("#groups");
    
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value == selectedGroup) {
          select.options[i].selected = true;
          break; 
        }
      }
    } 

  };




  // Fonction IT4 : Tri par année
  C.handler_clickOnYear = function (ev) {
    if (ev.target.tagName == "INPUT") {
      let allEvents = M.getConcatEvents();

      let eventsByYear = [];

      let years = document.querySelectorAll('#year li input');

      let yearStorage = [];

      for (let y of years) {
        if (y.checked == true) {

          yearStorage.push(y.id);
          for (let event of allEvents) {
            if (event.calendarId == y.id) {
              eventsByYear.push(event);
            }
          }
        }
      }


      localStorage.removeItem('selectedGroup')
      localStorage.removeItem('selectedYear')

      localStorage.setItem('selectedYear',  JSON.stringify(yearStorage));

      V.uicalendar.clear()

      V.course_color(eventsByYear)

      V.uicalendar.createEvents(eventsByYear)
    }

  }


  // Fonction IT5 : Tri par groupe
  C.handler_ChangeGroup = function (ev) {
    let allCalendars = M.getConcatEvents();
    console.log(ev.target.value)
    let EventsByGroups = [];

    for (let event of allCalendars) {
      if (event.groups.includes(ev.target.value)) {
        EventsByGroups.push(event);
      }
    }

    localStorage.removeItem('selectedYear');
    localStorage.removeItem('selectedGroup');

    localStorage.setItem('selectedGroup', ev.target.value);

    V.uicalendar.clear();

    V.course_color(EventsByGroups);

    V.uicalendar.createEvents(EventsByGroups);

    // C.course_color('mmi1', '#0060C4', '#5CACFF', '#C5E2FF');
    // C.course_color('mmi2', '#00A038', '#40E100', '#A6FF82');
    // C.course_color('mmi3', '#9C0000', '#FF1919', '#FF7A7A');

  }


  // Itération 6 : Barre de Recherche
  /*C.handler_Research = function(ev){
    let word = ev.target.value;
    let research = M.getResearchEvents(word);
    V.uicalendar.clear(); // Efface les événements actuels du calendrier;
    V.course_color(research);
    V.uicalendar.createEvents(research);
  
  }*/

  C.handler_Research = function (ev) {
    let motsCles = ev.target.value.split(' ');
    let research = M.getResearchEvents(motsCles);
    V.uicalendar.clear(); // Efface les événements actuels du calendrier;
    V.course_color(research);
    V.uicalendar.createEvents(research);
  }



  C.init();



  export { C };

