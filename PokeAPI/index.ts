const btn = document.getElementById('btn');
async function getData(value: string) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + value;
    try {
        const response = await fetch(url);
        const value = btn
        const results = await getData(value);
        if (!response.ok) {
            throw new Error('Response status: ${response.statuis}');
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Wrong");
    }
}
btn?.addEventListener('click', function(){
    fetch(url);

})
