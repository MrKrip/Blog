$(function() {
$('.regist100-form-btn').on('click', function(e) {
    e.preventDefault()

    var data = {
      login: $('#Reg-Login').val(),
      password: $('#Reg-pass').val(),
    }
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/register'
    }).done(function(data) {
      if(!data.ok){
        alert(data.error)
      }else{
        $(location).attr('href','/')
      }
    })
  })


  $('.login-form-btn').on('click', function(e) {
    var data = {
      login: $('#Log-Login').val(),
      password: $('#Log-pass').val(),
    }

    console.log(data)
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/log'
    }).done(function(data) {
      if(!data.ok){
        alert(data.error)
      }else{
        $(location).attr('href','/')
      }
    })
  })


  $('.input100').each(function(){
    $(this).on('blur', function(){
        if($(this).val().trim() != "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    })    
})


var showPass = 0;
$('.btn-show-pass').on('click', function(){
    if(showPass == 0) {
        $(this).next('input').attr('type','text');
        $(this).find('i').removeClass('zmdi-eye');
        $(this).find('i').addClass('zmdi-eye-off');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type','password');
        $(this).find('i').addClass('zmdi-eye');
        $(this).find('i').removeClass('zmdi-eye-off');
        showPass = 0;
    }
    
})
})
