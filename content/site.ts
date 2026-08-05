import {
  proposalRoleDefinitions,
  proposalRoleIdAliases,
} from "@/content/proposal-roles"

export const siteConfig = {
  couple: {
    bride: "Jesie Kameel E. Erojo", //Noenyl Bryle M. Gonzaga
    brideNickname: "Kameel", //Ltryl
    groom: "Gilbert Kiling Pinongcos II", //Ltryl B. Benitez
    groomNickname: "Gilbert",
    debutName: "Micquela Aicelle Jamaine G Enriquez",
    debutNickname: "Jamaine",
    monogram:"/monogram/monogram.png" ,//Ltryl
    backgroundMusic:"/background_music/Lana Del Rey - Young And Beautiful (Lyrics).mp3"
  },
  googleAPI:{
    messageForm: "https://docs.google.com/forms/d/e/1FAIpQLSf9-Tfxquv4A15l0rcHwduHzc4zKj5fpJzFJ01YDBbRCLlWLQ/formResponse",   //done
    message: "https://script.google.com/macros/s/AKfycbwvRKPZWRu1vuRyfuosJ24NaUpIz6gzBbUFxIur_FCXVfpcHUTtfbuqLIq0xsj3B2UWlg/exec",  //done
    guestList: "https://script.google.com/macros/s/AKfycbypkI2pBZFiCyIi0hiky3JwF9Gf3PJecXdeGlGYKVsHZniadtJLOXVKLt7g4v95jccICw/exec",  //done
    guestRequest: "https://script.google.com/macros/s/AKfycbx5PM5ZJD4W9Sy0rmLsHUpGf-HZ4eSzslrAvY8B-_GiYMQTpAY14PajgrMSRvTKpGjsag/exec",   //done
    entourage: "https://script.google.com/macros/s/AKfycbwAAE1lmvCzN9x6g7mRfFZh1d2o9qN393vQ93tqWgQpvnuncPVWemySDo8yvWV0MSJESg/exec",  //done
    sponsors: "https://script.google.com/macros/s/AKfycbxP15hYnj_4nERO1tZCps2DXwRxwqexlvvEPG-qvtAKNyOiLTXzZwSN_dppEoWLrjVQSg/exec",  //done 
    proposalResponses: "https://script.google.com/macros/s/AKfycbwIUDKMoMIHVwbmr6KbgmBtlGRpMGj1Z9maeHSEwsFaXNi0dAH8WYhqbtiAfg_p5D4lgw/exec", // uses entourage script with action: proposal
    weddingDetails: "https://script.google.com/macros/s/AKfycbwJ-Mw_47gU5tfNuZuUusTWOt0p0qtmueSzHIzK7Uesn1nzRDAD3jiktgmXHzR5scVIbA/exec",   //done
////google share 
    googleShare: "https://docs.google.com/spreadsheets/d/16awlmPK2HxOs7Zj3W0v5Z61YOShXH4pDEHcLYE7XsWU/edit?usp=sharing", 
  },
  wedding: {
    date: "August 15, 2026",
    time: "10:00 PM",
    venue: "Boss and Docs Villa 2 and 3, Laguna Hills",
    tagline: "are getting married!!!!!",
    theme: "Our wedding palette is inspired by timeless elegance and warmth.Motif Colors: Champagne Gold, Soft Beige, Warm Soft Brown",
    motif: "#BBCED5, #B9C3A8, #F3D8C5, #D1C4D4, #ECD8BA, #F4E8D8, #E1DCCF",
  },
  proposal: {
    // Use "Maid of Honor" for unmarried, "Matron of Honor" for married
    honorAttendant: "Matron of Honor" as "Matron of Honor" | "Maid of Honor",
    roles: proposalRoleDefinitions,
    roleIdAliases: proposalRoleIdAliases,
  },
  details: {
    rsvp: {
      deadline: "August 30, 2026",
      coordinator: "Gilbert / Kameel",
      phone: "+63 967 697 8754",
    },
  },
  contact: {
    bridePhone: "to be announced",
    groomPhone: "to be announced",
    email: "to be announced",
  },
  giftRegistry: {
    QR_1:{
    id: "BDO",
    src: "/QR/BDO.jpg",
    label: "BDO",
    accountNumber: "**** **** 2933",
    },
    QR_2:{
    id: "MariBank",
    src: "/QR/MariBank.png",
    label: "MariBank",
    accountNumber: "****7672",
    }
    // ,
    // QR_3:{
    // id: "Gcash",
    // src: "/QR/pleaseProvideQR.png",
    // label: "Gcash",
    // accountNumber: "to be announced",
    // }
  },
  ceremony: {
    location: "Boss and Docs Villa 2 and 3, Laguna Hills",
    venue: "Jalandoni St, Calamba, 4027 Laguna",
    map: "https://share.google/h2o6y1udHf0gQjbTk",
    date: "August 15, 2026",
    day: "Saturday",
    time: "6:00 PM",
    entourageTime: "5:30 PM",
    guestsTime: "5:45 PM",
    image: ["/Details/debutlocation.png", "/Details/debutlocation2.png","/Details/image.png"],
  },
  reception: {
    location: "Boss and Docs Villa 2 and 3, Laguna Hills",
    venue: "Jalandoni St, Calamba, 4027 Laguna",
    map: "https://share.google/h2o6y1udHf0gQjbTk",
    date: "August 15, 2026",
    day: "Saturday",
    time: "6:00 PM",
    image: ["/Details/debutlocation.png", "/Details/debutlocation2.png","/Details/image.png"],
  },
  dressCode: {
    theme: "STRICTLY FORMAL",
    sponsors: {
      title: "Sponsors",
      ninang: {
        label: "Ninang",
        description: "Long gown in the shade of silver gray.",
        image: "/Details/Ninang.png",
        palette: ["#D8D3CD", "#C0C0C0", "#A9A9A9", "#969090", "#8C8686"],
      },
      ninong: {
        label: "Ninong",
        description: "Barong Tagalog and black slacks.",
        image: "/Details/Ninong.png",
        palette: ["#D0A386", "#E3C5B3", "#E4DCD1"],
      },
    },
    entourage: {
      title: "Entourage",
      bridesmaid: {
        label: "Bridesmaids",
        description: "Long gown that suits our color motif.",
        image: "/Details/bridesmaid.png",
        palette: ["#B4A3D4", "#C8A2C8"],
      },
      groomsmen: {
        label: "Groomsmen",
        description: "Long sleeve Barong Tagalog and black slacks.",
        image: "/Details/Groomsmen.png",
        palette: ["#D0A386", "#E3C5B3", "#E4DCD1"],
      },
    },
    guests: {
      title: "Guests",
      label: "Guests",
      description: "Formal attire and formal dress.",
      image: "/Details/guest.png",
      palette: ["#D9B8F5", "#A37CD2", "#E6DDD2", "#E4C5B2", "#727E40"],
    },
    paletteNote:
      "To create a cohesive and elegant celebration, we kindly encourage our guests to follow the suggested color palette above. To allow our wedding party to be easily distinguished, we respectfully ask that guests refrain from wearing white or black, as these colors are reserved for the couple and the wedding party.",
    closing:
      "Thank you for helping us bring our wedding vision to life. We can't wait to celebrate with you!",
    note: "We kindly request our guests to dress in attire following our wedding palette.",
  },
  narratives: {
    ourStory: `Once upon a signature…

Our story began with a simple signature, one that slowly turned into something magical. He was my financial advisor, and I was there to sign documents. It was July 5, 2021, and we met at the Lobby of the building. Little did we know, that ordinary day would start a story neither of us expected.

I wasn't looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.

Our journey wasn't rushed, but perfectly timed. We believe that God brought us together in His own way and season.

With hearts full of gratitude, we step into this new chapter hand in hand, trusting His plan and celebrating a love rooted in faith, patience, and grace.

Today, we choose each other- again and again- and we can't wait to celebrate this new chapter with the people we love most.`,
    groom: `The first time Mark saw Catherine, time seemed to slow down. It was an ordinary day that instantly became unforgettable: one smile, one hello, and suddenly his world had a new center. He didn't have the perfect words ready, but he knew he had met someone who felt like home.

Early conversations turned into late-night talks, sharing dreams, favorite meals, and whispered prayers for a future together. With every small adventure—coffee runs, long drives, quiet walks—Mark found himself choosing her over and over again. He loved how she laughed freely, how she listened with her whole heart, and how her faith steadied him.

There were seasons of distance and long workdays, but every reunion reminded him why he stayed patient: because Catherine was worth every mile and every minute apart. When he finally knelt to ask for her hand, it wasn't a question of "if," only "when can we start forever?"`,
    bride: `Catherine remembers the first time Mark said her name. It was gentle but sure, a kindness that made her feel both seen and safe. In that softness, she found a partner who met her with the same grace she prayed to give.

Mark's steadiness won her heart: the way he showed up, even when schedules were tight, and how he always found lightness in the small things. He celebrated her wins, held space for her worries, and never hesitated to choose "us" in every decision.

Now, as they prepare to say yes before God and the people they love most, Catherine is grateful for the patience, humor, and hope Mark brings to every day. She knows this next chapter is just the start of the love story they get to write together.`,
  },
  colors: {
    primary: "#87AE73",
    secondary: "#F5F5DC",
  },
  playlist: {
    title: "A Playlist from our hearts",
    subtitle: "Songs that have been part of our journey together",
    playlistName: "June and Jonas Wedding",
    embedUrl:
    //https://open.spotify.com/embed/playlist/3TD4ZdIHQeckGmY8R3kxMD?utm_source=generator&si=96b94c4072084c7f
      "https://open.spotify.com/embed/playlist/3TD4ZdIHQeckGmY8R3kxMD?utm_source=generator&theme=0&si=96b94c4072084c7f",
    spotifyUrl: "https://open.spotify.com/playlist/3TD4ZdIHQeckGmY8R3kxMD",
  },
  snapShare: {
    googleDriveLink:
      "https://drive.google.com/drive/folders/1NEhUnXdKQhunC7NuqHsnpt2e1m1zGwGF?usp=sharing",
    albumQR: "/QR/AlbumQR.png",
    hashtag: ["#Jamainedebut"],
    instructions: "Please scan this QR Code and upload the photos and videos you have taken during our wedding reception. We are delighted to see your snaps too!",
  },
  accommodation: {
    coordinator: {
      name: "Gilbert / Kameel",
      phone: "+63 967 697 8754",
    },
    hotels: [
      {
        name: "La Luna Resort",
        discount: "Offered 20% discount for early booking",
        facebook: "https://www.facebook.com/lalunabeachresortofficial",
      },
      {
        name: "GOSAM Beach Resort",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100083461714073",
      },
      {
        name: "Calicoan Villa",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/CalicoanVilla",
      },
      {
        name: "G Camp Beachfront",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100085772194096",
      },
      {
        name: "Punta Viajero Beach Resort",
        discount: "Offered 15% discount",
        phone: "0932 214 6408",
        facebook: "https://www.facebook.com/puntoviajeroresort",
      },
      { name: "Balay Sunset" },
      { name: "Balay Pacifico" },
      { name: "Casa Nala" },
      { name: "The Grey Inn" },
    ],
    carRentals: [
      {
        name: "Apex Car Rental Tacloban",
        facebook: "https://www.facebook.com/profile.php?id=61574882327115",
      },
      {
        name: "Cassey Wheels Car Rental",
        facebook: "https://www.facebook.com/search/top?q=casseywheels%20car%20rental",
      },
    ],
  },
}

export const entourage = [
  // Best Man & Maid/Matron of Honor
  { role: "Best Man", name: "Red Casallo" },
  { role: "Matron of Honor", name: "Imeeliza Timpug" },

  // Parents of the Bride
  { role: "Father", name: "Jaime Balajadia (Uncle)", group: "kate-family" },
  { role: "Mother", name: "Eloida Ricohermoso", group: "kate-family" },

  // Parents of the Groom
  { role: "Brother", name: "Perry Ticbaen (Brother)", group: "christian-family" },
  { role: "Mother", name: "Felicitas Ticbaen", group: "christian-family" },

  // Bridesmaids
  { role: "Bridesmaid", name: "Thea Lynn Dela Cruz" },
  { role: "Bridesmaid", name: "Keara Zane A Cariño" },
  { role: "Bridesmaid", name: "Fidnah Gracia Padallan" },
  { role: "Bridesmaid", name: "Lorna Ladisla" },
  { role: "Bridesmaid", name: "Carla Vanessa Tabilin" },
  { role: "Bridesmaid", name: "Romela Tolentino" },
  { role: "Bridesmaid", name: "Emmalyn Lipio" },
  { role: "Bridesmaid", name: "Carmen Pascual" },
  { role: "Bridesmaid", name: "Ciddie Manota" },

  // Groomsmen
  { role: "Groomsman", name: "Noah Alcaria" },
  { role: "Groomsman", name: "Jervin Garcia" },
  { role: "Groomsman", name: "Myric Mateo" },
  { role: "Groomsman", name: "Caughvan Faustino" },
  { role: "Groomsman", name: "Jayson Torquiano" },
  { role: "Groomsman", name: "Jendah Egino" },
  { role: "Groomsman", name: "Vincent Saguinsin" },
  { role: "Groomsman", name: "Frederick Manota" },
  { role: "Groomsman", name: "Emerson Sulit" },

  // Secondary Sponsors
  // Candle Sponsors
  { role: "Bridesmaid", name: "Romela Tolentino", group: "candle" },
  // Cord Sponsors
  { role: "Bridesmaid", name: "Emmalyn Lipio", group: "cord" },

  // Flower Girls and Little Bride
  { role: "Flower Girl", name: "Kirsten Elija Leyson" },
  { role: "Flower Girl", name: "Blake Juan" },
  { role: "Flower Girl", name: "Reign Arastel Rivera" },
  { role: "Little Bride", name: "Paige Yael Ticbaen" },

  // Ring / Coin Bearers
  { role: "Ring Bearer", name: "Khaleb Dwayne M. Beltran" },
  { role: "Coin Bearer", name: "Lucas Rhaiden Beltran" },
  { role: "Ring Bearer", name: "Dean James Ticbaen" },
]

export const principalSponsors = [
  // Paired from provided Male and Female Sponsors (order-based)
  { name: "Mr. Jony Balao", spouse: "Mrs. Conception Balao" },
  { name: "Mr. Cresencio Francisco", spouse: "Dr. Editha Francisco" },
  { name: "Mr. Aurelio Sab-it", spouse: "Mrs. Ester Sab-it" },
  { name: "Mr. Pio McLiing", spouse: "Mrs. Edna Boloma" },
  { name: "Mr. Fabian Dupiano", spouse: "Mrs. Mary Christine Dupiano" },
  { name: "Mr. Roberto Dosdos", spouse: "Mrs. Angelica Dosdos" },
  { name: "Mr. George Sacla", spouse: "Mrs. Minda De Bolt Sacla" },
  { name: "Mr. Elmo Casallo", spouse: "Mrs. Nora Casallo" },
  { name: "Engr. Jimmy Atayoc Sr", spouse: "Mrs. Mercedes Atayoc" },
  { name: "Mr. Tomas Moyongan", spouse: "Mrs. Betty Moyongan" },
  { name: "Mr. Roger Balantin", spouse: "Mrs. Delia Balantin" },
  { name: "Honorable Mayor Roderick Awingan", spouse: "Mrs. ____ Awingan" },
  { name: "Engr Roy Kepes", spouse: "Vice Gove MaryRose Kepes Fongwan" },
  { name: "Mr. Bobos Nestor Fongwan", spouse: "Mrs. Marga Sison" },
  { name: "Mr. Junvic Suguinsin", spouse: "Mrs. Lavenia Inson" },
  { name: "Mr. Salino Dosdos Jr", spouse: "Mrs. Gina Guiang" },
  { name: "Mr. Pampilo Balajadia", spouse: "Mrs. Angelica Balajadia" },
  { name: "Mr. Alan M. Serduar", spouse: "Mrs. Oliva Serduar" },
  { name: "Mr. Miguel Franco", spouse: "Mrs. Angela Balajadia" },
  // Remaining Female Sponsors without paired male
  { name: "Mrs. Carina C. Watanabe", spouse: "" },
  { name: "Mrs. Cecile Palilio", spouse: "" },
  { name: "Mrs. Nida Saguinsin", spouse: "" },
  { name: "Mrs. Araceli Pitogo", spouse: "" },
  { name: "Mrs. Alda Unidad", spouse: "" },
  { name: "Mrs. Reine Bernadeth Bolanos", spouse: "" },
]
