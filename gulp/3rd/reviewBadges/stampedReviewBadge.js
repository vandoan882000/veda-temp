exports.stampedReviewBadge = (itemName) => {
  return `
{% if builderMode %}
<div class="stamped-reviews-rating" data-count="6"><span><i class="stamped-fa stamped-fa-star stamped-style-color-star" role="none"></i></span><span><i class="stamped-fa stamped-fa-star stamped-style-color-star" role="none"></i></span><span><i class="stamped-fa stamped-fa-star stamped-style-color-star" role="none"></i></span><span><i class="stamped-fa stamped-fa-star stamped-style-color-star" role="none"></i></span><span><i class="stamped-fa stamped-fa-star stamped-style-color-star" role="none"></i></span></div>
{% else %}
  <span class="stamped-product-reviews-badge stamped-main-badge" data-id="{{ ${itemName}.id }}" data-product-sku="{{ ${itemName}.handle }}" data-product-type="{{${itemName}.type}}" data-product-title="{{${itemName}.title}}"  style="display: inline-block;">{{ ${itemName}.metafields.stamped.badge }}</span>
{% endif %}
`;
};
