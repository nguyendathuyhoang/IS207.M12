import pool from '../configs/connectDB';

let checkCBCT = async (req, res) => {
  // const mysql = require('mysql2/promise');
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'datvemaybay'});
  let inputMa = req.body.maDatCho;
  let inputTen = req.body.hoTen.toLowerCase();
  let duLieuDV;
  const [duLieuKH] = await pool.execute('SELECT * FROM khachhang WHERE MaDatCho = ? And HoTen = ?', [inputMa, inputTen]);
  if(duLieuKH == '') return(res.redirect('/nhaplaiform'))

  let maVe = duLieuKH[0].MaVe;
  const [duLieuVe] = await pool.execute('SELECT * FROM vemaybay WHERE MaVe = ?', [maVe]);
  let maChuyenBay = duLieuVe[0].MaChuyenBay;
  const [duLieuCB] = await pool.execute('SELECT * FROM chuyenbay WHERE MaChuyenBay = ?', [maChuyenBay]);
  [duLieuDV] = await pool.execute('SELECT * FROM dichvuchuyenbay WHERE MaDatCho = ?', [inputMa]);
  if (duLieuDV == ''){
    duLieuDV = [{MaDichVu: 'Khong co', MaDatCho: 'Khong co', SoKy: 0, LoaiDoAn:''}];
    return(res.render('resultchuyenbay.ejs', { title: 'Kết quả chuyến bay của bạn', dataKH: duLieuKH, dataCB: duLieuCB, 
    dataDV: duLieuDV, maCB: maChuyenBay })); 
  }
  return(res.render('resultchuyenbay.ejs', { title: 'Kết quả chuyến bay của bạn', dataKH: duLieuKH, dataCB: duLieuCB, 
  dataDV: duLieuDV, maCB: maChuyenBay })); 
}
module.exports = checkCBCT