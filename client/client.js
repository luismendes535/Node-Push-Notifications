const publicVapidKey =
  "BLtgZgPVTQHMzw7UsqlnfdQ0zcUbHvLRJWotFSjPGFe7W8OYLbzNEw7m8OouHWshn5Dh86uLNKDhftpaUK5zaHA";

//Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

//Register the service worker, register push, send the push
async function send() {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service worker registered...");

  //Register push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push registered...");

  //Send Push Notification
  console.log("Sending push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
