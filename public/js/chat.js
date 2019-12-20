$(function(){
    var socket=io.connect()

    $('.btn-danger').on('click', function(e) {
        e.preventDefault()
    
        var data = {
            message: $('#message').val(),
        }
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/chat'
          }).done(function(data) {
            if(!data.ok){
              alert(data.error)
            }else{
             const name=data.login
             var $form = $("#messForm"); 
             var $textarea = $("#message"); 
             socket.emit('send mess', {mess: $textarea.val(), name: name});
            $textarea.val('');
            }
            
          })

    })

    var $all_messages = $("#all_mess");
    socket.on('add mess', function (send) {
      $all_messages.append('<div><b>'+send.name+'</b>: ' + send.mess +'</div>' )
    })

  })
