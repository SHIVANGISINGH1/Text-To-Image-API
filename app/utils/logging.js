// app/utils/logging.js
export function saveLog(logMessage, status) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push({
    message: logMessage,
    status,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("logs", JSON.stringify(logs));
}

export function getLogs() {
  return JSON.parse(localStorage.getItem("logs")) || [];
}
