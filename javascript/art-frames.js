const artFrames = document.getElementById("art-frames")

function createArtFrame(imageSrc, imageAlt) {
    // Creating the elements needed to create the art frame
    let figureElement = document.createElement("figure");
    let imgElement = document.createElement("img");

    // And appends the elements to element that has the id art-frames
    artFrames.appendChild(figureElement);
    figureElement.appendChild(imgElement);

    // Applying CSS class
    figureElement.className = "pixel-frame-notched";

    // Applying properties
    imgElement.src = imageSrc;
    imgElement.alt = imageAlt;
    imgElement.loading = "lazy";
}

async function loadArtFrames() {
    const response = await fetch("../json/art-frames.json");
    if (!response.ok) {
        console.error(response.status);
        return;
    }

    const json = await response.json();

    try {
        for (let i = json.length - 1; i >= 0; i--) {
            createArtFrame(
                json[i].image,
                // Goes back to the title when the alt text has not been written yet
                json[i].alt || json[i].title
            );
        }
    } catch(e) {
        console.error(e);
    }
}

// The script calls the function after the document has been loaded, so the art frames are shown then the page is loaded
loadArtFrames();
