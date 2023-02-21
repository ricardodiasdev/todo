const TaskModel = require("../model/TaskModel");
const { isPast } = require("date-fns");
const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress) {
    return res.status(400).json({ error: "Mac Address é obrigatório..." });
  } else if (!type) {
    return res
      .status(400)
      .json({ error: "Típo da atividade é obrigatório..." });
  } else if (!title) {
    return res
      .status(400)
      .json({ error: "Título da atividade é obrigatório..." });
  } else if (!description) {
    return res.status(400).json({ error: "Descrição é obrigatória..." });
  } else if (!when) {
    return res.status(400).json({ error: "Data e Hora são obrigatórios..." });
  } else if (isPast(new Date(when))) {
    return res.status(400).json({ error: "Escolha uma hora futura..." });
  } else {
    let exists;
    if (req.aprams.id) {
      exists = await TaskModel.findOne({
        _id: { $ne: req.params.id },
        when: { $eq: new Date(when) },
        macaddress: { $in: req.body.macaddress },
      });
    } else {
      exists = await TaskModel.findOne({
        when: { $eq: new Date(when) },
        macaddress: { $in: req.body.macaddress },
      });
    }
    if (exists) {
      return res
        .status(400)
        .json({ error: "Já existe atividade nessa data e hora..." });
    }

    next();
  }
};

module.exports = TaskValidation;
