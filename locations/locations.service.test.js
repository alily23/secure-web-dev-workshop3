const locationsService = require("./locations.service")
const locationsModel = require("./locations.model")

//éviter que le test modfie le vrai model; on créé un "faux model"
jest.mock('./locations.model')

test('Should create a user', async () => {
    //on se fait passer par la donnée
    locationsModel.find.mockResolvedValue([])
    //le service renvoie bien ce que lui a donnée la bdd
    expect(await locationsService.findAll()).toEqual([])
    //la service appelle correctement la bdd une seule fois
    expect(locationsModel.find).toHaveBeenCalledTimes(1)
})

//describe permet de gérer plusieurs cas
describe('User findOne', () => {
    it('Should find a user', async () => {
        const mockUser = {_id: '123'}
        locationsModel.findById.mockResolvedValue(mockUser)
        expect(await locationsService.findOne('123')).toEqual(mockUser)
        //la fonction findOne a bien été appelée
        expect(locationsModel.findById).toHaveBeenCalledTimes(1)
    })

    /*it('Should throw NotFoundError', () => {
        const mockUser = null
        locationsModel.findById.mockRejectedValue(mockUser)
        expect(async () => await locationsService.findOne(
            '123')).rejects.toThrowError("NotFoundError")
        expect(locationsModel.findById).toHaveBeenCalledTimes(1)
    })*/
})