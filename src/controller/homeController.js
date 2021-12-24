
import pool from '../configs/connectDB';

let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `chuyenbay`',);

    return res.render("trangchu.ejs", { dataFlight: rows, test: '' })

}

let getManagepage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `chuyenbay`',);

    return res.render("index.ejs", { dataFlight: rows, test: '' })

}


let getDetailPage = async (req, res) => {
    let MaChuyenBay = req.params.MaChuyenBay;
    let [flight] = await pool.execute(`select * from chuyenbay where MaChuyenBay= ?`, [MaChuyenBay])
    console.log(">>> check param: ", flight)
    return res.send(JSON.stringify(flight))
}

let createNewFlight = async (req, res) => {
    console.log("check req: ", req.body)
    let { MaChuyenBay, GioKhoiHanh, GioDen, NgayDi, NoiDi, NoiDen } = req.body;
    await pool.execute('insert into chuyenbay(MaChuyenBay, GioKhoiHanh, GioDen, NgayDi, NoiDi, NoiDen) values (?,?,?,?,?,?)',
        [MaChuyenBay, GioKhoiHanh, GioDen, NgayDi, NoiDi, NoiDen])
    return res.redirect('/quanlychuyenbay');
}

let deleteFlight = async (req, res) => {
    let MaChuyenBay = req.body.MaChuyenBay;
    await pool.execute('delete from chuyenbay where MaChuyenBay = ?', [MaChuyenBay])
    //return res.send(`Hello from delete Flight ${req.body.MaChuyenBay}`)
    return res.redirect('/quanlychuyenbay');
}

let getEditPage = async (req, res) => {
    let MaChuyenBay = req.params.MaChuyenBay;
    let [flight] = await pool.execute('select * from chuyenbay where MaChuyenBay= ?', [MaChuyenBay])
    return res.render('update.ejs', { dataFlight: flight[0] })
}

let postUpdateFlight = async (req, res) => {
    // let { GioKhoiHanh, GioDen, NgayDi, NoiDi, NoiDen, MaChuyenBay } = req.body;
    // await pool.execute('update chuyenbay set GioKhoiHanh=?, GioDen=?, NgayDi=?, NoiDi=?, NoiDen=? where MaChuyenBay=?',
    //     [GioKhoiHanh, GioDen, NgayDi, NoiDi, NoiDen, MaChuyenBay])
    let { GioKhoiHanh, GioDen, NgayDi, NoiDi, NoiDen, MaChuyenBay } = req.body;

    await pool.execute('update chuyenbay set GioKhoiHanh=?, GioDen=?, NgayDi=?, NoiDi=?, NoiDen=? where MaChuyenBay=?',
        [GioKhoiHanh, GioDen, NgayDi, NoiDi, NoiDen, MaChuyenBay]);
    //console.log("check req: ", req.body)
    return res.redirect('/quanlychuyenbay');
}

// let findFlight = async (req, res) => {
//     const [rows, fields] = await pool.execute('SELECT * FROM `chuyenbay`',);


//     let { NoiDi } = res.body;
//     let [flight] = await pool.execute(`select * from chuyenbay where NoiDi= ?`, [NoiDi])
//     return res.render("kqatimchuyenbay.ejs", { dataFlight: rows, test: 'abc string test' })
// }



module.exports = {
    getHomepage, getManagepage, getDetailPage, createNewFlight, deleteFlight, getEditPage, postUpdateFlight,
}