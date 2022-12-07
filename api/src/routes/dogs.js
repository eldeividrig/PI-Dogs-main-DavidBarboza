// const { Router } = require("express");
// const { axios } = require("axios");
// const { Dog, Temperament } = require("../db");
// const router = Router();

const axios = require("axios");
const app = require("express").Router();
const { Dog, Temperament } = require("../db");

app.get("/dogs", async (req, res) => {
  let dogs = await Dog.findAll();
  let allDogs = [];
  for (let i = 0; i < dogs.length; i++) {
    let dog = dogs[i];
    let temperaments = await dog.getTemperaments();
    dog = dog.dataValues;
    temperaments = temperaments.map((el) => el.dataValues.name);
    dog.temperament = temperaments.toString();
    allDogs.push(dog);
  }
  axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((rpt) => {
        let result = [...allDogs, ...rpt.data];
        res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/dogs", async (req, res) => {
    const { tamperamentId } = req.body;
    const { name, altura, peso, años } = req.body;
    if (!name || !altura || !peso) return res.status(404).send('Falta enviar datos obligatorios');
    try {
        console.log(req.body);
        const gos = await Dog.create({
            name: req.body.name,
            altura: req.body.altura,
            peso: req.body.peso,
            años: req.body.años,
            id: Date.parse(new Date)
        });
        //await gos.setTemperaments(tamperamentId);
        res.status(200).json(gos);
    } catch (error) {
        res.status(404).send('Error en alguno de los datos provistos');
    }    
})

module.exports = app;



// {
//     "temperamentId": "254",
//     "name": "David",
//     "altura": "24",
//     "peso": "120",
//     "años": "21"
// }
