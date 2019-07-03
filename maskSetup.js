// Not actually Javascript, it's ExtendScript, basically ECMA3
if (app.documents.length > 0) {
  var bkDoc = app.activeDocument;

  // check for breakmark template
  if (bkDoc.name == "breakmark-template.ai") {
    var bkArtLayer = bkDoc.layers[bkDoc.layers.length - 1];
    var bkMensMasks = filter(bkArtLayer.groupItems, isMaleMask);
    var bkWomensMasks = filter(bkArtLayer.pathItems, isFemaleMask);

    for (var i = 0; i < bkMensMasks.length; i++) {
      var bkWomensArt = findFemaleCounterpart(bkWomensMasks, bkMensMasks[i].name);

      if (bkWomensArt != undefined && bkWomensArt != null) {
        var workingMask = bkMensMasks[i].duplicate(bkWomensArt, ElementPlacement.PLACEAFTER);
        createScaledFemaleMask(workingMask, bkWomensArt);
      }
    }

    newFile = new File(bkDoc.path + "/breakmark-all-art.ai");
    bkDoc.saveAs(newFile);
  } else {
    alert("Open and select the breakmark setup file first.");
  }
}

// Take the new mask, and use the female mask to move and scale it
// Warning: This has side effects (AKA if modifies the images), this is the meat.
// (Mask, Mask) :: NoReturn
function createScaledFemaleMask(workingMask, femaleArt) {
  var workingMaskClip = workingMask.pathItems[0];
  var scale = femaleArt.height / workingMaskClip.height * 100;

  workingMask.resize(scale, scale);

  var center = femaleArt.left + femaleArt.width / 2;
  var offsetLeft = workingMaskClip.left + workingMaskClip.width / 2 - workingMask.left;
  var left = center - offsetLeft;
  var offsetTop = workingMaskClip.top - workingMask.top;
  var top = femaleArt.top - offsetTop;

  workingMask.position = [left, top];
  workingMask.name = femaleArt.name;
  femaleArt.move(workingMask, ElementPlacement.PLACEATBEGINNING);
  workingMask.clipped = false;
  workingMaskClip.remove();
  femaleArt.clipping = true;
  workingMask.clipped = true;
}


// Filter Female masks searching for a mask matching the mens name
// (List Mask, String) :: Mask | nil
function findFemaleCounterpart(womensMasks, mensMaskName) {
  var nameToMatch = "wo" + mensMaskName;
  var counterPart = filter(womensMasks, function (mask) { return mask.name === nameToMatch });

  return counterPart[0];
}


// Used to filter, returns true only for men's masks
// ({name: String}) :: Boolean
function isMaleMask(mask) {
  var firstFour = mask.name.substr(0, 4);
  var lastFour = mask.name.substr(mask.name.length - 4, 4);

  return firstFour === "mens" && lastFour === "mask";
}

// Used to filter, returns true only for women's masks
// ({name: String}) :: Boolean
function isFemaleMask(mask) {
  var firstSix = mask.name.substr(0, 6);
  var lastFour = mask.name.substr(mask.name.length - 4, 4);

  return firstSix === "womens" && lastFour === "mask";
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