(function() {

    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'loggerService', 'badgeService', '$cookies', '$cookieStore','$log', '$route', 'currentUser', 'BooksResource', BooksController]);


    function BooksController(books, dataService, loggerService, badgeService, $cookies, $cookieStore, $log, $route, currentUser, BooksResource) {

        var vm = this;

        vm.appName = books.appName;

        // dataService.getAllBooks()
        //     .then(getBooksSuccess, null, getBooksNotification)
        //     .catch(errorCallback)
        //     .finally(getAllBooksComplete);

        dataService.getUserSummary()
            .then(getUserSummarySuccess);
        function getUserSummarySuccess(summaryData){
            console.log(summaryData);
            vm.summaryData = summaryData;
        }

        vm.allBooks = BooksResource.query();

        function getBooksSuccess(books){
            vm.allBooks = books;
        }

        // function getBooksError(reason){
        //     console.log(reason);
        // }
        function errorCallback(errorMsg) {
            console.log('Error message : '+errorMsg);
        }

        function getBooksNotification(notification){
           // console.log('Promise notification : '+ notification);
        }

        function getAllBooksComplete(){
           // console.log('Get all books complete');
        }
        dataService.getAllReaders()
            .then(getReadersSuccess, null, getReadersNotification)
            .catch(errorCallback)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers){
            vm.allReaders = readers;
            $log.awesome('All readers retrieved');
        }


        function getReadersNotification(notification){
            console.log('Promise notification : '+ notification);
        }

        function getAllReadersComplete(){
            console.log('Get all readers complete');
        }

        vm.deleteBook = function (bookID) {

            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError);

        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;

        vm.currentUser = currentUser;
       // vm.lastModified = $cookieStore.get('lastEdited');

        // $log.log('Logging with log');
        // $log.info('Logging with info');
        // $log.warn('Logging with warn');
        // $log.error('Logging with error');
        // $log.debug('Logging with debug');

    }


}());