const controllerWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      const result = await controller(req, res, next);
      return result;
    } catch (error) {
      next(error)
    }
  }

  return func;
}

module.exports = controllerWrapper