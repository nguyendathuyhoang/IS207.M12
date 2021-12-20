import express from "express";
import homeController from '../controller/homeController';
import dvcbController from '../controller/dvcbController';
import muaveController from'../controller/muaveController';
const bodyparser = require('body-parser')
const jsonParser = bodyparser.json();

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    // router.get('/detail/flight/:MaChuyenBay', homeController.getDetailPage)
    // router.post('/service', homeController.createService)
    // router.post('/delete-flight', homeController.deleteFlight)
    // router.get('/edit-flight/:MaChuyenBay', homeController.getEditPage)
    // router.post('/update-flight', homeController.postUpdateFlight)

    //mình làm tìm kiếm chuyến bay
    // router.post('/find-flight', homeController.findFlight)

    router.get('/about', (req, res) => {
        res.send('I am Erik')
    })


    router.get('/chonchongoi.ejs', (req, res) => {
        res.render('chonchongoi.ejs')
    })

    router.get('/checkin.ejs', (req, res) => {
        res.render('checkin.ejs')
    })

    router.get('/chuyenbaycuatoi.ejs', (req, res) => {
        res.render('chuyenbaycuatoi.ejs')
    })

    router.get('/ketquachonghe.ejs', (req, res) => {
        res.render('ketquachonghe.ejs')
    })

    router.get('/resultchuyenbay.ejs', (req, res) => {
        res.render('resultchuyenbay.ejs')
    })

    router.get('/thanh_toan.ejs', (req, res) => {
        res.render('thanh_toan.ejs')
    })

    router.get('/thutuctructuyen.ejs', (req, res) => {
        res.render('thutuctructuyen.ejs')
    })

    router.get('/trangchu.ejs', (req, res) => {
        res.render('trangchu.ejs')
    })
    
    /*dat ve*/
    router.post('/result_flight', jsonParser, muaveController.search_flight)

    router.get('/ketquatimchuyenbay.ejs/depart/:depart/des/:des/date/:date', (req, res) => {
        res.render('ketquatimchuyenbay.ejs')
    })

    router.get('/xac_nhan_thanh_toan.ejs/madatcho/:madatcho/phuongthuc/:phuongthuc', (req, res) => {
        res.render('xac_nhan_thanh_toan.ejs')
    })

    router.get('/Input_thong_tin_khach_hang.ejs/mave/:mave', (req, res) => {
        res.render('Input_thong_tin_khach_hang.ejs')
    })

    router.post('/order_ticket',jsonParser,muaveController.order_ticket)

    router.post('/get_info_order',jsonParser,muaveController.get_info)

    /*dich vu chuyen bay*/
    router.get('/dichvuchuyenbay_1.ejs', (req, res) => {
        res.render('dichvuchuyenbay_1.ejs')
    })
    router.post('/dvcb_login', jsonParser, dvcbController.check_login)
    router.post('/dvcb_preorder', jsonParser, dvcbController.add_service)

    router.get('/dichvuchuyenbay_2.ejs/code/:code', (req, res) => {
        res.render('dichvuchuyenbay_2.ejs')
    })

    /*router*/
    return app.use('/', router)
}

export default initWebRoute;
//module.export = initWebRoute;
