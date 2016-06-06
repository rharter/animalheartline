var jsonp, unique;

unique = 0;

jsonp = function(url, callback, context) {
  var name, script;
  name = "_jsonp_" + unique++;
  url += url.match(/\?/) ? "&callback=" + name : "?callback=" + name;
  script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  window[name] = function(data) {
    callback.call(context || window, data);
    document.getElementsByTagName('head')[0].removeChild(script);
    script = null;
    return delete window[name];
  };
  return document.getElementsByTagName('head')[0].appendChild(script);
};

var TestApi;

TestApi = (function() {
  function TestApi() {}

  TestApi.prototype.getPets = function(count, cb) {
    if (count == null) {
      count = 1;
    }
    return cb({
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
                }, {
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
    });
  };

  return TestApi;

})();

var AdoptAPetApi;

AdoptAPetApi = (function() {
  var BASE_URL;

  BASE_URL = 'http://api.adoptapet.com/search';

  function AdoptAPetApi(key, shelter_id) {
    this.key = key;
    this.shelter_id = shelter_id;
  }

  AdoptAPetApi.prototype.getFirstPet = function(cb) {
    return this.petsAtShelter(3, 3, 0, function(data) {
      var p;
      p = data.pets[0];
      return cb({
        id: p.pet_id,
        name: p.pet_name,
        description: '',
        breed: p.primary_breed,
        image: p.large_results_photo_url,
        link: p.details_url
      });
    });
  };

  AdoptAPetApi.prototype.getPets = function(count, cb) {
    if (count == null) {
      count = 1;
    }
    return this.petsAtShelter(1, count, 0, cb);
  };

  AdoptAPetApi.prototype.petsAtShelter = function(start_number, end_number, meta_only, cb) {
    if (start_number == null) {
      start_number = 1;
    }
    if (end_number == null) {
      end_number = 50;
    }
    if (meta_only == null) {
      meta_only = 0;
    }
    return $.ajax({
      url: BASE_URL + "/pets_at_shelter",
      data: {
        key: this.key,
        shelter_id: this.shelter_id,
        start_number: start_number,
        end_number: end_number,
        meta_only: meta_only,
        output: 'json'
      },
      success: cb
    });
  };

  return AdoptAPetApi;

})();

var PetfinderApi;

PetfinderApi = (function() {
  var BASE_URL;

  BASE_URL = 'http://api.petfinder.com';

  function PetfinderApi(key, shelter_id) {
    this.key = key;
    this.shelter_id = shelter_id;
  }

  PetfinderApi.prototype.getFirstPet = function(cb) {
    return this.getPets(1, function(data) {
      var image, p, pet;
      p = data.petfinder.pets.pet;
      pet = {
        id: p.id.$,
        name: p.name.$t,
        description: p.description.$t,
        breed: p.breeds.breed[0].$t,
        link: ''
      };
      pet.image = ((function() {
        var i, len, ref, results;
        ref = p.media.photos.photo;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          image = ref[i];
          if (image['@size'] === 'x') {
            results.push(image);
          }
        }
        return results;
      })())[0].$t;
      return cb(pet);
    });
  };

  PetfinderApi.prototype.getPets = function(count, cb) {
    if (count == null) {
      count = 1;
    }
    return jsonp(BASE_URL + "/shelter.getPets?format=json&key=" + this.key + "&id=" + this.shelter_id + "&count=" + count, cb);
  };

  return PetfinderApi;

})();

var hasClass, toggleClass;

this.api = new AdoptAPetApi("1981d87af94bd821420b2d62732ef185", 71169);

hasClass = function(elem, className) {
  return RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

toggleClass = function(elem, className) {
  var newClass;
  newClass = " " + (elem.className.replace(/[\t\r\n]/g, ' ')) + " ";
  if (hasClass(elem, className)) {
    while (newClass.indexOf(" " + className + " ") >= 0) {
      newClass = newClass.replace(" " + className + " ", " ");
    }
    return elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    return elem.className += " " + className;
  }
};

$(function() {
  return $("a#menu").click(function() {
    return toggleClass(document.querySelector('.nav-list'), 'nav-active');
  });
});
