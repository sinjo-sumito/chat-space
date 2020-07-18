$(function(){
  function buildMessage(message){    
    if ( message.image ) {
      let html = 
      `<div class="chat-main__message__box">
        <div class="chat-main__message__box__info">
          <div class="chat-main__message__box__info__username">
            ${message.user_name}
          </div>
          <div class="chat-main__message__box__info__date">
            ${message.created_at}
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
      `<div class="chat-main__message__box">
          <div class="chat-main__message__box__info">
            <div class="chat-main__message__box__info__username">
              ${message.user_name}
            </div>
            <div class="chat-main__message__box__info__date">
              ${message.created_at}
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
    
    
  
  $('.chat-main__message-form__box').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildMessage(message)
      $('.chat-main__message').append(html);
      $('form')[0].reset(); 
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      $('.chat-main__message-form__box__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})