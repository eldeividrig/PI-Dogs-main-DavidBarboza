const axios = require("axios");
const app = require("express").Router();
const { Op, Dog, Temperament } = require("../db");

app.get("/dogs", async (req, res) => {
  let { name } = req.query;
  let dogs = await Dog.findAll();
  let allDogs = [];
  if (!name) {
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
  } else {
    let dogs = await Dog.findAll();
    for (let i = 0; i < dogs.length; i++) {
      let dog = dogs[i]
      let temperaments = await dog.getTemperaments();
      dog = dog.dataValues;
      temperaments = temperaments.map((el) => el.dataValues.name);
      dog.temperament = temperaments.toString();
      allDogs.push(dog);
    }
    axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((rpt) => {
        let result = [...allDogs, ...rpt.data].filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        if (result.length === 0) res.send({ message: "No existe ninguna raza con el nombre indicado" });
        if (result.length > 0) res.send([result]);
      })
      .catch(error => {
        console.log(error);
      })
  }
});

app.get("/dogs/:id", async (req, res) => {
  let { id } = req.params;
  let dogComplet = [];
  let dog = await Dog.findByPk(id);
  if (dog) {
    let temperaments = await dog.getTemperaments();
    let dogFinal = dog.dataValues;
    temperaments = temperaments.map(el => el.dataValues.name);
    dogFinal.temperament = temperaments.toString();
    dogComplet.push(dogFinal);
  }
  axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((rpt) => {
      let result = [...dogComplet, ...rpt.data].find(e => e.id == id);
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
})


app.post("/dogs", async (req, res) => {
  const { temperamentId } = req.body;
  const { name, altura, peso, años } = req.body;
  if (!name || !altura || !peso) return res.status(404).send('Falta enviar datos obligatorios');
  let dog = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: 
          name
      }
    }
  });
  if (dog.length > 0) return res.status(404).send('Esta raza ya existe');
  try {
    const gos = await Dog.create({
      name: req.body.name,
      altura: req.body.altura,
      peso: req.body.peso,
      años: req.body.años,
      id: Date.parse(new Date)
    });
    console.log(temperamentId);
    gos.setTemperaments(temperamentId);
    res.status(200).json(gos);
  } catch (error) {
    res.status(404).send('Error en alguno de los datos provistos');
  }
})



app.get("/temperaments", async (req, res) => {
  let obtenerTemperamentos = await Temperament.findAll();
  obtenerTemperamentos = JSON.stringify(obtenerTemperamentos, null, 2);
  obtenerTemperamentos = JSON.parse(obtenerTemperamentos);
  if (obtenerTemperamentos.length !== 0) {
    res.send(obtenerTemperamentos);
  } else {
    axios.get("https://api.thedogapi.com/v1/breeds")
      .then(async (rpt) => {
        let temperamentosFinal = [];
        let temperamentos = rpt.data.map((el) => el.temperament);
        let nuevosTemperamentos = temperamentos.map(el => el && el.split(",")).flat();
        nuevosTemperamentos.forEach((el) => {
          if (temperamentosFinal.indexOf(el) < 0) temperamentosFinal.push(el)
        })
        for (let i = 0; i < temperamentosFinal.length; i++) {
          if (temperamentosFinal[i] != null) {
            let str = temperamentosFinal[i];
            await Temperament.create({
              name: str.trim()
            })
          }
        }
        res.send(temperamentosFinal);
      })
      .catch(error => {
        console.log(error);
      })
  }
})



module.exports = app;



// {
//   "temperamentId": [1, 2, 3, 7, 21],
//   "name": "luz",
//   "altura": "24",
//   "peso": "120",
//   "años": "21"
// }
