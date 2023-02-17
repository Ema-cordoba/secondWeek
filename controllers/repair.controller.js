const Repair = require('../models/repairs.models');


exports.findAllRepairs = async (req, res) => {
  //Inicializamos las relaciones
  try {
    const repairs = await Repair.findAll({
      attributes: ['id', 'date', 'userId'],
      where: {
        status: 'pending',
      },
     
    });

    return res.status(200).json({
      status: 'success',
      repairs,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Somethin went very wront! 🧨',
    });
  }
};
exports.findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        status: 'pending',
        id,
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      repair,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Somethin went very wront! 🧨',
    });
  }
};
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const repair = await Repair.create({ date, userId });

    return res.status(201).json({
      status: 'success',
      message: 'Created Repair',
      repair,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Somethin went very wront! 🧨',
    });
  }
};
exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repair.findOne({
      where: {
        status: 'pending',
        id,
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    await repair.update({ status });

    return res.status(200).json({
      status: 'success',
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Somethin went very wront! 🧨',
    });
  }
};
exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        status: 'pending',
        id,
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    await repair.update({ status: 'cancelled' });

    return res.status(200).json({
      status: 'success',
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Somethin went very wront! 🧨',
    });
  }
};
