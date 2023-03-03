// load data
const loadData = async() => {
    const url = ' https://openapi.programming-hero.com/api/ai/tools';
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.data.tools.slice(0,6));
}

// Display Data
const displayData = tools => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    // for of loop
    for(const tool of tools){
        // console.log(tool);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card p-3" style="height: 100%">
        <img src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4>Features</h4>
            <ol class="px-3">
                <li>${tool.features[0]}</li>
                <li>${tool.features[1]}</li>
                <li>${tool.features[2]}</li>
            </ol>
        </div>
        <div style="width: 95%;" class="mx-auto border-top my-2"></div>
        <div class="d-flex justify-content-between p-2">
            <div>
                <h4>${tool.name}</h4>
                <p><i class="fa-solid fa-calendar-days pe-2 opacity-50"></i>${tool.published_in}</p>
            </div>
            <div>
                <button class="px-3 py-2 border-0 bg-danger rounded-5 text-white"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    </div>
        `;
        cardContainer.appendChild(cardDiv);
    }

    // stop spinner
    toggleSpinner(false);
}

// show more function
const showMore = async() => {
    // start spinner
    toggleSpinner(true);

    // loaded all data
    const url = ' https://openapi.programming-hero.com/api/ai/tools';
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.data.tools);

    // remove show more button
    const showMore = document.getElementById('show-more');
    showMore.style.display = 'none';
}

// toggle spinner function
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}


loadData();