// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require('passport')
const authorizationMiddleware = require('../authorization/authorization.middleware')


// sur le lien : http://localhost:3000/locations
router.get('/locations',
	passport.authenticate('local',{session: false}),
	authorizationMiddleware.canAccess([]),
	(req, res) => {
	return res.status(200).send({locations: []})
	// ce qui est affiché
})

module.exports = router
