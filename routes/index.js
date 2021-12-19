var express = require('express');
var router = express.Router();
//Ket noi voi Mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'flightdb'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET chuyen bay cua toi page. */
router.get('/chuyenbaycuatoi', function(req, res, next) {
  res.render('chuyenbaycuatoi', { title: 'Chuyen bay cua toi' });
});
/* GET ket qua hien thi chuyen bay cua toi khi nhap sai form. */
router.get('/nhaplaiform', function(req, res, next) {
  res.render('nhaplaiform', { title: 'Ket qua chuyen bay cua toi'});
});

//Tao bien de gui lam tham so trang hien thi ket qua
var duLieuKH;
var duLieuChuyenBay;
var duLieuDichVu;
var maChuyenBay;
/* Post form chuyen bay cua toi. */
router.post('/chuyenbaycuatoi', function(req, res, next) {
  var inputMaDatCho = req.body.maDatCho;
  var inputHoTen = req.body.hoTen;
  var truyVanDaTaKH = 'SELECT * FROM khachhang WHERE MaDatCho = ? And HoTen = ?';
  connection.query(truyVanDaTaKH, [inputMaDatCho, inputHoTen], function (error, results, fields) {
    if (error){
      throw error;
    }
    console.log('The result is: ', results);
    if(results == '')
    {
      console.log('Không tìm thấy mã đặt chỗ.');
      res.redirect('/nhaplaiform');
    }
    var truyVanDaTaChuyenBay = 'SELECT * FROM chuyenbay WHERE MaChuyenBay = ?';
    var truyVanDaTaDichVu = 'SELECT * FROM dichvuchuyenbay WHERE MaDatCho = ?';
    if(results != '')
    {
      duLieuKH = results;
      maChuyenBay = duLieuKH[0].MaChuyenBay;
      connection.query(truyVanDaTaChuyenBay, [maChuyenBay], function (err2, res2){
        if (err2){
          throw err2;
        }
        console.log(res2);
        duLieuChuyenBay = res2;
        console.log('Dữ liệu của chuyến bay là: ', duLieuChuyenBay);
      });
      connection.query(truyVanDaTaDichVu, [inputMaDatCho], function (err2, res2){
        if (err2){
          throw err2;
        }
        console.log(res2);
        duLieuDichVu = res2;
      });
      res.render('resultchuyenbay', { title: 'Kết quả chuyến bay của bạn', dataKH: duLieuKH, dataCB: duLieuChuyenBay, 
      dataDV: duLieuDichVu, maCB: maChuyenBay });
    }
  });
});

module.exports = router;
