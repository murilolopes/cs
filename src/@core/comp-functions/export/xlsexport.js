import XlsExport from 'xlsexport';

const exportToXLS = (data, title = 'export.xls') => {
  const xls = new XlsExport(data, title);
  return xls.exportToXLS(title);
}

const exportToCSV = (data, title) => {
  const xls = new XlsExport(data, title);
  return xls.exportToCSV();
}

export { exportToXLS, exportToCSV };