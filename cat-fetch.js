async function fetchRandomCatImg() {

    let catImgElement = document.getElementById('catImg');
    let catJSONElement = document.getElementById('catJSON');

    let apiUrl = catImgSource.value;

    try {
        let response = await fetch(apiUrl);

        if (response.ok) {
            let imgUrl = response.url;

            catImgElement.src = imgUrl;
            catJSONElement.innerText = imgUrl + "?json=true";
        } else {
            console.error('Hiba:', response.statusText);
        }
    } catch (error) {
        console.error('Hiba:', error);
    }
}

fetchRandomCatImg();