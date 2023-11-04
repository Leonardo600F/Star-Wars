let CurrentPageUrl = "https://swapi.dev/api/starships/"

window.onload = async () => {
    try {
        await loadStarships(CurrentPageUrl)

    } catch(error) {
        console.log(error);
        alert('Erro ao carregar cards');

    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadStarships(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        
        responseJson.results.forEach((starship) => {
            const card = document.createElement("div")
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"
        
            const starshipNameBG = document.createElement("div")
            starshipNameBG.className = "starship-name-bg"
        
            const starshipName = document.createElement("span")
            starshipName.className = "starship-name"
            starshipName.innerText = `${starship.name}`
        
            starshipNameBG.appendChild(starshipName)
            card.appendChild(starshipNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''
        
                const starshipImage = document.createElement("div")
                starshipImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(/\D/g, "")}.jpg')`
                starshipImage.className = "starship-image"
        
                const name = document.createElement("span")
                name.className = "starship-details"
                name.innerText = `Nome: ${starship.name}`

                const consumables = document.createElement("span")
                consumables.className = "starship-details"
                consumables.innerText = `Consumiveis: ${starship.consumables}`
        
                const starshipLength = document.createElement("span")
                starshipLength.className = "starship-details"
                starshipLength.innerText = `Comprimento: ${starship.length}`
        
                const crew = document.createElement("span")
                crew.className = 'starship-details'
                crew.innerText = `Tripulacao: ${starship.crew}`
        
                const passengers = document.createElement("span")
                passengers.className = "starship-details"
                passengers.innerText = `Passageiros: ${starship.passengers}`
        
                modalContent.appendChild(starshipImage)
                modalContent.appendChild(name)
                modalContent.appendChild(consumables)
                modalContent.appendChild(starshipLength)
                modalContent.appendChild(crew)
                modalContent.appendChild(passengers)
            }
        
            mainContent.appendChild(card)
        
        });

        CurrentPageUrl = url

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

    } catch(error){
        alert('Erro ao carregar as espaçonaves')
        console.log(error)
    }
}

async function loadPreviousPage() {
    if (!CurrentPageUrl) return;

    try{
        const response = await fetch (CurrentPageUrl)
        const responseJson = await response.json()

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}