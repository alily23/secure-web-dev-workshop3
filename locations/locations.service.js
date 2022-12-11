// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

//fonction pour importer la BDD puis return le tableau avec la BDD intégrée
function findAll () {
	return Location.find()
}

module.exports.findAll = findAll
