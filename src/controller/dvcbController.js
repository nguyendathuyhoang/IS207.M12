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

let check_login = async (req, res) => {
    let querystring = "select * from khachhang"
    let [customer] = await pool.execute(querystring)
    for(let i=0;i<customer.length;i++)
    {
        if(customer[i].MaDatCho==req.body.code)
        {
            if(customer[i].HoTen.toLowerCase()==req.body.name.toLowerCase())
                res.send({respond:"success"})
            else
                res.send({respond:"fail"})
        }
    }
    res.send({respond:"fail"})
}

let add_service = async (req, res) => {
    let weight = req.body.weight
    let food = req.body.food.join('')
    if(food.length==0)
        food=null;
    let code = req.body.code
    let service_code = makeid()
    let querystring = "select * from dichvuchuyenbay"
    let [customer] = await pool.execute(querystring)
    for(let i=0;i<customer.length;i++)
    {
        if(customer[i].MaDatCho==req.body.code)
        {
            let queryupdate = 'update dichvuchuyenbay set SoKy='+weight+', LoaiDoAn='+food+' where MaDatCho='+code;
            await pool.execute(queryupdate)
            res.send({respond:"OK"})
            return;
        }
    }
    await pool.execute("insert into dichvuchuyenbay(MaDichVu,MaDatCho,SoKy,LoaiDoAn) values (?,?,?,?)",
        [service_code, code, weight, food])
    res.send({respond:"OK"})
}

module.exports = {check_login, add_service}