angular
    .module('tunely')
    .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController($http, $routeParams) {
    var vm = this;
    console.log($routeParams);

    $http({
        method: 'GET',
        url: '/api/albums/'+ $routeParams.id
    }).then(function successShowAlbum(json) {
        vm.album = json.data;
    }, function errorShowAlbum(error) {
      console.log('error is: ', error);
    }
  )};
