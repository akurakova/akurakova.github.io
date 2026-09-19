/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery').not('.dashboard-gallery');

			// $gallery.poptrox({
			// 	baseZIndex: 10001,
			// 	useBodyOverflow: false,
			// 	usePopupEasyClose: false,
			// 	overlayColor: '#1f2328',
			// 	overlayOpacity: 0.65,
			// 	usePopupDefaultStyling: false,
			// 	usePopupCaption: true,
			// 	popupLoaderText: '',
			// 	windowMargin: 50,
			// 	usePopupNav: true
			// });
			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: true,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true,

				popupContent: function($a) {
					const targetId = $a.attr("href");
					if (targetId && targetId.startsWith("#")) {
						return $(targetId).html();
					}
					return '<img src="' + $a.attr("href") + '" />';
				}
			});


			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});
	document.addEventListener("DOMContentLoaded", function () {
		const triggers = document.querySelectorAll("[data-modal-trigger]");
		const liveDashboards = document.querySelectorAll("[data-live-dashboard]");
		const modal = document.getElementById("dashboardModal");
		const embedContainer = document.getElementById("modal-embed");
		const modalImage = document.getElementById("modal-image");
		const modalDescription = document.getElementById("modal-description");
		const modalLink = document.getElementById("modal-link");
		const modalCodeLink = document.getElementById("modal-code-link");
		const closeButton = document.querySelector(".close-button");




        function closeModal() {
            modal.style.display = "none";
            embedContainer.innerHTML = "";
        }
        closeButton.addEventListener("click", closeModal);
        modal.addEventListener("click", event => {
            if (event.target === modal) closeModal();
        });
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeModal();
        });

		triggers.forEach(trigger => {
			trigger.addEventListener("click", () => {
				const embedContainer = document.getElementById("modal-embed");
				embedContainer.innerHTML = "";
				embedContainer.style.display = "none";
				modalImage.style.display = "none";

				const iframeId = trigger.getAttribute("data-iframe");
				const imageUrl = trigger.getAttribute("data-image");
				const description = trigger.getAttribute("data-description");
				const link = trigger.getAttribute("data-link");
				const codeLink = trigger.getAttribute("data-code-link");

				if (iframeId) {
				const embedHtml = document.getElementById(iframeId);
				if (embedHtml) {
					embedContainer.innerHTML = embedHtml.innerHTML;
					embedContainer.style.display = "block";
				}
				} else if (imageUrl) {
				modalImage.src = imageUrl;
				modalImage.alt = description || "Project preview";
				modalImage.style.display = "block";
				}

				modalDescription.textContent = description;
				modalLink.href = link;
				modalLink.textContent = trigger.getAttribute("data-link-label") || "Open in New Tab";
				modalCodeLink.style.display = codeLink ? "inline-block" : "none";
				if (codeLink) {
					modalCodeLink.href = codeLink;
					modalCodeLink.textContent = trigger.getAttribute("data-code-link-label") || "View Code on GitHub";
				}
				modal.style.display = "block";
			});
		});

		liveDashboards.forEach(link => {
			link.addEventListener("keydown", event => {
				if (event.key === "Enter" || event.key === " ") link.click();
			});
		});
	});






	
})(jQuery);

