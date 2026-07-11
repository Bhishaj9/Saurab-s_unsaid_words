'use strict';

const fs = require('fs');
const path = require('path');

const VALID_MODES = ['off', 'lite', 'full', 'ultra'];

function normalizePersistedMode(mode) {
  if (!mode) return null;
  const m = mode.trim().toLowerCase();
  return VALID_MODES.includes(m) ? m : null;
}

function getDefaultMode() {
  const envMode = normalizePersistedMode(process.env.PONYTAIL_DEFAULT_MODE);
  if (envMode) return envMode;

  const configPath = process.env.APPDATA
    ? path.join(process.env.APPDATA, 'ponytail', 'config.json')
    : path.join(process.env.HOME || '~', '.config', 'ponytail', 'config.json');

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const fileMode = normalizePersistedMode(config.defaultMode);
    if (fileMode) return fileMode;
  } catch (e) {}

  return 'full';
}

module.exports = { getDefaultMode, normalizePersistedMode };
