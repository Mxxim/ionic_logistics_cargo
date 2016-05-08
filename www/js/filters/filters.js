/**
 * Created by sammy on 2016/5/7.
 */

angular.module('starter.filter', [])

.filter('trustHtml', function ($sce) {

  return function (input) {

    return $sce.trustAsHtml(input);

  }

});
