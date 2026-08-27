export const birthdayData = {
  recipientName: "Shakshi",
  secretPin: "1234",

  giftBox: {
    title: "A surprise awaits you... 🎁",
    subtitle: "Something special, just for you ❤️",
    tapHint: "Tap the gift to open 🎁",
  },

  pinLock: {
    title: "One little secret before we continue... 🤫❤️",
    subtitle: "Enter the secret PIN",
    error: "Oops! That's not the right PIN. Try again ❤️",
  },

  birthdayIntro: {
    heading: "Happy Birthday, Shakshi! 🎂❤️",
    subheading: "My Princess, today is all about you. 🫶🏻✨",
    message:
      "May your smile always stay this cute, your heart always stay this happy, and may this year bring you all the little things that make you smile. ❤️",
    prompt: "Ready for your little birthday surprise? 🎁",
    button: "Let's begin →",
  },

  cake: {
    heading: "Make a wish, Shakshi... 🎂✨",
    wishMade: "Wish made? 🥹❤️",
    wishHope: "I hope it comes true. ✨",
    button: "Continue →",
    candleCount: 5,
  },

  balloons: {
    heading: "A few little wishes for you... 🎈❤️",
    wishes: [
      "Thank you for always making me feel so special. 🥹 💗",
      "You deserve all the love and beautiful things. 🌷",
      "You are my favourite person, always 💕",
      "Thank you for all the gossips and little updates. 😂 💗",
      "i wish we will meet again and have lots of fun🥰 💗",
      "i wish mikku comes back into your life with lots of affection ,love and happin",
    ],
    completeTitle: "Okayyy... that's enough wishes for now. 😂🎈❤️",
    completeSubtitle: "But I still have something to tell you...",
    button: "Continue →",
  },

  puzzle: {
    successTitle: "YOU DID IT! ❤️",
    successSubtitle:
      "Okay Shakshi, you're officially ready for the next surprise. 😂✨",
    button: "Next surprise →",
  },

  surprise: {
    lines: [
      "Wait...",
      "There's still one more thing. ❤️",
      "For my special dost...",
      "Something from my heart. 💌",
    ],
  },

  letterIntro: {
    cardHeartHint: "💌",
    heading: "A Letter Just For You",
    tapHint: "Tap to open 💌",
    watchAgain: "↻ Watch it again",
  },

  letter: `my princess, ❤️

Happy Birthday to one of the most special people I met. 🫶🏻 Kabhi-kabhi mujhe khud believe nahi hota ki sirf do months mein koi insaan itna close aur itna important kaise ho sakta hai. Sikar mein saath padhai karna, saath mein romantic songs sunna, bina kisi reason ke maze karna, ice cream khane jaana, mart mein ghoomna aur phir ek dusre se dil ki har chhoti-badi baat share karna—ye sab memories mere liye hamesha bahut special rahengi. ❤️

Tumhare saath sab kuch itna effortless tha ki pata hi nahi chala kab hum sirf saath padhne wale logon se itne ache friends ban gaye. Tum un logon mein se ho jinke saath rehkar bas achha feel hota hai, jinke saamne bina soche apni baatein share kar sakte hain. Aur sach kahun toh Sikar ki meri memories tumhare bina imagine karna mushkil hai. 🥹

I'm really grateful for every laugh, every random conversation, every song, every ice cream, every little outing and every secret we shared. Shayad humari friendship ko zyada time nahi hua, but jo bond bana hai woh mere liye bahut precious hai. Bas aise hi hamesha khush rehna, apni cute si smile kabhi mat khona, aur life mein jo bhi chahti ho woh tumhe mile. ❤️

Happy Birthday once again, meri special dost. 🎂✨

I hope humari friendship ke aage bhi aisi hi bahut saari crazy, funny aur beautiful memories judti rahein. And yes, Sikar ki woh wali vibe aur hamare songs kabhi nahi bhoolne wale. 😂❤️

Lots of love,

cutieeee 😘💕❤️😍`,

  final: {
    heading: "Happy Birthday, Shakshi! 🎂❤️",
    lines: [
      "My princess, I hope this little surprise made you smile. 🥹❤️",
      "Here's to more songs, more ice creams, more random outings, more crazy conversations and many, many more memories together. ✨",
      "Stay happy. Stay crazy. Stay exactly the way you are. ❤️",
      "Happy Birthday once again, Shakshi! 🎂🎉❤️",
    ],
    watchAgain: "↻ Watch it again",
  },

  music: {
    path: "/music/birthday-song.mp3",
  },
};

export type Stage =
  | "gift"
  | "pin"
  | "intro"
  | "cake"
  | "balloons"
  | "puzzle"
  | "surprise"
  | "letterIntro"
  | "letter"
  | "final";
