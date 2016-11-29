/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);
  // ^ the first argument is a string naming the controller,
  // the second argument is a function that defines the capacities
  // of the controller.
AlbumsIndexController.$inject = ['$http'];
function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};
	vm.albums;

	$http({
    method: 'GET',
    url: '/api/albums'
  }).then(successGet, errorGet);

	function successGet(response) {
    vm.albums = response.data
  };

	function errorGet(response) {
    console.log('There was an error getting the data', response);
  };

	vm.createAlbum = function() {
		$http({
			method: 'POST',
			url: '/api/albums',
			data: {
				name: vm.newAlbum.name,
				artistName: vm.newAlbum.artistName
			}
		}).then(successPost, errorPost)

		function successPost(response) {
			vm.albums.push(response.data);
			vm.newAlbum.name = ''
			vm.newAlbum.artistName = ''
		}
		function errorPost(error) {
			console.log('error is:', error);
		}

	}

}
