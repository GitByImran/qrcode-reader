document.getElementById('upload-input').addEventListener('change', function () {
    const fileName = this.files[0].name;
    document.getElementById('selected-file').textContent = fileName;
});

document.getElementById('upload-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const fileInput = document.getElementById('upload-input');
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageDataUrl = event.target.result;
            decodeQRCode(imageDataUrl);
        };
        reader.readAsDataURL(file);
    }
});

function decodeQRCode(imageDataUrl) {
    const image = new Image();
    image.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
            document.getElementById('result').innerHTML = `<span class="result-title">QR Code detected :</span> <span>${code.data}</span>`;
        } else {
            document.getElementById('result').textContent = 'No QR Code found in the image.';
        }
    };
    image.src = imageDataUrl;
}
