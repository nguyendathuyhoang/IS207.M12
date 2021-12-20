$(document).ready(function(){
    var url = window.location.href;
    var params = url.split('/')
    var dict_payment = {'1':'Thanh toán tại phòng vé','2':'Thanh toán tại địa chỉ yêu cầu'}
    var MaDatCho = params[5]
    var PhuongThuc = dict_payment[params[7]]

    $.ajax({
        type:'POST',
        url: '/get_info_order',
        data: JSON.stringify({'MaDatCho':MaDatCho}),
        dataType: "json",
        contentType: 'application/json',
        success: function(res){
            const number = res.GiaVe * '1000'
            GiaVe = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number)
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const NoiDi = 'Từ ' + res.NoiDi
            const NoiDen = 'Đến ' + res.NoiDen
            const NgayDi = res.GioKhoiHanh + ' - ' + res.NgayDi.slice(0,10)
            const NgayDen = res.GioDen + ' - ' + res.NgayDi.slice(0,10)
            const ChuyenBay = res.MaChuyenBay
            const HangVe = res.HangVe
            $('#MaDatCho').html(`<b>Mã đặt chỗ:</b> ${MaDatCho}`)
            $('#TongTien').html(`<b>Tổng tiền:</b> ${GiaVe}`)
            $('#NgayDat').html(`<b>Ngày đặt:</b> ${today.toUTCString()}`)
            $('#PhuongThuc').html(`<b>Phương thức thanh toán:</b> ${PhuongThuc}`)
            $('#ChuyenBay').html(`<table class="table table-borderless" style="background: #cbedf5;">
            <tbody>
              <tr>
                <td>${NoiDi}</td>
                <td>${NoiDen}</td>
                <td>Chuyến bay</td>
                <td>Hạng đặt chỗ</td>
              </tr>
              <tr style="color: #eb3b28; font-weight: bolder;">
                <td>${NgayDi}</td>
                <td>${NgayDen}</td>
                <td>${ChuyenBay}</td>
                <td>${HangVe}</td>
              </tr>
            </tbody>
        </table>`)
            $('#HanhKhach').text(res.HoTen)
        }
      })

})