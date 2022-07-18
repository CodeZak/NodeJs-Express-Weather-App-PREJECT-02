console.log("client side javascript file");

const result = document.querySelector(".result-api");
const url = "http://127.0.0.1:3000/weather?city=";
const form2 = document.querySelector(".form2");
const ourInput = document.querySelector(".input");

async function fetchData(city) {
    result.innerHTML = "loading ... ";

    try {
        const data = await fetch(url + city);
        const response = await data.json();
        console.log(response.error);
        if (response.error) {
            result.innerHTML = response.error;
        } else {
            result.innerHTML = response.result;
        }
    } catch (error) {
        result.innerHTML = "Unable to connect to location services!";
    }
}

form2.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = ourInput.value;
    fetchData(location);
});
