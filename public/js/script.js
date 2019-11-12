$(function(){
	var $slider_container = $(".slider"),
		$body = $("body"),
		$h3 = $("h3");

	$slider_container.Cloud9Carousel({
		// yOrigin: 42,
		// yRadius: 48,
		buttonLeft: $(".slider__buttons__item.left"),
		buttonRight: $(".slider__buttons__item.right"),
		bringToFront: true,
		itemClass: "slider__item",
		onRendered: rendered,
		onLoaded: function(){
			$slider_container.css('visibility', 'visible');
			$slider_container.css('display', 'none');
			$slider_container.fadeIn(1500);
		}
	});

	function rendered(carousel){
		$slider_container.find(".active").removeClass("active");

		var $active_item = $(carousel.nearestItem().element);

		$active_item.addClass("active");
		$body.attr("data-content-color", $active_item.data("color"));
		$h3.html($active_item.find("img").attr("alt"));
		var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI);
	}
});