export default class FilenameUtils {
  static getExtension(fullpath) {
    return fullpath.slice(fullpath.lastIndexOf('.') + 1);
  }

  static getFilename(fullpath) {
    return fullpath.slice(fullpath.lastIndexOf('/') + 1);
  }

  static getFilenameWithoutExtension(fullpath) {
    return fullpath.slice(fullpath.lastIndexOf('/') + 1, fullpath.lastIndexOf('.'));
  }

  static getFullExtension(fullpath) {
    const ext = this.getExtension(fullpath);
    if (ext === 'jpg') {
      return 'JPEG';
    }
    return ext.toUpperCase();
  }

  static isImage(fullpath) {
    const extension = this.getExtension(fullpath);
    return extension === 'jpg' || extension === 'png';
  }
}
