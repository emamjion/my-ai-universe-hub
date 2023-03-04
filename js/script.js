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
                <button onclick="loadDetails('${tool.id}')" style="width:50px;height:50px;background:#FEF7F7;color:#EB5757" class="px-3 py-2 border-0 rounded-5 mt-3" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right"></i></button>
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

// loaded details
const loadDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayDetails(data.data);
}

// display details function
const displayDetails = details => {
    // console.log(details)
    const heading = document.getElementById('heading');
    heading.innerText = `${details.description}`;

    // basic pricing container 
    const basicPricingContainer = document.getElementById('basic-pricing-container');
    const basicPriceDiv = document.createElement('div');
    basicPricingContainer.textContent = '';
    basicPriceDiv.innerHTML = `
        <p>${details.pricing ? details.pricing[0].price : 'free of Cost'}</p>
        <p>${details.pricing ? details.pricing[0].plan : 'Basic'}</p>
    `;
    basicPricingContainer.appendChild(basicPriceDiv);

    // pro pricing container 
    const proPricingContainer = document.getElementById('pro-pricing-container');
    proPricingContainer.textContent = '';
    const proPriceDiv = document.createElement('div');
    proPriceDiv.innerHTML = `
        <p>${details.pricing ? details.pricing[1].price : 'free of Cost'}</p>
        <p">${details.pricing ? details.pricing[1].plan : 'Pro'}</p>
    `;
    proPricingContainer.appendChild(proPriceDiv);

    // contact pricing container 
    const contactPricingContainer = document.getElementById('contact-pricing-container');
    contactPricingContainer.textContent = '';
    const contactPriceDiv = document.createElement('div');
    contactPriceDiv.innerHTML = `
        <p>${details.pricing ? details.pricing[2].price : 'free of Cost'}</p>
        <p>${details.pricing ? details.pricing[2].plan : 'Enterprise'}</p>
    `;
    contactPricingContainer.appendChild(contactPriceDiv);

    // features info
    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = `
        <li>${details.features["1"].feature_name}</li>
        <li>${details.features["2"].feature_name}</li>
        <li>${details.features["3"].feature_name}</li>
    `;

    // Integreations 
    const integrationsList = document.getElementById('integrations-list');
    integrationsList.innerHTML = `
        <li>${details.integrations ? details.integrations[0] : 'No data found'}</li>
        <li>${details.integrations ? details.integrations[1] : 'No data found'}</li>
        <li>${details.integrations ? details.integrations[2] : 'No data found'}</li>
    `;

    // modal right side
    const modalRight = document.getElementById('modal-right');
    modalRight.innerHTML = `
        <img class="img-fluid rounded-2 w-100" src="${details.image_link[0]}">
        <h3 class="text-center p-3 w-100">${details.input_output_examples ? details.input_output_examples["0"].input : "Can you give any example?"}</h3>
        <p class="text-center fs-5 w-100">${details.input_output_examples ? details.input_output_examples["0"].output : "No! Not Yet! Take a break!!!"}</p>
    `;

    // accuracy
    // console.log(details.accuracy.score);
    const accuracyValue = details.accuracy.score;
    const accuracyElement = document.getElementById('accuracy-btn');
    const accuracy = (accuracyValue * 100) + '% accuracy';
    accuracyElement.innerHTML = accuracy;

    const accuracyBtn = document.getElementById('accuracy-btn');
    if(accuracyValue === null){
        accuracyBtn.style.display = 'none';
    }
    else{
        accuracyBtn.style.display = 'block';
    }
}

// sort by date
document.getElementById('sort-date').addEventListener('click',() => {
    
})

loadData();
