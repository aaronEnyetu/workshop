import { checkAuth, getWorkshops, logout, deleteParticipant } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayWorkshops() {
    //fetch workshops from supabase
    const div = document.querySelector('.workshops-container');
    div.textContent = '';
    const workshops = await getWorkshops();

    for (let workshop of workshops) {
        const workshopEl = renderWorkshop(workshop);

        const ul = document.createElement('ul');
        for (let participant of workshop.participants) {
            console.log(participant);

            const li = document.createElement('li');
            li.textContent = `${participant.workshop_id}: ${participant.name}`;
            li.addEventListener('click', async () => {
                await deleteParticipant(participant.id);
                await displayWorkshops();
            });
            ul.append(li);
        }
        workshopEl.append(ul);
        div.append(workshopEl);
    }
}
displayWorkshops();

// async function loadData() {
//     const data = await getWorkshops();
//     console.log(data);
// }

// loadData();