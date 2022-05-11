const { pipe } = require("ramda");
const { aliReviewBadge } = require("./reviewBadges/aliReviewBadge");
const { defaultReviewBadge } = require("./reviewBadges/defaultReviewBadge");
const { judgeMeReviewBadge } = require("./reviewBadges/judgeMeReviewBadge");
const { looxReviewBadge } = require("./reviewBadges/looxReviewBadge");
const { rivioReviewBadge } = require("./reviewBadges/rivioReviewBadge");
const { stampedReviewBadge } = require("./reviewBadges/stampedReviewBadge");

function getRegexp(value) {
  return new RegExp(
    `<${value}\\s+item=["']\\w*["']\\s*(\\/>|><\\/\\s*${value}\\s*>)`,
    "g"
  );
}

function getItemName(value) {
  const tagName = value.replace(/<|\s.*/g, "");
  const regexp = new RegExp(
    `(^.*=["'])(\\w*)(.*(\\/>|<\\/\\s*${tagName}\\s*>))`,
    "g"
  );
  return value.replace(regexp, "$2");
}

const ReviewBadge = "review-badge";
const RivioReviewBadge = "rivio-review-badge";
const LooxReviewBadge = "loox-review-badge";
const AliReviewBadge = "ali-review-badge";
const StampedReviewBadge = "stamped-review-badge";
const JudgeMeReviewBadge = "judge-me-review-badge";

function replaceReviewBadge(content) {
  return content
    .replace(getRegexp(ReviewBadge), pipe(getItemName, defaultReviewBadge))
    .replace(getRegexp(RivioReviewBadge), pipe(getItemName, rivioReviewBadge))
    .replace(getRegexp(LooxReviewBadge), pipe(getItemName, looxReviewBadge))
    .replace(getRegexp(AliReviewBadge), pipe(getItemName, aliReviewBadge))
    .replace(
      getRegexp(JudgeMeReviewBadge),
      pipe(getItemName, judgeMeReviewBadge)
    )
    .replace(
      getRegexp(StampedReviewBadge),
      pipe(getItemName, stampedReviewBadge)
    );
}

exports.default = replaceReviewBadge;
