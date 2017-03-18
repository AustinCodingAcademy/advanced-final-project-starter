import ListModel from '../models/ListModel';


const ListController = {
  create(req, res, next ) {
    // In create method, assigning the title based on what is received
    // from the request body, and user_id from the req.user.
    const list = new List({ title: req.body.title, user_id: req.user._id });
    list
      .save()
      .then(list => res.json(list))
      .catch(err => next(err));
  },

  update(req, res, next) {
    // In update method, finding the List based on the _id and user_id.
    // This means a user will not be able to update a list they do not own.
    List.find({ _id: req.params.id, user_id: req.user._id })
      exec()
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
  }
};


export default ListController;
