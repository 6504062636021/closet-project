const express = require('express')
const { body, validationResult, param } = require('express-validator')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const isLogin = require('../middleware/isLogin')

router.get('/', async (req, res) => {
    const product = await prisma.Product.findMany({
        where:{
            deleted_at: null
        }
    })
    res.status(200).json({
        result: true,
        status: "success",
        data: product
    })
})
router.get('/:id', isLogin(), async (req, res) => {
    const { id } = req.params
    if (isNaN(id)) {
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: 'id ต้องเป็นตัวเลขเท่านั้น',
        });
    }
    const product = await prisma.Product.findUnique({
        where: {
            id: parseInt(id),
            deleted_at: null
        }
    })
    res.status(200).json({
        result: true,
        status: "success",
        data: product
    })
})
router.post('/',
    body('name').notEmpty().withMessage('กรุณากรอกชื่อสินค้า'),
    body('description').notEmpty().withMessage('กรุณากรอกรายละเอียดสินค้า'),
    body('price').notEmpty().withMessage('กรุณากรอกราคาสินค้า').isNumeric().withMessage('กรุณากรอกราคาสินค้าเป็นตัวเลข'),
    body('type').notEmpty().withMessage('กรุณาเลือกประเภทสินค้า'),
    body('stock').notEmpty().withMessage('กรุณากรอกจำนวนสินค้า').isNumeric().withMessage('กรุณากรอกจำนวนสินค้าเป็นตัวเลข'),
    isLogin(), async (req, res) => {
        const file = req.files.image
        if (!file) {
            return res.status(400).json({
                result: false,
                status: "warning",
                msg: 'กรุณาอัพโหลดรูปภาพสินค้า',
            });
        }
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return res.status(400).json({
                result: false,
                status: "warning",
                msg: 'รูปภาพต้องเป็น png หรือ jpeg เท่านั้น',
            });
        }


        const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => { return msg; });
        if (!result.isEmpty()) {
            return res.status(400).json({
                result: false,
                status: "warning",
                msg: result.array()[0],
            });
        }
        const { name, price, stock, description } = req.body
        const fileName = `${Date.now()}_${file.name}`
        file.mv(`./public/uploads/${fileName}`, (err) => {
            if (err) {
                return res.status(500).json({
                    result: false,
                    status: "error",
                    msg: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ',
                });
            }
        })

        await prisma.product.create({
            data: {
                name: name,
                price: price,
                stock: stock,
                category: type,
                description: description,
                image: fileName
            }
        })
        res.status(200).json({
            result: true,
            status: "success",
            msg: 'เพิ่มสินค้าสำเร็จ',
        })
    })

router.patch('/:id',
    body('name').notEmpty().withMessage('กรุณากรอกชื่อสินค้า'),
    body('description').notEmpty().withMessage('กรุณากรอกรายละเอียดสินค้า'),
    body('price').notEmpty().withMessage('กรุณากรอกราคาสินค้า').isNumeric().withMessage('กรุณากรอกราคาสินค้าเป็นตัวเลข'),
    body('type').notEmpty().withMessage('กรุณาเลือกประเภทสินค้า'),
    body('stock').notEmpty().withMessage('กรุณากรอกจำนวนสินค้า').isNumeric().withMessage('กรุณากรอกจำนวนสินค้าเป็นตัวเลข'),
    isLogin(),
    async (req, res) => {
        const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => { return msg; });
        if (!result.isEmpty()) {
            return res.status(400).json({
                result: false,
                status: "warning",
                msg: result.array()[0],
            });
        }
        const { name, price, stock, description } = req.body
        const { id } = req.params
        if (isNaN(id)) {
            return res.status(400).json({
                result: false,
                status: "warning",
                msg: 'id ต้องเป็นตัวเลขเท่านั้น',
            });
        }
        const file = req.files.image
        const fileName = file ? `${Date.now()}_${file.name}` : null
        if (file) {
            if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
                return res.status(400).json({
                    result: false,
                    status: "warning",
                    msg: 'รูปภาพต้องเป็น png หรือ jpeg เท่านั้น',
                });
            }
            file.mv(`./public/uploads/${fileName}`, (err) => {
                if (err) {
                    return res.status(500).json({
                        result: false,
                        status: "error",
                        msg: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ',
                    });
                }
            })
            await prisma.product.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: name,
                    price: price,
                    category: type,
                    stock: stock,
                    description: description,
                    image: fileName
                }
            })
        } else {

            await prisma.product.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: name,
                    price: price,
                    stock: stock,
                    description: description,
                }
            })
        }
        res.status(200).json({
            result: true,
            status: "success",
            msg: 'แก้ไขสินค้าสำเร็จ',
        })

    })

    router.delete('/:id',
    param('id').notEmpty().withMessage('กรุณากรอก id สินค้า').isNumeric().withMessage('id ต้องเป็นตัวเลขเท่านั้น')
    ,isLogin(),async(req,res) => {
        const { id } = req.params
        const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => { return msg; });
        if (!result.isEmpty()) {
            return res.status(400).json({
                result: false,
                status: "warning",
                msg: result.array()[0],
            });
        }
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if(!product){
            return res.status(400).json({
                result: false,
                status: "warning",
                msg: 'ไม่พบสินค้า',
            });
        }
        await prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data: {
                deleted_at: new Date()
            }
        })
        res.status(200).json({
            result: true,
            status: "success",
            msg: 'ลบสินค้าสำเร็จ',
        })
    })

router.post('/buy',
    body('product').notEmpty().withMessage('กรุณากรอกสินค้าที่ต้องการซื้อ'),
    isLogin() ,async(req,res) =>{
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => { return msg; });
    if (!result.isEmpty()) {
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: result.array()[0],
        });
    }
    const {product} = req.body
    const user = req.user
    const decode_product = JSON.parse(product)
    if(!Array.isArray(decode_product)){
        return res.status(400).json({
            result: false,
            status: "warning",
            msg: 'สินค้ามีความผิดพลาด',
        });
    }
    const total = decode_product.reduce((e,t,b) => e + (t.quantity * t.price),0);
    await prisma.order.create({
        data: {
            account_id: user.id,
            total: total,
            product: product,
            status: 'padding'
        }
    })
    res.status(200).json({
        result: true,
        status: "success",
        msg: 'สั่งซื้อสินค้าสำเร็จ',
    })


})

module.exports = router 