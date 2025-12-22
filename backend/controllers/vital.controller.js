const Vital = require("../models/vitals.model");
const asyncHandler = require("../utils/asyncHandler");
const { success, error } = require("../utils/response");

exports.addVital = asyncHandler(async (req, res) => {
  const { type, value, unit, recorded_at } = req.body;

  if (!type || !value) {
    return error(res, "Type and value are required", 400);
  }

  await Vital.addVital({
    userId: req.user.id,
    type,
    value,
    unit,
    recordedAt: recorded_at || new Date().toISOString(),
  });

  success(res, {}, "Vital added", 201);
});

exports.getVitals = asyncHandler(async (req, res) => {
  const vitals = await Vital.getVitalsByUser(req.user.id);
  success(res, vitals, "Vitals fetched");
});
