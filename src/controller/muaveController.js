import { response } from 'express';
import res from 'express/lib/response';
import pool from '../configs/connectDB';
const bodyparser = require('body-parser')
const jsonParser = bodyparser.json();

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

let search_flight = async (req,res) => {
    let location = {"TPHCM":"TPHCM","HN":"Hà Nội","DN":"Đà Nẵng","PQ":"Phú Quốc","HP":"Hải Phòng"};

    let depart = req.body.depart;
    let des = req.body.des;
    let date = req.body.date;

    try{
        const querystring = "SELECT * FROM vemaybay INNER JOIN chuyenbay ON vemaybay.MaChuyenBay = chuyenbay.MaChuyenBay"
                            +" WHERE (NoiDi=? AND NoiDen=? AND NgayDi=?)"
        // console.log(querystring)
        let [customer] = await pool.execute(querystring,[location[depart],location[des],date]);
        // console.log(new Date(customer[0].NgayDi).toLocaleDateString("en-US"));
        // console.log(customer)
        res.send(customer)
    }
    catch(exception_var){
        console.log(exception_var)
        res.send([])
    }
}

let order_ticket = async (req,res) => {
    var MaDatCho = makeid();
    const querystring = "insert into khachhang(MaDatCho,MaVe,SDT,HoTen,Email) values (?,?,?,?,?)"
    try{
        await pool.execute(querystring,[MaDatCho,req.body.ticket_code,req.body.phone,req.body.name,req.body.email])
        res.send({'status':'success','MaDatCho': MaDatCho})
    }
    catch(ex){
        res.send({'status':'fail'})
    }
}

let get_info = async (req, res) => {
    const querystring = "SELECT * from khachhang "+
    "INNER JOIN vemaybay ON khachhang.MaVe=vemaybay.MaVe INNER JOIN chuyenbay ON vemaybay.MaChuyenBay = chuyenbay.MaChuyenBay "+
    "WHERE khachhang.MaDatCho = ?"
    try{
        let [customer] = await pool.execute(querystring,[req.body.MaDatCho])
        res.send(customer[0])
    }
    catch(ex){
        console.log(ex)
        res.send([])
    }
}

module.exports = {search_flight,order_ticket, get_info}