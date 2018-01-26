// Update the relevant fields with the new data
function setDOMInfo(info) {
  //store storage here...
  document.getElementById('total').textContent   = info.total;
  document.getElementById('inputs').textContent  = info.inputs;
  document.getElementById('buttons').textContent = info.buttons;

  console.log(info);
  chrome.storage.sync.set({"esmaItems": info});

}

function pasteDom(info){

  console.log(info);
}


$(function (){

    $('#saveFields').click(function(){
      
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},
            setDOMInfo);
      });
    });

    $('#getFields').click(function(){

        chrome.storage.sync.get("esmaItems", function (obj) {
              console.log(obj);

              chrome.tabs.query({
                active: true,
                currentWindow: true
              }, function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {from: 'popup', subject: 'paste', esma_obj:obj},
                    pasteDom);
              });

          });

    });

});

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  
});
