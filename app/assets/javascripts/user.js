$(document).on('turbolinks:load', function(){
  var search_list = $('#user-search-result');
  var member_list = $('#member_search_result');
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }
  function appendErrMsg(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }
  function appendMembers(name, user_id){
    var html = `<div class='chat-group-user clearfix'>
                  <input name='group[user_ids][]' type='hidden' value= ${ user_id }>
                  <p class='chat-group-user__name'>${ name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
    return html;
  }
  $('#user-search-field').on('keyup', function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      if  (input.length === 0){
        $('#user-search-result').empty();
      }
      else if(input.length !== 0){
        $('#user-search-result').empty();
        users.forEach(function(user){
          appendUser(user)
        });
      }
      else{
        $('#user-search-result').empty();   
        appendErrMsg('一致するユーザが見つかりません');
      }
    })
    .fail(function(){
      alert('error');
    })
  });

  $(document).on('click', '.user-search-add', function(){
    var name = $(this).data('user-name');
    var user_id = $(this).data('user-id');  
    $(this).parent().remove();
    appendMembers(name, user_id);
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});