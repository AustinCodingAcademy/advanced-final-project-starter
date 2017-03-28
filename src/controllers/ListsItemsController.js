import ListModel from '../models/ListModel';


const ListsItemsController = {


  // Declare a (GET = list) route.
  list(req, res, next) {
    ListModel.find({ _id: req.params.list_id, userId: req.user._id })
      .exec()
      .then(list => {
        return res.json(list);
      })
      .catch(err => next(err));
  },


  // Declare a (GET/:id = show) route.
  show(req, res, next) {
    ListModel.find({ _id: req.params.list_id, userId: req.user._id })
    .exec()
    .then(list => {
      return res.json(list);
    })
    .catch(err => next(err));
  },


  // Declare a (POST = create) route.
  create(req, res, next) {
    // Find the list by it's id, and ensure that the current user owns the list
    ListModel.find({ _id: req.params.list_id, userId: req.user._id })
      .then(list => {
        // Create a new object that represents an item
        const item = {
          text: req.body.text,
          completed: false
        };

        // Add the item to the lists items array
        list.items.push(item);

        // Save the list
        return list.save();
      })
      .then(list => {
        // Grab the newly created item, which is the last item in the array
        const newItem = list.items[list.items.length - 1];

        // Return that item
        return res.json(newItem);
      })
      .catch(err => next(err));
  },


  // Declare a (PUT = update) route.
  update(req, res, next) {
    const itemId = req.params.item_id;

    // Find the list by it's id, and ensure that the current user owns the list
    ListModel.find({ _id: req.params.list_id, userId: req.user._id })
    .exec()
    .then(list => {
      // Find the item by it's _id
      const item = list.items.id(itemId);

      // Update the item if new attributes are sent, or use the current attributes
      item.text = req.body.text || item.text;
      item.completed = req.body.completed || item.completed;

      return list.save();
    })
    .then(list => {
      // Return the updated item
      return req.json(list.items.id(itemId));
    })
    .catch(err => next(err));
  },


  // Declare a (DELETE = remove) route.
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


export default ListsItemsController;
