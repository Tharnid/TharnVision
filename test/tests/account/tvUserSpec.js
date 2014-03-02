describe('tvUser', function() {
	beforeEach(module('app'));  // Invokes program module

	describe('isAdmin', function() { // describes module i'm going to test
		// returns admin is false if user does not have admin within their roles array
		it('should return false if the roles array does not have an admin entry', inject(function(tvUser) {
			var user = new tvUser(); // create new instance of that resource
			user.roles = ['not admin']; // set the roles property
			expect(user.isAdmin()).to.be.falsey;  // first assert
		}));

		// another test to see if admin exists on user roles array
		it('should return true if the roles array has an admin entry', inject(function(tvUser) {
      		var user = new tvUser();
      		user.roles = ['admin'];
      		expect(user.isAdmin()).to.be.true;
    	}))
	})
})