$(document).ready(function(){
  $('#continue_payment').click(function(){
      var url = window.location.href;
      var params = url.split('/')
      var ticket_code = params[params.length-1]
      var name = $('#ten_KH').val()
      var phone = $('#sdt').val();
      var email = $('#email').val();
      var birth = $('#ngay_sinh').val();
      var address = $('#dia_chi').val();
      var payment = $('input[name="radiopayment"]:checked').val();
      if(name==''||phone==''||email==''||address==''||payment==undefined)
        alert('Vui lòng nhập đầy đủ thông tin')
      else
      {
        $.ajax({
          type:'POST',
          url: '/order_ticket',
          data: JSON.stringify({"name": name, "phone": phone, "ticket_code": ticket_code, "email":email, "address":address}),
          dataType: "json",
          contentType: 'application/json',
          success: function(res){
              if(res.status=='success'){
                window.location = `/xac_nhan_thanh_toan.ejs/madatcho/${res.MaDatCho}/phuongthuc/${payment}`
              }
              else{
                alert('Đăng ký thất bại, vui lòng thử lại')
              }
          }
        })
      }
    })
})