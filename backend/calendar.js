const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: 'credenciales.json', // agrega este archivo más adelante
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

async function crearEvento({ nombre, correo, fechaInicio, fechaFin }) {
  //const authClient = await auth.getClient();
  //google.options({ auth: authClient });

  //const calendar = google.calendar('v3');
  //const response = await calendar.events.insert({
    //calendarId: 'primary',
    //conferenceDataVersion: 1,
    //requestBody: {
      //summary: `Cita con ${nombre}`,
      //description: 'Agendamiento automático vía web',
      //start: { dateTime: fechaInicio },
      //end: { dateTime: fechaFin },
      //attendees: [{ email: correo }],
      //conferenceData: {
        //createRequest: {
          //requestId: Math.random().toString(36).substring(7),
          //conferenceSolutionKey: { type: 'hangoutsMeet' },
        //},
      //},
    //},
  //});

  //return response.data;
  return {
    hangoutLink: 'https://meet.google.com/new' // temporal mientras activas Google API
  };
}

module.exports = { crearEvento };
