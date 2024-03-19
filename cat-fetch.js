async function fetchRandomCatImg() {

    let catImgElement = document.getElementById('catImg');
    let catImgSource = document.getElementById('catImgSource');

    let apiUrl = catImgSource.value;

    try {
        // Sending a GET request to fetch a random cat image
        let response = await fetch(apiUrl);

        // (status code 200)
        if (response.ok) {
            // Extracting the image URL from the response
            let imgUrl = response.url;

            catImgElement.src = imgUrl;
        } else {
            console.error('Hiba:', response.statusText);
        }
    } catch (error) {
        console.error('Hiba:', error);
    }
}
fetchRandomCatImg();