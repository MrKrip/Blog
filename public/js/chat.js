$(function(){
    var socket=io.connect()
    var $form = $("#messForm"); 
    var $textarea = $("#message"); 
    var $all_messages = $("#all_mess");


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
             
            }
          })
    })

    $form.submit(function(event) {
        event.preventDefault();
        socket.emit('send mess', {mess: $textarea.val(), name: $name.val(), className: alertClass});
        $textarea.val('');
    });

  })
