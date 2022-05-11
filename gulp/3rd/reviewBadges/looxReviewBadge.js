exports.looxReviewBadge = (itemName) => {
  return `
{% if builderMode %}
  <div class="loox-rating" data-id="6819476635711" data-rating="4.9" data-raters="30" title="4.9 rating (30 votes)" aria-label="4.9 rating (30 votes)" data-rating-upgraded="1">
    <i class="loox-icon loox-star"></i>
    <i class="loox-icon loox-star"></i>
    <i class="loox-icon loox-star"></i>
    <i class="loox-icon loox-star"></i>
    <i class="loox-icon loox-star"></i>&nbsp;<span>(30)</span>
  </div>
{% else %}
  <div class="loox-rating" data-id="{{ ${itemName}.id }}" data-rating="{{ ${itemName}.metafields.loox.avg_rating }}" data-raters="{{ ${itemName}.metafields.loox.num_reviews }}"></div>
{% endif %}
`;
};
