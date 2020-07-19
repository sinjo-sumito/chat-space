$(function(){
  function buildMessage(message){    
    if ( message.image ) {
      let html = 
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="chat-main__message__box">
          <div class="chat-main__message__box__info">
            <div class="chat-main__message__box__info__username">
              ${message.user_name}
            </div>
            <div class="chat-main__message__box__info__date">
              ${message.created_at}
            </div>
          </div>
        </div>  
        <div class="chat-main__message__posting">
          <p class="Message__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`
      return html;  
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}></div>
        <div class="chat-main__message__box">
          <div class="chat-main__message__box__info">
            <div class="chat-main__message__box__info__username">
              ${message.user_name}
            </div>
            <div class="chat-main__message__box__info__date">
              ${message.created_at}
            </div>
          </div>
        </div> 
        <div class="chat-main__message__posting">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
        return html;
      };
  }
    
    
  
  
  let reloadMessages = function() {
    
    let last_message_id = $('.MessageBox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildMessage(message)
        });
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
