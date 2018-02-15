const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', (request, response) =>{
  const sqlText = 'SELECT * FROM koalas';
  pool.query(sqlText)
  .then((result)=> {
    console.log('gottem', result);
    response.send(result.rows);
  })
  .catch((error)=> {
    console.log('WOMP, no koalas');
    response.sendStatus(500);
})
})
router.post('/add', (request, response) =>{
const newKoala = request.body;
console.log('added new koala', newKoala);
const sqlText = `INSERT INTO koalas(name, age, sex, ready_to_transfer, notes)
VALUES( $1,$2,$3,$4,$5 )`;
pool.query(sqlText,[newKoala.name, newKoala.age, newKoala.sex, newKoala.ready_to_transfer, newKoala.notes])
.then((result)=> {
  console.log('addem', result);
  response.sendStatus(200);
})
.catch((error)=> {
  console.log('WOMP, no koalas');
  response.sendStatus(500);
})
})

router.delete('/delete/:id', (request, response) =>{
const id = request.params.id;
const sqlText = `DELETE FROM koalas WHERE id=$1`;
pool.query(sqlText, [id])
  .then((result)=> {
    console.log('Deleted', result);
    response.sendStatus(200);
  })
  .catch((error)=> {
    console.log('Koala not deleted');
    response.sendStatus(500);
  })
})

router.put('/transfer/:id',(request, response)=> {
const id = request.params.id;
const sqlText = `UPDATE koalas SET ready_to_transfer='Y' WHERE id=$1`;
pool.query(sqlText, [id])
  .then((result)=> {
    console.log('FREEDOM', result);
    response.sendStatus(200);
  })
  .catch((error)=> {
    console.log('enslaved');
    response.sendStatus(500);
  })
})


module.exports = router;
