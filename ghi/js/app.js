function createCard(name, description, pictureUrl) {
    return `
      <div class="card shadow p-1 mb-3 bg-white rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    `;
  }

function colSelector(colValue) {
    if(colValue == 3){
        colValue = 1
    } else {
        colValue++
    }
    return colValue
}


  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(e);
      } else {
        const data = await response.json();
        let colValue = 0;

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const name = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const html = createCard(name, description, pictureUrl);
            colValue = colSelector(colValue);
            const column = document.querySelector(`#col_${colValue}`);
            column.innerHTML += html;
          }
        }

      }
    } catch (e) {
        console.error(e);
    }

  });
