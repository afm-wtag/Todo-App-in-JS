export function showFeedback($feedbackMessage, content) {
  $feedbackMessage.innerText = content;
  $feedbackMessage.style.color = "red";
  $feedbackMessage.style.fontSize = "12px";
  $feedbackMessage.style.display = "block";
}

export function clearFeedback($feedbackMessage) {
  $feedbackMessage.innerText = "";
}
