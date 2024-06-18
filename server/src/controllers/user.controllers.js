const asyncHandler = require("../utils/asyncHandler");

const login = asyncHandler(async (req, res, next) => {});

const register = asyncHandler(async (req, res, next) => {});

const getCurrentUser = asyncHandler(async (req, res, next) => {});

const updatePassword = asyncHandler(async (req, res, next) => {});

const logout = asyncHandler(async (req, res, next) => {});

module.exports = { login, register, updatePassword, getCurrentUser, logout };
