async function fetchRandomCatImg() {
    let catImgElement = document.getElementById('catImg');
    let catJSONElement = document.getElementById('catJSON');

    let userUrl = catImgSource.value;

    try {
        let response = await fetch(userUrl);
        if (response.ok) {
            catImgElement.src = response.url;
            let imgUrl = response.url;
            response = await fetch(imgUrl + "?json=true");
            if (response.ok) {
                let jsonData = await response.json();
                catJSONElement.innerText = JSON.stringify(jsonData);
            } else {
                console.error('Hiba:', response.statusText);
            }
        } else {
            console.error('Hiba:', response.statusText);
        }
    } catch (error) {
        console.error('Hiba:', error);
    }
}

fetchRandomCatImg();