$(function(){
  function buildHTML(message){
    if (message.image){
      let html =
        `<div class="messages__box1" data-message-id=${message.id}>
          <div class="messages__box1__name-time">
            <div class="messages__box1__name-time__name">
              ${message.user_name}
            </div>
            <div class="messages__box1__name-time__time">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__box1__message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="messages__box1" data-message-id=${message.id}>
          <div class="messages__box1__name-time">
            <div class="messages__box1__name-time__name">
              ${message.user_name}
            </div>
            <div class="messages__box1__name-time__time">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__box1__message">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  let reloadMessages = function(){
    let last_message_id = $('.messages__box1:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "GET",
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };

  setInterval(reloadMessages, 7000);
});