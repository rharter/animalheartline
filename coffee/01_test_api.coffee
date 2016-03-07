class TestApi
  getPets: (count = 1, cb) ->
    cb {
      'petfinder': {
        'pets': {
          'pet': {
            'name': {
              '$t': "Bernie"
            },
            'description': {
              '$t': "Bernie is a springy young chap that likes to frolic in the fields all day long.  He doesn't like to be crated, and likes to eat large heaping cups of gromm."
            },
            'breeds': {
              'breed': [
                {
                  '$t': "Schnauzer"
                },
                {
                  '$t': "Terrier"
                }
              ]
            },
            'media': {
              'photos': {
                'photo': [
                  {
                    '@size': 'x',
                    '$t': '/img/test_dog.jpg'
                  }
                ]
              }
            }
          }
        }
      }
    }
