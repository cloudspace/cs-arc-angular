var Arc     = require('./arc.js');
var angular = require('angular');
var d3      = require('d3');

var AngularConnector = angular
  .module('csArc', [])
  .factory('csArc', [function() {
    return Arc;
  }])
  .directive('csArc', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        inner:      '&',
        outer:      '&',
        start:      '&',
        end:        '&',
        transition: '&',
        container:  '&',
        name:       '&',
        width:      '&',
      },
      bindToController: true,
      controllerAs: 'csArc',
      controller: [function() {
        this.translate = 'translate(' + (this.width()/2) + ',' + (this.width()/2) + ')';
        
        this.initArc = function(args) {
          this.arc = new Arc(args);
        };
       
        this.renderArc = function() {
          this.arc.render();  
        };
       
        this.updateArc = function(percent) {
          this.arc.update(percent);
        };
      }],
      link: function(scope, element, attr, ctrl) {
        $timeout(function() {
          ctrl.initArc({
            inner: ctrl.inner(),
            outer: ctrl.outer(),
            start: ctrl.start(),
            end: ctrl.end(),
            transition: ctrl.transition(),
            container: ctrl.container(),
            name: ctrl.name()  
          });
          
          d3
            .select('#' + ctrl.container())
            .attr('width', ctrl.width())
            .attr('height', ctrl.width())
            .select('g')
            .attr('transform',  ctrl.translate);

          ctrl.renderArc();
        });
      },
      template: '<svg id="{{ csArc.container() }}"><g></g></svg>'
    };
  }]);
  
module.exports = AngularConnector;