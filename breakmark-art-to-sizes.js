//breakmark art to sizes
// Not actually Javascript, it's ExtendScript, basically ECMA3
if (app.documents.length > 0) {
  var bkDoc = app.activeDocument;

  // check for breakmark template
  if (bkDoc.name == "breakmark-all-art.ai") {
    var bkArtLayer = bkDoc.layers[bkDoc.layers.length - 1];
    var bkSizeLayers = filter(bkDoc.layers, onlySizes);

    for (var i = 0; i < bkArtLayer.groupItems.length; i++) {

      // for each size, make a copy
      for (var j = 0; j < bkSizeLayers.length; j++) {
        var artMask = bkArtLayer.groupItems[i];
        var sizeMask = bkSizeLayers[j].pathItems.getByName(artMask.name);

        if (sizeMask != undefined && sizeMask != null) {
          var workingMask = artMask.duplicate(sizeMask, ElementPlacement.PLACEAFTER);

          copyAllSizes(workingMask, sizeMask);
        }
      }
    }

    bkArtLayer.remove();

    newFile = new File(bkDoc.path + "/breakmark-all-sizes.ai");
    bkDoc.saveAs(newFile);
  } else {
    alert("Open and select the breakmark setup file first.");
  }
}

// Take the working mask, and use the size mask to move and scale it
// Warning: This has side effects (AKA if modifies the images), this is purpose of the script.
// (Mask, Mask) :: NoReturn
function copyAllSizes(workingMask, sizeMask) {
  var workingMaskClip = workingMask.pathItems[0];
  var scale = sizeMask.height / workingMaskClip.height * 100;

  workingMask.resize(scale, scale);

  var center = sizeMask.left + sizeMask.width / 2;
  var offsetLeft = workingMaskClip.left + workingMaskClip.width / 2 - workingMask.left;
  var left = center - offsetLeft;

  var offsetTop = workingMaskClip.top - workingMask.top;
  var top = sizeMask.top - offsetTop;

  workingMask.position = [left, top];
  workingMask.name = sizeMask.name;
  sizeMask.move(workingMask, ElementPlacement.PLACEATBEGINNING);
  workingMask.clipped = false;
  workingMaskClip.remove();
  sizeMask.clipping = true;
  workingMask.clipped = true;
}

// Used to filter, returns true only for all masks
function onlySizes(layer) {
  var lastFour = layer.name.substr(layer.name.length - 4, 4);

  return lastFour === "mask";
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
