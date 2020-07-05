const { CREATED, BAD_REQUEST } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Asset = require('../../schemas/assetSchema');
const Worker = require('../../repository/workerRepository');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Add asset log
// @route     POST /api/v0/assets
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { coordinates, is_active, duration, worker_id } = req.body;

  const worker = await Worker.findOne(
    {
      _id: worker_id
    },
    {
      _id: 1,
      clientId: 1,
      siteId: 1
    }
  );

  if (!worker) {
    return next(new ErrorResponse('Worker not found', BAD_REQUEST));
  }
  const { clientId, siteId } = worker;

  Asset.create({
    workerId: worker_id,
    clientId,
    siteId,
    location: coordinates,
    isActive: is_active,
    duration
  });

  return res.status(CREATED).json({
    success: true,
    message: 'Asset log created successfully',
    data: null
  });
});
