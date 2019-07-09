const COLOR_DANGER = 'danger';
const COLOR_WARNING = 'warning';
const COLOR_INFO = '#439FE0';
const COLOR_SUCCESS = 'good';
const COLOR_DEFAULT = '#9e9e9e';
const COLOR_ALL = {
  danger: COLOR_DANGER,
  warning: COLOR_WARNING,
  info: COLOR_INFO,
  success: COLOR_SUCCESS,
  failed: COLOR_DANGER,
  opened: COLOR_INFO,
  merged: COLOR_SUCCESS,
  closed: COLOR_DANGER,
  default: COLOR_DEFAULT,
};

const ICON_FAILED = ':heavy_multiplication_x:';
const ICON_WARNING = ':warning:';
const ICON_INFO = ':information_source:';
const ICON_SUCCESS = ':heavy_check_mark:';
const ICON_CLOCK = ':timer_clock:';
const ICON_COMMENT = ':memo:';
const ICON_OPENED = ICON_INFO;
const ICON_MERGED = ':checkered_flag:';
const ICON_CLOSED = ':no_entry_sign:';
const ICON_RUNNING = ':gear:';
const ICON_ALL = {
  failed: ICON_FAILED,
  warning: ICON_WARNING,
  info: ICON_INFO,
  success: ICON_SUCCESS,
  opened: ICON_OPENED,
  approved: ICON_OPENED,
  merged: ICON_MERGED,
  closed: ICON_CLOSED,
  clock: ICON_CLOCK,
  comment: ICON_COMMENT,
  running: ICON_RUNNING,
  default: ICON_INFO,
};

const BUTTON_SUCCESS = 'primary';
const BUTTON_FAILED = 'danger';
const BUTTON_ALL = {
  success: BUTTON_SUCCESS,
  failed: BUTTON_FAILED,
};

export {
  COLOR_DANGER,
  COLOR_WARNING,
  COLOR_INFO,
  COLOR_SUCCESS,
  COLOR_DEFAULT,
  COLOR_ALL,
  ICON_FAILED,
  ICON_WARNING,
  ICON_SUCCESS,
  ICON_CLOCK,
  ICON_COMMENT,
  ICON_OPENED,
  ICON_MERGED,
  ICON_CLOSED,
  ICON_RUNNING,
  ICON_ALL,
  BUTTON_SUCCESS,
  BUTTON_FAILED,
  BUTTON_ALL,
};
