// Create the "class"
function User(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Add methods to its prototype
User.prototype.getFullName = function() {
    return this.firstName + " " + this.lastName;
};