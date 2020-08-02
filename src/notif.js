import apiRequest from './api/apiRequest';
import BaseStore from './stores/BaseStore';

const publicVapidKey =
  "BLCzWYwIzY06gjoqtj4cMcn_fMy45ONzHu3g7hoFNvx8eRIHdt40ew4LCNIAFZAigRQgSabfJSgUGz8HtMazw3I";

// Check for service worker
let register = null

// Register SW, Register Push, Send Push
export default async function registersw() {
  // Register Service Worker
  
  console.log("Registering service worker...");
  register = await navigator.serviceWorker.register("/wi-sw.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // const unsub =  await register.pushManager.getSubscription()
  // await unsub.unsubscribe()

}

export async function createSubscribeObj(){
    console.log("Registering Push...");
    if(!register){
      await registersw()
    }
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");
    return subscription
}

export async function subscribeApi(){
  const subscriptionObj = await createSubscribeObj();

  const response = await  apiRequest.callAPIs(apiRequest.subscribe(subscriptionObj))
  
    const logindata = JSON.parse(localStorage.LOGINDATA);
    logindata.user = response.data.response
    localStorage.setItem('LOGINDATA', JSON.stringify(logindata))
    BaseStore.LOGINDATA = logindata;
}
export function checkAndRequestNotif() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
      }
    });
  }
  else if (Notification.permission === "denied") {
    return 'DENIED'
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
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
