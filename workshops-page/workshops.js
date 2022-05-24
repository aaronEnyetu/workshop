import { checkAuth, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


async function loadData() {
    const data = await getWorkshops();
    console.log(data);
}

loadData();