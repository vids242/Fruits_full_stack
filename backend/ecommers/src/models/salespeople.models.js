const pool = require("../db/mysql")

const getsalespeople = async () => {
    try {
        const [result, feald] = await pool.execute('SELECT * FROM `salespeople`')

        return result
    } catch (error) {
        throw new Error("Error fetch salespeople")
    }
}

const postsalespeople = async (sname, city, comm,isActive) => {
    try {
        const [result, fiaeld] = await pool.execute('INSERT INTO `salespeople` (sname,city,comm,isActive) VALUES (?,?,?,?)', [sname, city, comm,isActive])

        return ({ snum: result.insertId, sname, city, comm,isActive })

    } catch (error) {
        throw new Error("Error add salespeople")
    }
}
const deletesalespeople = async (snum) => {
    try {
        const [result, fiaeld] = await pool.execute('DELETE FROM salespeople WHERE snum=?', [snum])

        return result

    } catch (error) {
        throw new Error("Error Delete salespeople")
    }
}

const updatesalespeople = async (snum,sname, city, comm,isActive) => {
    try {
        const [result, fiaeld] = await pool.execute('UPDATE salespeople SET sname=?,city=?,comm=?,isActive=? WHERE snum=?', [sname, city, comm,isActive, snum])
        return result
    } catch (error) {
        throw new Error("Error Update salespeople")
    }

}


module.exports = {
    getsalespeople,
    postsalespeople,
    deletesalespeople,
    updatesalespeople
}