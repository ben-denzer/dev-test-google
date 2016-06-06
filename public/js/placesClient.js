(() => {
  let getId = (ID) => document.getElementById(ID);

  //Initial API Call -- Called by GeoSuccess / GeoError
  let loadPictures = (lat, lon) => {
    let request = new XMLHttpRequest();
    request.open('POST', '/getPics', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        if (!data) {
          loadPage('error inside loadPictures()');
        } 
        loadPage(null, data);
      }
      else {
        loadPage('There was an error fetching the pictures');
      }
    };

    request.onerror = function() {
      getId('main').innerHTML = "Error"
    };

    request.send(JSON.stringify({"lat": lat, "lon": lon}));
  }

  // GeoLocation callbacks - Call Api For Pictures
  let geoError = () => {
    loadPictures(19.896766, -155.582782);
    let warning = document.createElement('div');
    warning.className = 'warning centered';
    warning.innerHTML = 'We couldn\'t determine your location, so here are some pictures from Hawaii.';
    getId('heading').appendChild(warning);
  } 
  let geoSuccess = (position) => {
    loadPictures(position.coords.latitude, position.coords.longitude);
  }

  //Click Listener 
  let detailsCache = [];
  let detailBoxes = document.getElementsByClassName('details');

  getId('mainContent').addEventListener('click', (e) => {
    if (e.target.dataset.apiId) {
      getId('modal-title').innerHTML = '<img src="images/loading_32x32.gif alt="loading">';
      getId('modal-address').innerHTML = '';
      getId('modal-phone').innerHTML = '';
      getId('modal-website').innerHTML = '';

      getDetails(e.target.dataset.apiId, (err, data) => {
        if (err) {
          makeDetailsView('error getting details');
        }
        makeDetailsView(data);
      });
    }
  });

  // Called by 'click' listener
  let makeDetailsView = (details) => {
    getId('modal-title').innerHTML = details.result.name || '';
    getId('modal-address').innerHTML = details.result.formatted_address || '';
    getId('modal-phone').innerHTML = details.result.formatted_phone_number || '';
    getId('modal-website').innerHTML = details.result.website || '';
  }

  //Show Picures
  let loadPage = (err, data) => {
    getId('bigLoaderContainer').style.display = 'none';
    
    clearTimeout(timer);
    if (err) {
      getId('main').innerHTML = err;
    }
    for (let i = 1; i <= 9; i++) {
      getId('img-' + i).src = data.results[i].icon;
      getId('img-' + i).dataset.apiId = data.results[i].place_id;
      getId('heading-' + i).innerHTML = data.results[i].name;
    }
  }

  //Get Details
  let getDetails = (id, detailsCallback) => {
    var request = new XMLHttpRequest();
    request.open('POST', '/getDetails', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {

        let data = JSON.parse(request.responseText);
        detailsCallback(null, data);
      }
      else {
        detailsCallback('Error getting details');
      }
    };

    request.onerror = function() {
      getId('main').innerHTML = "Error"
    };

    request.send(JSON.stringify({"id": id}));
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  // Firefox has an issue that if the user presses 'not now' option
  // in the 'allow location access' prompt, then no event is fired
  let timer = setTimeout(() => {
    getId('bigLoaderWarning').innerHTML = 'You\'ll need to choose to either Allow or Deny access to your location data. Pressing "Not Now" or not doing anything causes the page to idle forever';
  }, 15000); 

})();
