export function displayMessage(messageType, message, container) {
  return (container.innerHTML = `<div class="message ${messageType}">${message}</div>`);
}
