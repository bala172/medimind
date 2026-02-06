const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatArea = document.getElementById("chatArea");

sendBtn.onclick = () => {
  if (!chatInput.value) return;

  const userText = chatInput.value;
  chatArea.innerHTML += `<div class="msg user">${userText}</div>`;
  chatInput.value = "";

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  })
  .then(res => res.json())
  .then(data => {
    chatArea.innerHTML += `<div class="msg assistant">${data.reply}</div>`;
    chatArea.scrollTop = chatArea.scrollHeight;
  });
};
