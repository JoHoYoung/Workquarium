import { CHAT } from './format/chat';
import { DRAW } from './format/draw';
import { END } from './format/end';
import { ENTER } from './format/enter';
import { HIGHLIGHT } from './format/highlight';
import { LEAVE } from './format/leave';
import { RENAME } from './format/rename';
import { START } from './format/start';

import { chatHandler } from './handler/chat';
import { drawHandler } from './handler/draw';
import { endHandler } from './handler/end';
import { enterHandler } from './handler/enter';
import { highlightHandler } from './handler/highlight';
import { leaveHandler } from './handler/leave';
import { renameHandler } from './handler/rename';
import { startHandler } from './handler/start';
import config from '../config';

const handlerFactory = (type) => {
  switch (type) {
    case config.TYPE.CHAT:
      return chatHandler;
    case config.TYPE.DRAW:
      return drawHandler;
    case config.TYPE.END:
      return endHandler;
    case config.TYPE.ENTER:
      return enterHandler;
    case config.TYPE.HIGHLIGHT:
      return highlightHandler;
    case config.TYPE.LEAVE:
      return leaveHandler;
    case config.TYPE.RENAME:
      return renameHandler;
    case config.TYPE.START:
      return startHandler;
    default:
  }
};

module.exports = {
  handlerFactory,
  CHAT,
  DRAW,
  END,
  ENTER,
  HIGHLIGHT,
  LEAVE,
  START,
  RENAME,
};
