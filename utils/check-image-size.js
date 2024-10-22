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

export default getBase64Size;