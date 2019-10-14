$(function(){
  function buildHTML(message){
    var picture = message.image.url? `<img src=${message.image.url} >` : " ";
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
      ${picture}
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
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('form')[0].reset();
      var target = $('.message').last();
      $("html,body").animate({scrollTop:target.offset().top});
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  var reloadMessages = function() {
    var presentHTML = window.location.href;
    if (presentHTML.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data("id"); 
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var innerHTML = '';
      messages.forEach(function(message){
        innerHTML = buildHTML(message);
        $('.messages').append(innerHTML);
        var target = $('.message').last();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      })
    })
    .fail(function(){
      alert('error');
      })
    }
    else {
      clearInterval(interval)
    };
  };
  setInterval(reloadMessages, 5000);
});