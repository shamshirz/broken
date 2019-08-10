//rename paths to make things easier
// Not actually Javascript, it's ExtendScript, basically ECMA3
if (app.documents.length > 0) {
  var bkDoc = app.activeDocument;

  // check for breakmark template
  if (bkDoc.name == "breakmark-template.ai") {
    var allArtboards = bkDoc.artboards;
    app.selection = null;

    for (var i = 0; i < allArtboards.length; i++) {
      currentName = allArtboards[i].name;
      allArtboards.setActiveArtboardIndex(i);
      bkDoc.selectObjectsOnActiveArtboard();

      for (var j = 0; j < app.selection.length; j++) {
        currentObject = app.selection[j]
        if (currentObject.typename == "CompoundPathItem") {
          currentObject.name = currentName.trim() + " guide";
        } else {
          currentObject.name = currentName.trim() + " mask";
        }
      }

      app.selection = null;
    }

  } else {
    alert("Open and select the breakmark setup file first.");
  }
}
