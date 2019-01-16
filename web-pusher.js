var webpush =  require('web-push');
var pushSub = {"endpoint":"https://fcm.googleapis.com/fcm/send/fdyR5ZDnxgU:APA91bFP1PtCcV0viTMr3XjHK3oFn8dV5yQO9484VpsXUb05Y8ckjkallX3HpE7A0mrSk4Cda9Wvp9XhtFSS6WYCCz5JK2-BfmrR1rZmGi8WKMe8h3S8p9vsHgDXEnVMQXogXp4cpnL_","expirationTime":null,"keys":{"p256dh":"BM0UNe9HM5Uyb5n4RGjFQfsy9IzSKMRm9lhQBstlLM28l-4SqDPkeuHd0oJRTnCIkpOuo6q_XYkd_1kzoOnmRS4","auth":"JLJPifoOHpSHv_f9EjcAgw"}};
var payload = "This is payload notification";
var publicKey = "BC3ulBvtoMTwBGw6cbO5bpkz7-ma3jLBdY79M5Z2-b8bmNIh7IPecFnxvTN2ezoGYmFkEQa05R2d9CeOX4YJfVw";
var privateKey = "rF-NXf5lknac4tB3Z7n8wrtI4_VFeFi-mdEODnc_5J4";

webpush.setVapidDetails(
  "mailto:heinsoeoo.hs@gmail.com",
  publicKey,
  privateKey
);

// setInterval(() => {
//   webpush.sendNotification(
//     pushSub,
//     payload,
//   ).catch(err => console.error(err));
// },5000);

module.exports = webpush;