function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;

    if (!imageType.test(file.type)) {
      var div = document.createElement("div");
      preview.appendChild(div);
      var p = document.createElement("p");
      p.innerHTML = file.name;
      div.appendChild(p);
      var reader = new FileReader();
      reader.onloadend = function () {
        a.href = reader.result;
      }
      var a = document.createElement("a");
      reader.readAsDataURL(file);
      a.innerHTML = "Shareable Link";
      div.appendChild(a);
      continue;
    }

    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    var div = document.createElement("div");
    div.id = file.name;
    preview.appendChild(div);
    div.appendChild(img);
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; a.href = e.target.result;}; })(img);
    var a = document.createElement("a");
    reader.readAsDataURL(file);
    a.innerHTML = "Shareable Link";
    var br = document.createElement("br");
    div.appendChild(br);
    div.appendChild(a);
  }
}

document.getElementById("uploadBtn").onchange = function () {
    document.getElementById("uploadFile").value = this.value.replace("C:\\fakepath\\", "");
    handleFiles(this.files)
};
