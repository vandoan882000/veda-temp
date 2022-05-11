exports.aliReviewBadge = (itemName) => {
  return `
{% if builderMode %}
<div product-id="6708257652793" class="arv-collection arv-collection--6708257652793">
	<style>
		.arv-collection .rating-symbol-foreground > span,
		.arv-collection .alr-rating-symbol-foreground > span,
		.arv-collection .rating-symbol-background,
		.arv-collection .alr-rating-symbol-background,
		#alireview-review-widget-badge .rating-symbol-foreground > span,
		.alireview-review-widget-badge .rating-symbol-foreground > span,
		#alireview-review-widget-badge .rating-symbol-background,
		.alireview-review-widget-badge .rating-symbol-background,
		#alireview-review-widget-badge .alr-rating-symbol-foreground > span,
		.alireview-review-widget-badge .alr-rating-symbol-foreground > span,
		#alireview-review-widget-badge .alr-rating-symbol-background,
		.alireview-review-widget-badge .alr-rating-symbol-background {
			color: #FAAD14 !important;
		}
		.arv-collection .alr-icon-star:before,
		#alireview-review-widget-badge .alr-icon-star:before {
			content: "\f005" !important;
		}
	</style>
	<div class="alrv-prod-rating-6708257652793 ">

		<span class="alr-wrapper-rating">

			<div class="alr-rating-symbol">
				<div class="alr-rating-symbol-background alr-icon-star" style="visibility: hidden;"></div>
				<div class="alr-rating-symbol-foreground" style="width: auto;">
					<span class="alr-icon-star"></span>
				</div>
			</div>
			<div class="alr-rating-symbol">
				<div class="alr-rating-symbol-background alr-icon-star" style="visibility: hidden;"></div>
				<div class="alr-rating-symbol-foreground" style="width: auto;">
					<span class="alr-icon-star"></span>
				</div>
			</div>
			<div class="alr-rating-symbol">
				<div class="alr-rating-symbol-background alr-icon-star" style="visibility: hidden;"></div>
				<div class="alr-rating-symbol-foreground" style="width: auto;">
					<span class="alr-icon-star"></span>
				</div>
			</div>
			<div class="alr-rating-symbol">
				<div class="alr-rating-symbol-background alr-icon-star" style="visibility: hidden;"></div>
				<div class="alr-rating-symbol-foreground" style="width: auto;">
					<span class="alr-icon-star"></span>
				</div>
			</div>
			<div class="alr-rating-symbol">
				<div class="alr-rating-symbol-background alr-icon-star" style="visibility: visible;"></div>
				<div class="alr-rating-symbol-foreground" style="width: 70%;">
					<span class="alr-icon-star"></span>
				</div>
			</div>
		</span>

		<span class="alrv-prod-rating__text">
			15 reviews
		</span>
	</div>
</div>
{% else %}
  <div product-id="{{ ${itemName}.id }}" class="arv-collection arv-collection--{{ ${itemName}.id }}"></div>
{% endif %}
`;
};
