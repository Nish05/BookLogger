(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore','dataService', '$log', '$location', 'BooksResource','currentUser', EditBookController]);
        // .controller('EditBookController', ['$routeParams', 'books', EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $log, $location, BooksResource, currentUser) {
        //console.log($routeParams.bookID);

        var vm = this;

        // dataService.getBookByID($routeParams.bookID)
        //     .then(getBookSuccess)
        //     .catch(getBookError);

        vm.currentBook = BooksResource.get({book_id: $routeParams.bookID});
        $log.log(vm.currentBook);

        function getBookSuccess(book){
            vm.currentBook = book;
            currentUser.lastBookEdited = vm.currentBook;
          //   $cookieStore.put('lastEdited', vm.currentBook);

        }
        function getBookError(reason){
            $log.error(reason);
        }
       // vm.currentBook = books.filter(function(item) {
       //     return item.book_id == $routeParams.bookID;
       // })[0];

        // vm.currentBook = books.filter(function(item) {
        //     return item.book_id == $routeParams.bookID;
        // })[0];
        //

        vm.saveBook = function() {

            // dataService.updateBook(vm.currentBook)
            //     .then(updateBookSuccess)
            //     .catch(updateBookError)
            vm.currentBook.$update();
            $location.path('/');

        };

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        };

        function updateBookError(errorMessage) {

            $log.error(errorMessage);
        };

        vm.setAsFavorite = function() {

            $cookies.favoriteBook = vm.currentBook.title;

        };
        //

    }

}());