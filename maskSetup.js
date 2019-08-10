//breakmark mens art to womens art
// Not actually Javascript, it's ExtendScript, basically ECMA3
if (app.documents.length > 0) {
  var bkDoc = app.activeDocument;

  // check for breakmark template
  if (bkDoc.name == "breakmark-template.ai") {
    var bkArtLayer = bkDoc.layers[bkDoc.layers.length - 1];
    var bkMensMasks = filter(bkArtLayer.groupItems, onlyMensMask);
    var bkWomensMasks = filter(bkArtLayer.pathItems, onlyWomensMask);

    for (var i = 0; i < bkMensMasks.length; i++) {
      var bkWomensArt = findFemaleCounterpart(bkWomensMasks, bkMensMasks[i].name);
      if (bkWomensArt != undefined && bkWomensArt != null) {
        // Now do the thing
        var workingMask = bkMensMasks[i].duplicate(bkWomensArt, ElementPlacement.PLACEAFTER);
        var workingMaskClip = workingMask.pathItems[0];
        var scale = bkWomensArt.height / workingMaskClip.height * 100;

        workingMask.resize(scale, scale);

        var center = bkWomensArt.left + bkWomensArt.width / 2;
        var offsetLeft = workingMaskClip.left + workingMaskClip.width / 2 - workingMask.left;
        var left = center - offsetLeft;
        var offsetTop = workingMaskClip.top - workingMask.top;
        var top = bkWomensArt.top - offsetTop;

        workingMask.position = [left, top];
        workingMask.name = bkWomensArt.name;
        bkWomensArt.move(workingMask, ElementPlacement.PLACEATBEGINNING);
        workingMask.clipped = false;
        workingMaskClip.remove();
        bkWomensArt.clipping = true;
        workingMask.clipped = true;
      }
    }
    newFile = new File(bkDoc.path + "/breakmark-all-art.ai");
    bkDoc.saveAs(newFile);
  } else {
    alert("Open and select the breakmark setup file first.");
  }
}

function findFemaleCounterpart(womensMasks, mensMaskName) {
  var nameToMatch = "wo" + mensMaskName;
  var counterPart = filter(womensMasks, function (mask) { return mask.name === nameToMatch });

  return counterPart[0];
}

function onlyMensMask(mask) {
  var firstFour = mask.name.substr(0, 4);
  var lastFour = mask.name.substr(mask.name.length - 4, 4);

  return firstFour === "mens" && lastFour === "mask";
}

function onlyWomensMask(mask) {
  var firstSix = mask.name.substr(0, 6);
  var lastFour = mask.name.substr(mask.name.length - 4, 4);

  return firstSix === "womens" && lastFour === "mask";
}

// Returns new list
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