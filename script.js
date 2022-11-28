// Get the image details and display them on the page when a file is selected by the user
document.getElementById("resize").addEventListener("click", function () {
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const image = document.getElementById("image");
    const quality = document.getElementById("quality").value;
    const file = document.getElementById("file").files[0];
    const photoDetails = document.getElementById("photoDetails");

    if (!file) {
        alert("Please select a file");
        photoDetails.classList.add("hidden");
        return;
    } else if (quality < 0 || quality > 100) {
        return;
    } else if (!file.name.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
        alert("Please select a valid image file");
        return;
    } else {

        photoDetails.classList.remove("hidden");
        const canvas = document.createElement("canvas");
        // canvas width and height
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        // image width and height (original)
        ctx.drawImage(image, 0, 0, width, height);
        console.log("Saurav Hathi");
        // quality/100 for compression
        const dataUrl = canvas.toDataURL("image/jpeg", quality / 100);
        const result = document.querySelector(".result");
        const h2 = document.createElement("h2");
        h2.classList.add("text-xl", "font-bold", "mb-4", "text-center");
        h2.textContent = "Your resized photo";
        const img = document.createElement("img");
        img.classList.add(
            "max-w-md",
            "border-2",
            "border-blue-500",
            "p-2",
            "rounded-lg"
        );
        img.alt = "image";
        img.src = dataUrl;
        const dlBtn = document.createElement("button");
        dlBtn.classList.add(
            "bg-blue-500",
            "text-white",
            "rounded-lg",
            "px-4",
            "py-2",
            "mt-4"
        );

        const size = document.createElement("p");
        size.classList.add("text-sm", "text-gray-500", "mb-4");
        if (dataUrl.length > 1000000) {
            size.textContent = `Size: ${Math.round(dataUrl.length / 1000000)} MB, ${Math.round(
                dataUrl.length / 1000
            )} KB`;
        } else if (dataUrl.length > 1000) {
            size.textContent = `Size: ${Math.round(dataUrl.length / 1000)} KB, ${Math.round(
                dataUrl.length / 1000
            )} B`;
        } else {
            size.textContent = `Size: ${dataUrl.length} B`;
        }

        const dimensions = document.createElement("p");
        dimensions.classList.add("text-sm", "text-gray-500", "mb-4");
        dimensions.textContent = `Dimensions: ${width} x ${height}`;


        dlBtn.textContent = "Download";
        dlBtn.addEventListener("click", function () {
            const a = document.createElement("a");
            a.href = dataUrl;
            // Selected file_
            a.download =
                "resized_" +
                document
                    .getElementById("selectedFile")
                    .textContent.replace("Selected file: ", "");
            a.click();
        });
        result.innerHTML = "";
        result.appendChild(h2);
        result.appendChild(img);
        result.appendChild(size);
        result.appendChild(dimensions);
        result.appendChild(dlBtn);

    }
});

const checkAuthor = document.getElementById("checkAuthor");
if (checkAuthor.children[0].children[0].textContent === "Saurav Hathi") {
} else {
    window.location.href = "https://github.com/sauravhathi";
}

// show the image details when a file is selected by the user
document.getElementById("file").addEventListener("change", () => {
    const file = document.getElementById("file").files[0];
    // FileReader is a built-in object that allows us to read the contents of files into memory
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const img = new Image();
        console.log("https://github.com/sauravhathi");
        img.src = reader.result;
        // show the image details
        img.onload = () => {
            document.getElementById("image").src = img.src;
            document.getElementById(
                "selectedFile"
            ).innerHTML = `Selected file: ${file.name}`;
            // display the image dimensions
            document.getElementById(
                "dimensions"
            ).innerHTML = `Dimensions: ${img.width} x ${img.height}`;
            document.getElementById("width").value = img.width;
            document.getElementById("height").value = img.height;
            // file size in KB and MB
            if (file.size > 1024 * 1024) {
                document.getElementById(
                    "size"
                ).innerHTML = `Size: ${Math.round(file.size / (1024 * 1024))} MB, ${Math.round(
                    file.size / 1024
                )} KB`;
            } else {
                document.getElementById(
                    "size"
                ).innerHTML = `Size: ${Math.round(file.size / 1024)} KB, ${Math.round(
                    file.size / 1024
                )} B`;
            }
        };
    };
});

// validate file type
function handleFileSelect() {
    // ValidityState
    const file = document.getElementById("file").files[0];
    const photoDetails = document.getElementById("photoDetails");
    const validImageTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/bmp",
    ];
    if (!validImageTypes.includes(file.type)) {
        alert("Please select a valid image file");
        return;
    }
    else {
        photoDetails.classList.remove("hidden");
    }
}