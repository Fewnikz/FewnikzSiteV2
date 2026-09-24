const artFrames = document.getElementById("art-frames")

function createArtFrame(imageSrc, imageAlt) {
    // Creating the elements needed to create the art frame
    let divElement = document.createElement("div");
    let imgElement = document.createElement("img");

    // And appends the elements to element that has the id art-frames
    artFrames.appendChild(divElement);
    divElement.appendChild(imgElement);

    // Applying CSS class
    divElement.className = "pixel-frame-notched";

    // Applying properties
    imgElement.src = imageSrc;
    imgElement.alt = imageAlt;
}

async function loadArtFrames() {
    const response = await fetch("../json/art-frames.json");
    if (response.ok) {
        console.log(response.status)
    }

    const json = await response.json();

    try {
        for (let i = json.length - 1; i >= 0; i--) {
            createArtFrame(
                json[i].image,
                json[i].alt
            );
        }
    } catch(e) {
        console.error(e);
    }
}