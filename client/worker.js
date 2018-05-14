console.log("Service worker loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push has been received...");
  self.registration.showNotification(data.title, {
    body: "Notified by Luis Mendes",
    icon: "https://github.com/luismendes535"
  });
});
