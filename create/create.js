import { createParticipant, getWorkshops, checkAuth, logout } from '../fetch-utils.js';
import { renderOption } from '../render-utils.js';


const form = document.querySelector('.participant-form');
const workshopSelect = document.getElementById('workshop_id');
const logoutButton = document.getElementById('logout');


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //get the name and family id from the form

    const participantform = new FormData(form);
    console.log(participantform.get('workshop_id'));
    await createParticipant({
        name: participantform.get('participant-name'),
        workshop_id: participantform.get('workshop_id'),
    });

    form.reset();
});

window.addEventListener('load', async () => {

    //let's dynamically fill in the workshops dropdown from supabase

    const workshops = await getWorkshops();
    console.log(workshops);

    for (let workshop of workshops) {
        const workshopRender = renderOption(workshop);
        workshopSelect.append(workshopRender);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});