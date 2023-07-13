import http from './http';

class ImportFile {
  companies(payload) {
    const formData = new FormData();
    formData.append('file', payload);
    return http.post('/backoffice/import_cedentes', formData);
  }
}

export default new ImportFile();