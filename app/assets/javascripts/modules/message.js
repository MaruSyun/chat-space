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

  $(".new-message").on('submit', function(e){
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
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージを入れてください");
    })
  });
});