const express = require('express')
const locationController = require('./locations/locations.controller')
const usersController = require('./users/users.controller')
const bodyparser = require('body-parser')
const app = express()
const port = 3000
const mongoose = require("mongoose")
require("dotenv").config()
const localStrategy = require('./auth/local.strategy')


app.use(bodyparser.json())
app.use(locationController)

const data = require ('C:\\Users\\aliso\\secure-web-dev-workshop1\\lieux-de-tournage-a-paris.json');
const passport = require('passport')


app.use(express.json())
app.use('/users', usersController)

//partie API
//get : pour retourner toutes les données
//REQUEST
//GET ALL
app.get('/locations', (req, res)=> {
	res.status(200).json(Array.from(data))
})

//GET ONE
app.get('/locations/:id', (req, res) => {
	const { id } = req.params
	const one = data.find(el => el["recordid"] === id)
	if(!one) return res.status(404).json({message : "not found"})
	res.status(200).json(one)
})

//CREATE
app.post('/locations', (req, res) => {
	const { body } = req
	const newOne = {
		...body
	}
	data.push(newOne)
	res.status(201).json(newOne)
})

//UPDATE
app.put('/locations/:id', (req, res) =>{
	const { id } = req.params
	const { body } = req
	const one = data.find(el => el["recordid"] === id)
	if(!one) return res.status(404).json({message : "not found"})
	one["fields"]["nom_producteur"] = body["fields"]["nom_producteur"]
	res.status(200).json(one)
})

//DELETE
app.delete('/locations/:id', (req, res) => {
	const { id } = req.params
	const one = data.find(el => el["recordid"] === id)
	if(!one) return res.status(404).json({message : "not found!!!"})
	let index;
	for (let i=0; i<data.length; i++) {
		if(data[i]==one) {
			index = i;
		}
	}
	data.splice(data[index], 1)
	res.status(200).json({message : "Ressource supprimée"})
})

// port local, ensuite on va le mettre sur un serveur pour que tout le monde puisse y accéder
async function main() {
	await mongoose.connect(process.env.MONGO_URI);
	app.listen(port, () => {
		console.log(`API listening on port 3000, visit http://localhost:3000/locations`)
	})
}

main()