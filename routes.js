const Router = require('express').Router();
const productControllers = require('./controllers/productControllers');
const eventControllers = require('./controllers/eventControllers');
<<<<<<< HEAD
const userControllers = require('./controllers/userControllers')
const {getProducts, addProduct, getProductById, modifyProduct, deleteProduct, buyProducts} = productControllers;
const {getEvents, getEventById, addEvent, modifyEvent, deleteEvent} = eventControllers;
const {signUp, signIn, verifyMail, getUsers, getUserById, modifyUser, deleteUser} = userControllers;
=======
const userControllers = require('./controllers/userControlers')
const {getProducts, addProduct, getProductById, modifyProduct, deleteProduct} = productControllers;
const {getEvents, getEventById, addEvent, modifyEvent, deleteEvent} = eventControllers;
const {signIn, signUp} = userControllers
>>>>>>> fb783a0bb02b2c8830f3b94fcd5024c415858c5f

// Products Routes
Router.route('/products')
.get(getProducts)
.post(addProduct);

Router.route('/products/:id')
.get(getProductById)
.put(modifyProduct)
.delete(deleteProduct);

Router.route('/products/buy')
.post(buyProducts);

// Router.route("/addDeleteProduct/:id").put(passport.authenticate("jwt", {session:false}), addDeleteProduct);

// Events Routes
Router.route('/events')
.get(getEvents)
.post(addEvent);

Router.route('/events/:id')
.get(getEventById)
.put(modifyEvent)
.delete(deleteEvent);

//User Routes
Router.route('/signUp')
.post(signUp)
Router.route('/signIn')
.post(signIn)
Router.route('/profile')
.get(getUserById)
.put(modifyUser)
Router.route('/admin/users')
.get(getUsers)
.put(modifyUser)
.delete(deleteUser)

module.exports = Router;