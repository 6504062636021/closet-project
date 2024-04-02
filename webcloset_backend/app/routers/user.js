const express = require('express')
const argon2 = require('argon2')
const {PrismaClient} = require('@prisma/client')
const jwt = require('jsonwebtoken')
const isLogin = require('../middleware/isLogin')
const { body , validationResult, param} = require('express-validator')
const prisma = new PrismaClient()
const router = express.Router()

router.post('/login',
body('tel').notEmpty().withMessage('กรุณากรอกชื่อผู้ใช้ด้วย').isLength({ min: 10,max: 10 }).withMessage('กรุณากรอกชื่อผู้ใช้มากกว่า 10 ตัวอักษร'),
body('password').notEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({ min: 5 }).withMessage('กรุณากรอกรหัสผ่านมากกว่า 5 ตัวอักษร'),
 async(req, res) => {
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => { return msg; });
    if (!result.isEmpty()) {
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: result.array()[0],
        });
    }
    const {tel,password} = req.body
    const check_user = await prisma.account.findFirst({
        where: {
            tel
        }
    })
    if(!check_user){
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        });
    }
    const check_password = await argon2.verify(check_user.password,password)
    if(!check_password){
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        });
    }
    const token = jwt.sign({
        id: check_user.id,
        tel: check_user.tel,
        name: check_user.name,
        surname: check_user.surname,
        address: check_user.address
    },process.env.JWT_SECRET)
    res.status(200).json({
        result: true,
        status: "success",
        msg: 'เข้าสู่ระบบสำเร็จ',
        token: token
    })

})

router.post('/register',
body('name').notEmpty().withMessage('กรุณากรอกชื่อจริง'),
body('surname').notEmpty().withMessage('กรุณากรอกนามสกุล'),
body('address').notEmpty().withMessage('กรุณากรอกที่อยู่'),
body('tel').notEmpty().withMessage('กรุณากรอกเบอร์โทรศัพท์ด้วย').isLength({ min: 10,max: 10 }).withMessage('กรุณากรอกเบอร์โทรศัพท์มากกว่า 5 ตัวอักษร').isNumeric().withMessage('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'),
body('password').notEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({ min: 5 }).withMessage('กรุณากรอกรหัสผ่านมากกว่า 5 ตัวอักษร'),
body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('รหัสผ่านไม่ตรงกัน');
    }
    return true;
}),
async(req, res) => {
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => { return msg; });
    if (!result.isEmpty()) {
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: result.array()[0],
        });
    }
    const {name,surname,address,tel,password} = req.body
    const check_user = await prisma.Account.findFirst({
        where: {
            tel
        }
    })
    if(check_user){
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: 'มีเบอร์โทรศัพท์นี้ในระบบแล้ว',
        });
    }
    const hash = await argon2.hash(password)
   await prisma.Account.create({
        data: {
            tel: tel,
            password: hash,
            name: name,
            surname: surname,
            address: address
        }
    })
    res.status(200).json({
        result: true,
        status: "success",
        msg: 'สมัครสมาชิกสำเร็จ',
    })
})

router.get('/@me',isLogin(),async(req,res) => {
    const user = await prisma.Account.findFirst({
        where: {
            id: req.user.id
        }, select: {
            id: true,
            tel: true,
            name: true,
            surname: true,
            address: true
        }
    })
    return res.status(200).json({
        result: true,
        status: "success",
        user
    })
    
})

router.patch('/:id',
body('name').notEmpty().withMessage('กรุณากรอกชื่อจริง'),
body('surname').notEmpty().withMessage('กรุณากรอกนามสกุล'),
param('id').isNumeric().withMessage('id ต้องเป็นตัวเลขเท่านั้น'),
body('address').notEmpty().withMessage('กรุณากรอกที่อยู่'),isLogin(),async(req,res) => {
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => { return msg; });
    if (!result.isEmpty()) {
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: result.array()[0],
        });
    }
    const {name,surname,address} = req.body
    const {id} = req.params
    const user = await prisma.Account.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if(!user){
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: 'ไม่พบผู้ใช้',
        });
    }
    await prisma.Account.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name,
            surname: surname,
            address: address
        }
    })
    res.status(200).json({
        result: true,
        status: "success",
        msg: 'แก้ไขข้อมูลสำเร็จ',
    })

})

module.exports = router