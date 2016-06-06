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
        if (data.meta.error_message) {
          
          // CHANGE THIS

          //console.log(data.meta.error_message);
          //loadPage('My OAuth token expired');
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
    console.log('success');
    loadPictures(position.coords.latitude, position.coords.longitude);
  }

  //Click Listener 
  let detailsCache = [];
  let detailBoxes = document.getElementsByClassName('details');

  // getId('main').addEventListener('click', e => {

  //   // Make sure they are clicking a picture, and make sure its the first time
  //   if (e.target.id) {

  //     for (let i in detailBoxes) {
  //       if (detailBoxes.hasOwnProperty(i)) {
  //         if (detailBoxes[i].dataset.details_id !== e.target.dataset.pic_id) {
  //           detailBoxes[i].style.display = 'none';
  //         }
  //         else {
  //           ((i) => {
  //             detailBoxes[i].style.display = 'block';

  //             if (detailsCache.indexOf(e.target.id) === -1) {
  //               detailBoxes[i].innerHTML = '<div id="sm-loader" class="centered"><img src="loading_32x32.gif" alt="loading"></div>';

  //               detailsCache.push(e.target.id);

  //               getDetails(e.target.dataset.img_api_id, (err, details) => {
  //                 if(err) {
  //                   return detailBoxes[i].innerHTML = 'Error getting data';
  //                 }

  //                 makeDetailsView(details, (err, data) => {
  //                   let loader = getId('sm-loader');
  //                   loader.parentNode.removeChild(loader);
  //                   detailBoxes[i].appendChild(data);
  //                 });
  //               });
  //             }
  //           })(i);
  //         }
  //       }
  //     }
  //   }
  // });

  // Called by 'click' listener
  let makeDetailsView = (details, callback) => {
    let docFragment = document.createDocumentFragment();

    let user = document.createElement('div');
    user.classList.add('detailsName');
    user.innerHTML = details.data.user.full_name;
    docFragment.appendChild(user);

    let likes = document.createElement('div');
    likes.classList.add('detailsTxt');
    likes.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> <span class="detailsTxt">' + details.data.likes.count + '</span>';
    docFragment.appendChild(likes);

    let location = document.createElement('div');
    location.classList.add('detailsTxt');
    location.innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i> <span class="detailsTxt">' + details.data.location.name || 'not shown' + '</span>'
    docFragment.appendChild(location);

    callback(null, docFragment);
  }

  //Show Picures
  // let loadPage = (err, data) => {
  //   getId('bigLoaderContainer').style.display = 'none';
    
  //   clearTimeout(timer);
  //   if (err) {
  //     getId('main').innerHTML = err;
  //   }
  //   for (let i = 0; i < 18; i++) {
  //     getId('img-' + i).src = data.data[i].images.low_resolution.url;
  //     getId('img-' + i).dataset.img_api_id = data.data[i].id;
  //   }
  // }

  //Get Details
  // let getDetails = (id, detailsCallback) => {
  //   var request = new XMLHttpRequest();
  //   request.open('POST', '/getDetails', true);
  //   request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  //   request.onload = function() {
  //     if (request.status >= 200 && request.status < 400) {

  //       let data = JSON.parse(request.responseText);
  //       detailsCallback(null, data);
  //     }
  //     else {
  //       detailsCallback('Error getting details');
  //     }
  //   };

  //   request.onerror = function() {
  //     getId('main').innerHTML = "Error"
  //   };

  //   request.send(JSON.stringify({"id": id}));
  // };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  // Firefox has an issue that if the user presses 'not now' option
  // in the 'allow location access' prompt, then no event is fired
  let timer = setTimeout(() => {
    getId('bigLoaderWarning').innerHTML = 'You\'ll need to choose to either Allow or Deny access to your location data. Pressing "Not Now" or not doing anything causes the page to idle forever';
  }, 20000); 


})();