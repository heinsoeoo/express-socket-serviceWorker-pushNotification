const publicVapidKey = "BC3ulBvtoMTwBGw6cbO5bpkz7-ma3jLBdY79M5Z2-b8bmNIh7IPecFnxvTN2ezoGYmFkEQa05R2d9CeOX4YJfVw";
var subObject;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Service Worker Installing');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/javascripts/sw.js')
        .then(function(reg) {
            console.log('Registered Service Worker!');
            console.log('Subscribing...');
            reg.pushManager.getSubscription().then(sub => {
                if (sub === null) {
                    console.log('No Subscription');
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                    }).then(function(subscription) {
                        subObject = subscription;
                        console.log("Subscription Object: "+JSON.stringify(subscription));
                    }).catch(err => console.log("Pushing Failed! "+err));
                }else{
                    subObject = sub;
                    console.log("Subscription Object: "+JSON.stringify(sub));
                }
            })
        }).catch(err => console.log("Service Worker Failed: "+err))
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
})
  