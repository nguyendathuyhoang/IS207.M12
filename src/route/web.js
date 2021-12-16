import express from "express";
import homeController from '../controller/homeController';
import dvcbController from '../controller/dvcbController';
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

    //mình làm tìm kiếm chuyến bay, checkin
    //router.get('/checkin', homeController.getCheckin);
    //router.get('/find-flight', homeController.findFlight);
    //router.get('/checkin/flight/:MaDatCho', homeController.getCheckinPage)

    router.get('/about', (req, res) => {
        res.send('I am Erik')
    })


    router.get('/chonchongoi.ejs', (req, res) => {
        res.render('chonchongoi.ejs')
    })

    router.get('/chuyenbaycuatoi.ejs', (req, res) => {
        res.render('chuyenbaycuatoi.ejs')
    })

    router.get('/ketquachonghe.ejs', (req, res) => {
        res.render('ketquachonghe.ejs')
    })

    router.get('/ketquatimchuyenbay.ejs', (req, res) => {
        res.render('ketquatimchuyenbay.ejs')
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

    router.get('/', (req, res) => {
        res.render('trangchu.ejs')
    })

    router.get('/xac_nhan_thanh_toan.ejs', (req, res) => {
        res.render('xac_nhan_thanh_toan.ejs')
    })

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
