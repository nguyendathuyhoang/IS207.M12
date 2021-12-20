function plus_day(start_date,day){
    //cong ngay
    var date = new Date(start_date);
    date.setDate(date.getDate()+day);
    
    //dinh dang lai ngay de hien thi
    day_dict = {0:'Chủ Nhật',1:'Thứ Hai', 2:'Thứ Ba', 3:'Thứ Tư', 4:'Thứ Năm', 5:'Thứ Sáu', 6:'Thứ Bảy'}
    var month = date.getMonth() + 1
    var day_of_week = day_dict[date.getDay()]
    formated_date = day_of_week + ' - ' + date.getDate() + '/' + month + '/' + date.getFullYear();

    //tra ket qua
    return formated_date;
}

function get_flight(depart,des,start_date,day,schedule){
    var date = new Date(start_date);
    date.setDate(date.getDate()+day);
    var month = date.getMonth() + 1
    var formated_date = date.getFullYear() + '-' + month + '-' + date.getDate()
    console.log(formated_date)

    $.ajax({
        type:'POST',
        url: '/result_flight',
        data: JSON.stringify({"depart": depart, "des": des, "date": formated_date}),
        dataType: "json",
        contentType: 'application/json',
        success: function(res){
            if(res.length==0)
            {
                html_result = `<div class="col-lg-12" style="text-align: center; color: red;">
                <b>Hệ thống không tìm thấy chuyến bay vào ngày này hoặc đã hết chỗ.</b>
                <br>
                <b>Quý khách vui lòng chọn ngày khác</b>
              </div> `
              $(schedule).html(html_result)
            }
            else{
                html_result = ``
                console.log(res)
                for(var i=0; i<res.length; i++){
                    let color = "green"
                    let bcolor = "#f5ebed"
                    if (res[i].HangVe == "Skyboss")
                        color = "red"
                    if (i%2==0)
                        bcolor = "#e4edeb"
                    else
                        bcolor = "#f5ebed"
                    if (res[i].HangVe == "Skyboss")
                        color = "red"
                    row_result_html = `        <div class="row" style="background-color:${bcolor}">
                    <div class="col-lg-3">
                      <p style="text-align: center;">
                        <b>
                            ${res[i].MaChuyenBay}<img title src="/image/chair-seat.png" style="height: 20px;">
                        </b>
                        <b style="color:${color};">Hạng ${res[i].HangVe}</b>
                      </p>
                    </div>
                    <div class="col-lg-2">
                      <p style="text-align: center;"><b>${res[i].GioKhoiHanh}</b></p>
                    </div>
                    <div class="col-lg-2">
                      <p style="text-align: center;"><b>${res[i].GioDen}</b></p>
                    </div>
                    <div class="col-lg-3">
                      <p style="text-align: center;"><b>${res[i].GiaVe*1000}đ</b></p>
                    </div>
                    <div class="col-lg-2" align=center>
                    <input type="radio" class="btn-check" name="flight_choice" id="${res[i].MaVe}" value="${res[i].MaVe}" autocomplete="off">
                    <label class="btn btn-outline-success" for="${res[i].MaVe}">Chọn</label>
                    </div>
                  </div>`
                  html_result+=row_result_html;
                }
                $(schedule).html(html_result)
            }
        }
    })
}

$(document).ready(function(){
    var url = window.location.href;
    var params = url.split('/')
    var date = new Date(params[9])
    params = [params[5],params[7],params[9],date.getDay()]  //[depart,des,date,day]
    let location_dict = {'TPHCM': 'TP Hồ Chí Minh','HN': 'Hà Nội','HP': 'Hải Phòng', 'DN': 'Đà Nẵng', 'PQ': 'Phú Quốc'}
    
    //Hien thi dia diem
    $('#depart-dest').html("<b>"+ location_dict[params[0]] + " -> " + location_dict[params[1]] +"</b>")

    // Hien thi ngay cho 4 tab
    for(var i=1; i<=4; i++)
    {
        var id = '#schedule_' + i
        $(id).text(plus_day(params[2],i-1))
    }

    $.ajax({
        type:'POST',
        url: '/result_flight',
        data: JSON.stringify({"depart": params[0], "des": params[1], "date": params[2], "day": params[3]}),
        dataType: "json",
        contentType: 'application/json',
        success: function(res){
            if(res.length==0)
            {
                html_result = `<div class="col-lg-12" style="text-align: center; color: red;">
                <b>Hệ thống không tìm thấy chuyến bay vào ngày này hoặc đã hết chỗ.</b>
                <br>
                <b>Quý khách vui lòng chọn ngày khác</b>
              </div> `
              $('#schedule_1_result').html(html_result)
            }
            else{
                html_result = ``
                console.log(res)
                for(var i=0; i<res.length; i++){
                    let color = "green"
                    let bcolor = "#f5ebed"
                    if (res[i].HangVe == "Skyboss")
                        color = "red"
                    if (i%2==0)
                        bcolor = "#e4edeb"
                    else
                        bcolor = "#f5ebed"
                    row_result_html = `        <div class="row" style="background-color:${bcolor}">
                    <div class="col-lg-3">
                      <p style="text-align: center;">
                        <b>
                            ${res[i].MaChuyenBay}<img title src="/image/chair-seat.png" style="height: 20px;">
                        </b>
                        <b style="color:${color};">Hạng ${res[i].HangVe}</b>
                      </p>
                    </div>
                    <div class="col-lg-2">
                      <p style="text-align: center;"><b>${res[i].GioKhoiHanh}</b></p>
                    </div>
                    <div class="col-lg-2">
                      <p style="text-align: center;"><b>${res[i].GioDen}</b></p>
                    </div>
                    <div class="col-lg-3">
                      <p style="text-align: center;"><b>${res[i].GiaVe*1000}đ</b></p>
                    </div>
                    <div class="col-lg-2" align=center>
                    <input type="radio" class="btn-check" name="flight_choice" id="${res[i].MaVe}" value="${res[i].MaVe}" autocomplete="off">
                    <label class="btn btn-outline-success" for="${res[i].MaVe}">Chọn</label>
                    </div>
                  </div>`
                  html_result+=row_result_html;
                }
                $('#schedule_1_result').html(html_result)
            }
        }
    })

    $('#schedule_1').click(function(){
        get_flight(params[0], params[1], params[2], 0, '#schedule_1_result')
    })
    $('#schedule_2').click(function(){
        get_flight(params[0], params[1], params[2], 1, '#schedule_2_result')
    })
    $('#schedule_3').click(function(){
        get_flight(params[0], params[1], params[2], 2, '#schedule_3_result')
    })
    $('#schedule_4').click(function(){
        get_flight(params[0], params[1], params[2], 3, '#schedule_4_result')
    })

    $('#continue_info').click(function(){
      var mave = $('input[name="flight_choice"]:checked').val();
      if(mave==undefined)
        alert('Hãy chọn cho mình một chuyến bay phù hợp nào ^^')
      else
        window.location = '/Input_thong_tin_khach_hang.ejs/mave/'+ mave
    })
})