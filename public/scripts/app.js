/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};
  vm.newAlbum = {
    name: 'Viva Hate',
    artistName: 'Morrissey'
  };
	vm.albums;

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(function successCallback(response) {
    vm.albums = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createAlbum = function () {
    $http({
      method: 'POST',
      url: '/api/albums',
      data: vm.newAlbum,
    }).then(function successCallback(response) {
      vm.albums.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

vm.deleteAlbum = function(album) {
	$http({
		method: 'DELETE',
		url: '/api/albums/' + album._id
	}).then(function successDelete(deleteAlbum) {
		var index = vm.albums.indexOf(album);
		vm.albums.splice(index, 1);
	}, function errorDelete(error) {
		console.log('error is:', error);
	})
}

vm.editAlbum = function(album) {
	$http({
		method: 'PUT',
		url: '/api/albums/' + album._id,
		data: {
			name: album.name,
			artistName: album.artistName
		}
	}).then(function successPut(updatedAlbum) {
		console.log('updated album to: ', updatedAlbum);
	}, function errorPut(error) {
		console.log('error is: ', error);
	})
}

}
