$(function () {
    $('.post-form-btn').on('click', function(e) {
        e.preventDefault()
    
        var data = {
          title: $('#post-title').val(),
          body: $('#post-body').val(),
        }
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/newpost'
          }).done(function(data) {
            if(!data.ok){
              alert(data.error)
            }else{
             $(location).attr('href','/')
            }
          })
    })
})