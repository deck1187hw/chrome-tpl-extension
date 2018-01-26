// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var domInfo = {
      total:   document.querySelectorAll('*').length,
      inputs:  document.querySelectorAll('input').length,
      buttons: document.querySelectorAll('button').length,
      esma_comment: document.getElementById("00N4E000001a3J3_ileinner").innerHTML,
      esma_email: document.getElementById("00N4E000001a3J5_ileinner").innerHTML,
      esma_subject: document.getElementById("00N4E000001a3h4_ileinner").innerHTML,
      esma_name: document.getElementById("00N4E000001a3J6_ileinner").innerHTML,
      esma_locale: document.getElementById("00N4E000001a3J4_ileinner").innerHTML
    };

    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(domInfo);
  }


  if ((msg.from === 'popup') && (msg.subject === 'paste')) {

   // Inject conent directly in the current tab's DOM
    $(function (){
      $('#edit-anon-mail').val('manolin');
    });
    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(msg.esma_obj);
  }

});