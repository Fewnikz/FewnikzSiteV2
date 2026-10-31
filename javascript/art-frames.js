const artFrames = document.getElementById("art-frames")
const framePreview = document.getElementById("frame-preview")
const framePreviewImg = document.getElementById("frame-preview-img")
const framePreviewTitle = document.getElementById("frame-preview-title")
const framePreviewDate = document.getElementById("frame-preview-date")
const framePreviewDescription = document.getElementById("frame-preview-description")
const viewMoreText = document.getElementById("view-more-text")
const viewLessText = document.getElementById("view-less-text")

function viewMoreDetails() 
{
    document.querySelectorAll("span").forEach(span => {
        span.style.display = "block"
        viewMoreText.style.display = "none"
        viewLessText.style.display = "block"
    });
}

function viewLessDetails() {
    document.querySelectorAll("span").forEach(span => {
        span.style.display = "none"
        framePreviewTitle.style.display = "block"
        viewMoreText.style.display = "block"
        viewLessText.style.display = "none"
    });
}

function createArtFrame(
    imgSrc,
    imgAlt,
    imgTitle,
    imgDescription,
    imgDate
) {
    // Creating the elements needed to create the art frame
    let figureElement = document.createElement("figure");
    let imgElement = document.createElement("img");

    // And appends the elements to element that has the id art-frames
    artFrames.appendChild(figureElement);
    figureElement.appendChild(imgElement);

    // Applying CSS class
    figureElement.className = "pixel-frame-notched";

    // Applying properties
    imgElement.src = imgSrc;
    imgElement.alt = imgAlt;
    imgElement.loading = "lazy";

    figureElement.onclick = function () {
        framePreview.showModal()
        framePreviewImg.src = imgSrc;
        framePreviewImg.alt = imgAlt;
        framePreviewTitle.textContent = imgTitle;
        framePreviewDescription.textContent = imgDescription;
        framePreviewDate.textContent = imgDate;
    }
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
                json[i].alt,
                json[i].title,
                `Description: ${json[i].description}`,
                `Date: ${json[i].date}`
            );
        }
    } catch(e) {
        console.error(e);
    }
}

// The script calls the function after the document has been loaded, so the art frames are shown then the page is loaded
loadArtFrames();
