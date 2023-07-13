const extractNameFromS3Url = (url) => {
  if (!url) return;

  url = url.split('?')
  const name = url[0].split('/')

  return name[name.length - 1]
}

const downloadURI = (url) => {
  let link = document.createElement("a");
  link.target = "_blank"
  link.download = extractNameFromS3Url(url);
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const downloadFromResponse = (responseData, fileOptions = {}) => {
  const binaryData = [];
  binaryData.push(responseData);
  const href = URL.createObjectURL(new Blob(binaryData, { type: fileOptions.mimeType }))

  // create "a" HTML element with href to file & click
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', fileOptions.fileName);
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

export {
  extractNameFromS3Url,
  downloadURI,
  downloadFromResponse,
}
