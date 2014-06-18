function handleFileSelect(evt)
{
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object
    var output = document.getElementById('uploaded-files');
    var imgs_data = [];
    var z = 0;

    for(var i = 0, f; f = files[i]; i++)
    {
        // Only process image files
        if(!f.type.match('image.*')) {
            continue;
        }

        // not allow images bigger then 5 mb
        if(f.size > 5242880) {
            continue;
        }

        imgs_data[i] = {};
        imgs_data[i].name = f.name;
        imgs_data[i].size = f.size;
        imgs_data[i].type = f.type;

        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var img = document.createElement('img');
                img.src = e.target.result;
                output.appendChild(img);

                imgs_data[z].src = e.target.result;
                imgs_data[z].cropper = new Cropper(img);

                z++;
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }

    // save images
    var save_btn = document.createElement('a');
    save_btn.id = 'save-imgs';
    save_btn.href = '#';
    save_btn.innerHTML = "Save Images";

    insertAfter(output, save_btn);

    save_btn.addEventListener("click", function() {
        event.preventDefault();
        saveImages(imgs_data)
    }, false);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function saveImages(imgs_data) {
    console.log(imgs_data);
}

// drop zone
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

// helper functions
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}