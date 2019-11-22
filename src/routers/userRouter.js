const conn = require('../connection/index')
const router = require('express').Router()

// QUERY REGISTER
router.post('/user/register', (req, res)=>{
    // query sql untuk insert
    let sql = `INSERT INTO users SET ?`
    let data = req.body
    // console.log('ds')
    conn.query(sql, data, (err, result)=>{
        if(err) return res.send({error: err.message})
        res.send(result)
    })
})

// QUERY LOGIN
router.post('/user/login', (req, res)=>{
    let {email, password} = req.body
    let sql = `SELECT * FROM users WHERE email = '${email}'`
    
    conn.query(sql, (err, result)=>{
        console.log(result[0].role)
        if(err) return res.send(err)
        if(result.length === 0 ) return res.send({error: "User not Found"})

        let user = result[0]
        let _password = result[0].password
        if(password !== _password){
            return res.send({error: "Password Salah"})
        }
        // console.log(user)
        res.send(user)
    })
})

// QUERY GET USER BY ID
router.get('/user/get/:id', (req, res)=>{
    let sql = `SELECT * from users WHERE id = '${req.params.id}'`

    conn.query(sql, (err, result)=>{
        if(err) return res.send({error: err.message})

        res.send(result)
    })

})

// QUERY EDIT PROFILE
router.patch('/user/update/:id', (req, res)=>{
    let sql = `UPDATE users SET ? WHERE id = '${req.params.id}'`
    let data = req.body

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)
        res.send(result)
    })
})

// GET ALL SPAREPART
router.get('/sparepart', (req, res)=>{
    let sql = `SELECT * FROM sparepart WHERE jenis = 'sparepart'`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)
        res.send(result)
    })
})

module.exports = router