function getBase64Size(base64String) {
    // Remove data URL prefix (if any)
    const base64WithoutPrefix = base64String.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

    // Decode base64 string into a binary buffer
    const binaryBuffer = Buffer.from(base64WithoutPrefix, 'base64');

    // Get the size of the buffer (in bytes)
    const sizeInBytes = binaryBuffer.length;

    // Convert bytes to kilobytes (KB)
    const sizeInKB = sizeInBytes / 1024;

    return sizeInKB;
}

function checkSize(){
    const base64Image = "data:image/jpeg;base64,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";
    const sizeInKB = getBase64Size(base64Image);
    if(sizeInKB>500){
        return "Image is Size big"
    }else{
        return "Image is Size small"
    }
}

// Example usage
// const sizeInKB = getBase64Size(base64Image);
// const wh = await checkSize(base64Image);
// console.log(`Size of base64 image: ${sizeInKB} KB`);
// console.log(`Wh : ${wh}`);


console.log(`Checking size of base64 image : ${checkSize()}`);