$(function(){
  function buildHTML(message){
    picture=message.image?message.image:null
    var html =
    `<div class="message" data-message-id=${message.user_id}>
        <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
      <img src=${picture} >
    </div>`
    return html;
  };
  $('.msg_form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action')
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').val('')
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
})