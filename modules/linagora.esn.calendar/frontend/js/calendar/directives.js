'use strict';

angular.module('esn.calendar')
  .directive('calendarView', function($timeout) {
    function link(scope, element) {
      /*
       * Hiding the header in mobile first template does not work well with FullCalendar
       * because it needs a div :visible to be initialized. This visibility is gotten beacause
       * the header has a certain height. To have a css close solution, in css element.find('.calendar')
       * height is forced to 1px, and element.find('.fc-toolbar') is .hidden-xs. We then should reset
       * the element.find('.calendar') height to auto to have original value.
       */
      $timeout(function() {
        element.find('.calendar').css('height', 'auto');
      }, 0);
    }
    return {
      restrict: 'E',
      templateUrl: '/calendar/views/calendar/calendar.html',
      scope: {
        calendarHomeId: '=',
        uiConfig: '='
      },
      controller: 'calendarController',
      link: link
    };
  })

  .directive('calendarHeaderMobile', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/calendar/views/calendar/calendar-header-mobile.html'
    };
  })

  .directive('calendarHeaderContent', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<span>My Calendar</span>'
    };
  })

  .directive('calendarButtonToolbar', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/calendar/views/calendar/community-calendar-button-toolbar.html'
    };
  })

  .directive('calendarNavbarLink', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/calendar/views/calendar/user-calendar-navbar-link.html'
    };
  })

  .directive('calendarLeftPane', function() {
    function link(scope, element) {
      scope.$on('calendar:height', function(event, height) {
        element.height(height);
      });
    }

    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/calendar/views/calendar/calendar-left-pane.html',
      link: link
    };
  })

  /**
   * This directive enhances the auto-size directive of material admin.
   * In fact, it corrects the initial height (i.e., when loading) of an autoSize element
   * have a see: https://github.com/jackmoore/autosize/issues/248
   */
  .directive('autoSizeAndUpdate', function($timeout, autosize) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        if (element[0]) {
          autosize(element);
          $timeout(function() {
            autosize.update(element);
          }, 0);
        }
      }
    };
  })

  .directive('toggleCalendarView', function(uiCalendarConfig, calendarService) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.on('click', function() {
          uiCalendarConfig.calendars[calendarService.calendarHomeId].fullCalendar('changeView', attrs.toggleCalendarView);
        });
      }
    };
  })

  .directive('toggleCalendarToday', function(uiCalendarConfig, calendarService) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.on('click', function() {
          uiCalendarConfig.calendars[calendarService.calendarHomeId].fullCalendar('today');
        });
      }
    };
  })

  .directive('toggleSubCalendar', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.click(function() {
          element.toggleClass('toggled');
          angular.element('.sub-calendar').stop(true, false).slideToggle(200);
        });
      }
    };
  });