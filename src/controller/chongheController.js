import pool from '../configs/connectDB';

let chonghe = async (req, res) => {
    // const mysql = require('mysql2/promise');
    // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'datvemaybay'});
    let inputMa = req.body.MaDatCho;
    let inputTen = req.body.HoTen;
    const [duLieuKH] = await pool.execute('SELECT * FROM khachhang WHERE MaDatCho = ? And HoTen = ?', [inputMa, inputTen]);
    //if (duLieuKH == '') res.redirect('/checkin.ejs')

    let maVe = duLieuKH[0].MaVe;
    const [duLieuVe] = await pool.execute('SELECT * FROM vemaybay WHERE MaVe = ?', [maVe]);
    let maChuyenBay = duLieuVe[0].MaChuyenBay;
    const [duLieuCB] = await pool.execute('SELECT * FROM chuyenbay WHERE MaChuyenBay = ?', [maChuyenBay]);
    //const [duLieuGhe] = await pool.execute('insert into ghengoi(MaChuyenBay) values = (?)', [maChuyenBay]);
    //const [duLieuDV] = await pool.execute('SELECT * FROM dichvuchuyenbay WHERE MaDatCho = ?', [inputMa]);
    (res.render('ketquachonghe.ejs', {
        title: 'Kết quả chọn ghế của bạn', dataKH: duLieuKH, dataCB: duLieuCB
        , maCB: maChuyenBay
    }));
}
module.exports = chonghe