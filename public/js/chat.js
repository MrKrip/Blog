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
             $(location).attr('href','/')
            }
          })
    })
  })
