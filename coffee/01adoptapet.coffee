class AdoptAPetApi

  BASE_URL = 'http://api.adoptapet.com/search'

  constructor: (@key, @shelter_id) ->

  getFirstPet: (cb) ->
    @petsAtShelter 3, 3, 0, (data) ->
      p = data.pets[0]
      cb
        id: p.pet_id
        name: p.pet_name
        description: ''
        breed: p.primary_breed
        image: p.large_results_photo_url
        link: p.details_url


  getPets: (count = 1, cb) ->
    @petsAtShelter 1, count, 0, cb

  petsAtShelter: (start_number = 1, end_number = 50, meta_only = 0, cb) ->
    $.ajax
      url: "#{BASE_URL}/pets_at_shelter"
      data: {
        key: @key,
        shelter_id: @shelter_id,
        start_number: start_number,
        end_number: end_number,
        meta_only: meta_only,
        output: 'json'
      }
      success: cb
