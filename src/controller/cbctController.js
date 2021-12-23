import pool from '../configs/connectDB';

let checkCBCT = async (req, res) => {
  // const mysql = require('mysql2/promise');
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'datvemaybay'});
  let inputMa = req.body.maDatCho;
  let inputTen = req.body.hoTen;
  const [duLieuKH, fields1] = await pool.execute('SELECT * FROM khachhang WHERE MaDatCho = ? And HoTen = ?', [inputMa, inputTen]);
  if(duLieuKH == '') res.redirect('/nhaplaiform')

  let maChuyenBay = duLieuKH[0].MaChuyenBay;
  const [duLieuCB, fields2] = await pool.execute('SELECT * FROM chuyenbay WHERE MaChuyenBay = ?', [maChuyenBay]);
  const [duLieuDV, fields3] = await pool.execute('SELECT * FROM dichvuchuyenbay WHERE MaDatCho = ?', [inputMa]);
  (res.render('resultchuyenbay.ejs', { title: 'Kết quả chuyến bay của bạn', dataKH: duLieuKH, dataCB: duLieuCB, 
  dataDV: duLieuDV, maCB: maChuyenBay })); 
}
module.exports = checkCBCT