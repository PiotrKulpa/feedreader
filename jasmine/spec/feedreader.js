/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });


        /* Code below loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined and not empty', function() {
          allFeeds.map(function(el) {
             expect(el.url).toBeDefined();
             expect(el.url.length).not.toBe(0);
           });
         });


        /* Code below loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('URL name is defined and not empty', function() {
           allFeeds.map(function(el) {
             expect(el.name).toBeDefined();
             expect(el.name.length).not.toBe(0);
           });
        });
    });


    /* This is test suite named "The menu" */
    describe('The menu', function() {
        var menuIconTest;

        beforeEach(function() {
          menuIconTest = $('.menu-icon-link');
        });

        /* Code below ensures the menu element is
         * hidden by default.
         */
         it("Menu is hidden by default", function() {
           expect($("body").hasClass("menu-hidden")).toBe(true);
         });

         /* Code below ensures the menu changes
          * visibility when the menu icon is clicked.
          */

          /* This part checks the menu display when clicked. */
          it("Menu display when clicked", function() {
            menuIconTest.click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
          });

          /* This part checks the menu hide option when clicked again. */
          it("Menu hide when clicked again", function() {
            menuIconTest.click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
          });

    });

    /* This is test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* It ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         var entry;

         beforeEach(function(done) {
          loadFeed(0, function() {
            entry = $('.feed .entry-link');
            done();
          });
        });

         it("There is at least a single .entry element within the .feed container", function(done) {
           expect(entry.length).toBeGreaterThan(0);
           done();
         });

     });

    /* This is test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* It ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var oldFeed,
            newFeed;

         beforeEach(function(done) {
          loadFeed(0, function() {
            /* Get old feed */
            oldFeed = $('.entry-link:first').text();
          });

          loadFeed(1, function() {
            /* Get new feed */
            newFeed = $('.entry-link:first').text();
            done();
          });

        });

         it("The content actually changes", function(done) {
           expect(oldFeed).not.toMatch(newFeed);
           done();
         });

    });

}());
