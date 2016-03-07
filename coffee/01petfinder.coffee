class PetfinderApi

  BASE_URL = 'http://api.petfinder.com'

  constructor: (@key, @shelter_id) ->

  getFirstPet: (cb) ->
    @getPets 1, (data) ->
      p = data.petfinder.pets.pet
      pet =
        id: p.id.$
        name: p.name.$t
        description: p.description.$t
        breed: p.breeds.breed[0].$t
        link: ''

      pet.image = (image for image in p.media.photos.photo when image['@size'] == 'x')[0].$t

      cb pet

  getPets: (count = 1, cb) ->
    jsonp "#{BASE_URL}/shelter.getPets?format=json&key=#{@key}&id=#{@shelter_id}&count=#{count}", cb
