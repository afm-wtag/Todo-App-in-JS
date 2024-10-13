export function showFeedback($feedbackMessage, content) {
  $feedbackMessage.innerText = content;
  $feedbackMessage.style.color = "red";
  $feedbackMessage.style.fontSize = "12px";
}

export function clearFeedback($feedbackMessage) {
  $feedbackMessage.innerText = "";
}
