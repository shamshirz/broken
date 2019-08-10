//breakmark sizes to individual files
// Not actually Javascript, it's ExtendScript, basically ECMA3
if (app.documents.length > 0) {
  var bkDoc = app.activeDocument;

  // check for breakmark template
  if (bkDoc.name == "breakmark-template.ai") {
    var bkProducts = [
      {
        name: "111",
        pieces: [
          "mens jersey back", 
          "mens jersey front", 
          "mens short sleeve left", 
          "mens short sleeve right",
          "collar"
        ]
      },
      {
        name: "112",
        pieces: [
          "mens jersey back", 
          "mens jersey front", 
          "mens long sleeve left", 
          "mens long sleeve right",
          "collar"
        ]
      },
      {
        name: "113",
        pieces: [
          "mens hood left",
          "mens hood right",
          "mens jersey back", 
          "mens jersey front", 
          "mens long sleeve left", 
          "mens long sleeve right"
        ]
      },
      {
        name: "221",
        pieces: [
          "womens jersey back", 
          "womens jersey front", 
          "womens short sleeve left", 
          "womens short sleeve right",
          "collar"
        ]
      },
      {
        name: "222",
        pieces: [
          "womens jersey back", 
          "womens jersey front", 
          "womens long sleeve left", 
          "womens long sleeve right",
          "collar"
        ]
      },
      {
        name: "223",
        pieces: [
          "womens hood left",
          "womens hood right",
          "womens jersey back", 
          "womens jersey front", 
          "womens long sleeve left", 
          "womens long sleeve right"
        ]
      },
      {
        name: "333",
        pieces: [
          "mens tank back", 
          "mens tank front"
        ]
      },
      {
        name: "333R",
        pieces: [
          "mens tank inside back", 
          "mens tank inside front",
          "mens tank outside back", 
          "mens tank outside front"
        ]
      },
      {
        name: "334W",
        pieces: [
          "womens tank back", 
          "womens tank front"
        ]
      },
      {
        name: "334WR",
        pieces: [
          "womens tank inside back", 
          "womens tank inside front",
          "womens tank outside back", 
          "womens tank outside front"
        ]
      },
      {
        name: "551",
        pieces: [
          "mens bottoms left", 
          "mens bottoms right"
        ]
      },
      {
        name: "881",
        pieces: [
          "womens bottoms left", 
          "womens bottoms right"
        ]
      }
    ];

  } else {
    alert("Open and select the breakmark setup file first.");
  }
}
