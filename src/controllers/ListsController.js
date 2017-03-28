import ListModel from '../models/ListModel';


const ListController = {


  // Declare a (GET = list) route.
  list(req, res, next) {
    ListModel.find({ _id: req.params.list_id, userId: req.user._id })
    .exec()
    .then(list => {
      return res.json(list);
    })
    .catch(err => next(err));
  },


  // Declare a (GET/:id = show) route
  show(req, res, next) {
    ListModel.find({ _id: req.params.list_id, userId: req.user._id })
    .exec()
    .then(list => {
      return res.json(list);
    })
    .catch(err => next(err));
  },


  // Declare a (POST = create) route.
  create(req, res, next ) {
    // In create method, assigning the title based on what is received
    // from the request body, and user_id from the req.user.
    const list = new List({ title: req.body.title, userId: req.user._id });
    list
      .save()
      .then(newList => res.json(newList))
      .catch(err => next(err));
  },


  // Declare a (PUT = update) route.
  update(req, res, next) {
    // In update method, finding the List based on the _id and user_id.
    // This means a user will not be able to update a list they do not own.
    ListModel.find({ _id: req.params.id, userId: req.user._id })
      .exec()
      .then(list => {
        if (!list) {
          return next('No List Found');
        }

        list.title = req.params.title;
        return list.save();
      })
      .then(list => {
        return req.json(list);
      })
      .catch(err => next(err));
  },


  // Declare a DELETE (remove) route.
  remove(req, res, next) {
    const itemId = req.params.item_id;

    ListModel.find({ _id: req.params.list_id, userId: req.user._id })
    .exec()
    .then(list => {
      list.items.id(itemId).remove();

      return list.save();
    })
    .then(list => {
      return req.json(list.items.id(itemId));
    })
    .catch(err => next(err));
  }
};


export default ListController;
