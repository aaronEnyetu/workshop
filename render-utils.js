export function renderWorkshop(workshop) {
    const div = document.createElement('div');
    div.classList.add('workshop');
    const h2 = document.createElement('h2');
    h2.textContent = workshop.name;


    div.append(h2);

    return div;
}