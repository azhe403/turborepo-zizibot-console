function logDebug(message: string, ...data: any[]) {
  console.debug(message, data);
}

function logError(message: string, ...data: any[]) {
  console.error(message, data);
}

export {
  logDebug,
  logError
};
