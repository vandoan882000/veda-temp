exports.judgeMeReviewBadge = (itemName) => {
  return `
{% if builderMode %}
  <div class="jdgm-widget jdgm-preview-badge jdgm-preview-badge--with-link jdgm--done-setup"
    data-id="3784779038780" data-template="index" data-auto-install="false">
    <div class="jdgm-prev-badge" data-average-rating="4.62" data-number-of-reviews="37"
      data-number-of-questions="6"> <span class="jdgm-prev-badge__stars" data-score="4.62" tabindex="0"
        aria-label="4.62 stars" role="button"> <span class="jdgm-star jdgm--on"></span><span
          class="jdgm-star jdgm--on"></span><span class="jdgm-star jdgm--on"></span><span
          class="jdgm-star jdgm--on"></span><span class="jdgm-star jdgm--half"></span> </span> <span
        class="jdgm-prev-badge__text">4.62</span>
      <span class="jdgm-qa-badge ">

        <span class="jdgm-qa-badge__icon" style="color: inherit;">
        </span>

        <span class="jdgm-qa-badge__text">
          6 questions
        </span>
      </span>
    </div>
  </div>
{% else %}
  {% render 'judgeme_widgets', widget_type: 'judgeme_preview_badge', jm_style: '', concierge_install: false, product: ${itemName} %}
{% endif %}
`;
};
