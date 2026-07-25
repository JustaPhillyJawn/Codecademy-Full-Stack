const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', async function() {
    const input = document.getElementById('input');
    const value = input.value;
    const result = await getData(value);

    const card = document.getElementById('card');

    card.innerHTML = 
        `<p>${result.name}<p>
        <img src="${result.sprites.front_default}"/>`
        

    console.log(result.name);
    console.log(result.types);
    console.log(result.sprites);
})
async function getData(value) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + value;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Wrong", error);
    }
}


