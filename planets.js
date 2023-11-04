let CurrentPageUrl = "https://swapi.dev/api/planets/"

window.onload = async () => {
    try {
        await loadPlanets(CurrentPageUrl)

    }catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener("click", loadNextPage)
    backButton.addEventListener("click", loadPreviousPage)
};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet)=> {
            const card = document.createElement("div")
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const planetNameBG = document.createElement("div")
            planetNameBG.className = "planet-name-bg"

            const planetName = document.createElement("span")
            planetName.className = 'planet-name'
            planetName.innerText = `${planet.name}`

            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = 'visible'
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage=
                `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
                planetImage.className = "planet-image"

                const name = document.createElement("span")
                name.className = "planet-details"
                name.innerText = `Nome: ${planet.name}`

                const planetPopulation = document.createElement("span")
                planetPopulation.className = "planet-details"
                planetPopulation.innerText = `Populacao: ${planet.population}`

                const planetClimate = document.createElement("span")
                planetClimate.className = "planet-details"
                planetClimate.innerText = `Clima: ${planet.climate}`

                const planetTerrain = document.createElement("span")
                planetTerrain.className = "planet-details"
                planetTerrain.innerText = `Terreno: ${planet.terrain}`

                const planetDiameter = document.createElement("span")
                planetDiameter.className = "planet-details"
                planetDiameter.innerText = `Diametro: ${planet.diameter}`

                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(planetPopulation)
                modalContent.appendChild(planetClimate)
                modalContent.appendChild(planetTerrain)
                modalContent.appendChild(planetDiameter)
            }

            mainContent.appendChild(card)

        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"


        CurrentPageUrl = url

    }catch(error){
        console.log(error);
        alert('Erro ao carregar os planetas')
    }
}

async function loadNextPage() {
    if (!CurrentPageUrl) return;

    try {
        const response  = await fetch(CurrentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.next)

    }catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if(!CurrentPageUrl) return;

    try {
        const response = await fetch(CurrentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.previous)

    } catch(error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}
