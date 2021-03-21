const controller = {}

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      'SELECT sum(VALOR) as total FROM ingresos WHERE signo=1',
      (err, v1total) => {
        if (!err) {
          existendatos = v1total[0].total
          console.log('existen datos:' + existendatos)
          module.exports.existendatos
        }
      }
    )

    conn.query(
      'SELECT sum(if((signo = 2),VALOR*-1,valor)) as total FROM ingresos',
      (err, vtotal) => {
        if (!err) {
          sumatotal = vtotal[0].total
          console.log('suma total:' + sumatotal)
          module.exports.sumatotal
        }
      }
    )

    conn.query('select * from ingresos', (err, rows) => {
      console.log('error query all:' + err)
      if (!err) {
        res.render('ing', {
          data: rows,
        })
      } else {
        res.render('ing', {
          data: 'Error',
        })
      }
    })
  })
}

controller.save = (req, res) => {
  const data = req.body

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO ingresos SET ?', [data], (err, rows) => {
      res.redirect('/')
    })
  })
}

controller.backup = (req, res, next) => {
  req.getConnection((err, conn) => {
    conn.query(
      'INSERT INTO backup (idingreso, quincena, valor, razon, signo, done) SELECT * FROM ingresos',
      (err, rows) => {
        if (err) {
          next(err)
        } else {
          conn.query('DELETE FROM ingresos', (err, dele) => {
            if (!err) {
              res.redirect('/')
            }
          })
        }
      }
    )
  })
}

controller.delete = (req, res) => {
  const { id } = req.params

  req.getConnection((err, conn) => {
    conn.query(
      'DELETE FROM ingresos WHERE idingreso = ?',
      [id],
      (err, rows) => {
        res.redirect('/')
      }
    )
  })
}

controller.done = (req, res) => {
  const { id } = req.params

  req.getConnection((err, conn) => {
    conn.query(
      'UPDATE ingresos SET done = 1 WHERE idingreso = ?',
      [id],
      (err, rows) => {
        res.redirect('/')
      }
    )
  })
}

module.exports = controller
