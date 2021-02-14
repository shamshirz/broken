//breakmark sizes to individual files (unfinished)
// Not actually Javascript, it's ExtendScript, basically ECMA3
if (app.documents.length > 0) {
  var bkDoc = app.activeDocument;
  var allArtboards = bkDoc.artboards;
  var original_file = bkDoc.fullName;

  // check for breakmark template
  if (bkDoc.name == "breakmark-all-sizes.ai") {
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
    var bkSizes = [ "XS", "SM", "MD", "LG", "XL" ];
    
    //will make a new file (per size) for each product
    //for (var product = 0; product < bkProducts.length; product++) {
      var currentProduct = bkProducts[0];

      //loop through artboards and remove any unneeded
      for (var artboard = 0; artboard < allArtboards.length; artboard++) {
        var currentArtboard = allArtboards[artboard];
        var productNeedsArtboard = false;

        //loop through pieces in current product to check for match
        for (var piece = 0; piece < currentProduct.pieces.length; piece++) {
          var currentPiece = currentProduct.pieces[piece];

          if (currentArtboard.name == currentPiece) {
            productNeedsArtboard = true;
            break;
          }
        }

        if (productNeedsArtboard) {
          productNeedsArtboard = false;
        } else {
          allArtboards.setActiveArtboardIndex(artboard);
          bkDoc.selectObjectsOnActiveArtboard();
          app.cut();
          currentArtboard.remove();
        }
      }
    //}
  } else {
    alert("Open and select the breakmark setup file first.");
  }
}

// Returns new list
// (List a, fxn a -> Boolean) :: List a
function filter(list, fxn) {
  var newList = [];
  for (var i = 0; i < list.length; i++) {
    item = list[i];
    if (fxn(item)) {
      newList.push(item)
    }
  }
  return newList;
}

// newFile = new File(bkDoc.path + ".ai");
// bkDoc.saveAs(newFile);
// bkDoc.close();
// app.open(File(original_file));