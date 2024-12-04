    const output = document.getElementById("output");
    const btn = document.getElementById("download-images-button");

    const images = [
      { url: "https://picsum.photos/id/237/200/300" },
      { url: "https://picsum.photos/id/238/200/300" },
      { url: "https://picsum.photos/id/239/200/300" },
    ];

    // Function to download an image and return a promise
    function downloadImage(image) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;

        img.onload = () => resolve(img); // Resolve promise with the image
        img.onerror = () =>
          reject(new Error(`Failed to load image's URL: ${image.url}`));
      });
    }

    // Handler for button click
    btn.addEventListener("click", async () => {
      output.innerHTML = ""; // Clear previous images or messages
      try {
        const promises = images.map(downloadImage); // Create an array of promises
        const downloadedImages = await Promise.all(promises); // Wait for all to complete

        // Append each downloaded image to the output div
        downloadedImages.forEach((img) => output.appendChild(img));
      } catch (error) {
        output.innerHTML = `<p>${error.message}</p>`; // Display error message
      }
    });