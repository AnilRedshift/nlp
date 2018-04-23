import { singularize } from './text/en/inflect';
import constants from './text/constants';
import tenseId from './text/tenseId';

const api = {
  constants,
  tenseId,
  en: {
    singularize,
  },
};

export default api;
