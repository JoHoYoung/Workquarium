import path from 'path';
import local from './env/local';
import prod from './env/prod';

const root = path.join(__dirname, '../../');
const defaultConfig = {
  root,
};
module.exports = {
  local: Object.assign(defaultConfig, local),
  prod: Object.assign(defaultConfig, prod),
}[process.env.NODE_ENV];
