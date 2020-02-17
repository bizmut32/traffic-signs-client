import imageCompression from 'browser-image-compression';

export class ImageConverter {
  static fileToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });
  }

  static compressImage(image: File) {
    return imageCompression(image, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 500,
      useWebWorker: true
    });
  }
}
