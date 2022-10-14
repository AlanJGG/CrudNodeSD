const express = require('express');
const mysql= require('mysql2');
var app = express();
//import {PORT} from './config'
//import {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} from './config'

var bodyParser= require('body-parser');

var con= mysql.createConnection({

    host: 'containers-us-west-24.railway.app',
    user: 'root',
    password: 'KIFEh0r0mPzp18Ioo5d7',
    database: 'railway',
    port: '6360'
});

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.post('/agregarJugador', (req, res)=>{

    let nombre= req.body.nombre
    let posicion= req.body.posicion
    let noJersey= req.body.noJersey
    let id = req.body.id

    con.query('INSERT INTO jugadores VALUES("'+id+'","'+nombre+'","'+posicion+'","'+noJersey+'")' , (err, respuesta, fields)=>{

        if(err) return console.log("error");

        return res.send('Registro exitoso');


    }
    
    );
});

app.listen(6360, ()=>{

    console.log("Servicio en el puerto", 6360);
}

)
app.post('/eliminarJugador',(req,res)=>{
    let nombre=req.body.usuario;


    con.query('DELETE FROM jugadores where nombre=("'+nombre+'")',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Jugador ${nombre} eliminado</h1>`)
    })
});


app.get('/obtenerJugador', (req, res)=>{

    con.query('SELECT * FROM personajes',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        var userHTML=``
        var i=0
        console.log(respuesta)
        userHTML+=`<a href="index.html">Inicio</a><br><br><br>`
        respuesta.forEach(jgd =>{
            i++
            userHTML+=`
            <tr><td>${i}</td><td>${jgd.nombre}</td>
            <td>${jgd.posicion}</td></tr>
            
            `
        })

        return res.send(`<table>
            <tr>
                <th>ID: </th>
                <th>Nombre: </th>
                <th>Posicion: </th>
            </tr>
            ${userHTML}
            </table>`)
    })
    }

    );

    app.post('/actualizarJugador',(req,res)=>{
        let nombre=req.body.name;
        let newNoJersey=req.body.newNoJersey
    
    
        con.query('UPDATE jugadores SET noJersey=("'+newNoJersey+'") WHERE nombre=("'+nombre+'")',(err,respuesta,field)=>{
            if(err) return console.log('ERROR:',err)
    
            return res.send(`
            <a href="index.html">Inicio</a>
            <h1>Jugador ${nombrePer} cambiado a: <h3>${newNoJersey}</h3></h1>
            `)
        })
    });
    
;