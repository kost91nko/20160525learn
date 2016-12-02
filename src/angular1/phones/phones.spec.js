describe('phoneList', function() {
  let $componentController = null;

  beforeEach(angular.mock.module('absApp'));


  beforeEach(angular.mock.inject(function(_$componentController_) {
    $componentController =  _$componentController_;
  }));

  // Test the controller

  it('should create a `phones` model with 3 phones', function($componentController) {
    var ctrl = $componentController('hello');
    //console.log(ctrl);
    expect(ctrl.foo).toBe(2);
  });
});
