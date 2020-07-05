const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Report = require('../../repository/reportRepository');

// @desc      Get all reports
// @route     POST /api/v0/users/reports
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const searchOptions = req.query;
  const page = parseInt(req.query.page || 1, 10);
  const limit = parseInt(req.query.limit || 25, 10);
  const skip = (page - 1) * limit;
  const conditions = {};

  const searchFieldsMapping = {
    clientId: 'clientId',
    siteId: 'siteId'
  };

  Object.keys(searchOptions).forEach((key) => {
    switch (key) {
      case 'siteId':
        conditions[searchFieldsMapping[key]] = searchOptions[key];
        break;
      case 'clientId':
        conditions[searchFieldsMapping[key]] = searchOptions[key];
        break;
      default:
    }
  });
  console.log(conditions);
  const [list, count] = await Promise.all([
    Report.findAll(
      conditions,
      {},
      {
        skip,
        limit
      }
    ),
    Report.countDocuments(conditions)
  ]);
  const reportResult = Report.find(
    conditions,
    {},
    {
      skip,
      limit
    }
  );
  return res.status(OK).json({
    success: true,
    message: 'Done successfully',
    data: {
      count,
      limit,
      page,
      pages: Math.ceil(count / limit || 0 / limit),
      list: list || []
    }
  });
});
