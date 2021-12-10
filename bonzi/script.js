var playAudio = false;

$(document).ready(function ()
{
	var
		html = $("html"),
		body = $("body"),
		main = $("#main"),
		rate = 200,
		despawn = 5000,
		delay = 1000;

	function newBonzi()
	{
		var
			scale = "scale(" + rand(0.7, 1.6) + ")",
			top = rand(-10, 100) + "%",
			opacity = rand(0.1, 1),
			index = rand(-30, 10),
			duration = rand(1, 5) + "s",
			fromLeft = dice(0, 1),
			bonzi = $("<figure/>").css({
				top,
				opacity,
				"z-index": index,
				"-webkit-transform": scale,
				"-moz-transform": scale,
				"-o-transform": scale,
				"-webkit-animation-duration": duration,
				"-moz-animation-duration": duration,
				"-ms-animation-duration": duration,
				"background-position-x": -(200 * Math.ceil(rand(0, 16))),
				"background-position-y": -(160 * Math.ceil(rand(0, 20)))
			});

		bonzi.addClass("bonzi");
		bonzi.addClass(fromLeft ? "moveL" : "moveR");
		bonzi.appendTo(main);

		setTimeout(function ()
		{
			bonzi.remove()
		}, despawn)
	}

	function gogogo()
	{
		document.title = "Bonzi!";
		body.addClass("play");

		$("#spinner").fadeOut(200);

		setTimeout(function()
		{
			$("#spinner").remove();
		}, 202);

		setTimeout(function()
		{
			setInterval(function()
			{
				newBonzi()
			}, rate)
		}, delay)
	}

	var cfg = {
		lines: 13,
		length: 7,
		width: 4,
		radius: 10,
		rotate: 0,
		color: "#fff",
		speed: 1,
		trail: 60,
		shadow: !0,
		hwaccel: !1,
		className: "spinner",
		zIndex: 2e9,
		top: "auto",
		left: "auto"
	};

	var spin = $("<figure/>").attr({ id: "spinner" });
	$("html").append(spin);
	var root = document.getElementById("spinner");
	new Spinner(cfg).spin(root);

	gogogo();
});

function rand(min, max)
{
	return Math.random() * (max - min) + min;
}

function dice(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#left').on('click', function()
{
	if (!playAudio) { $('#song').trigger('play'); $('#left').html('Pause audio'); }
	else { $('#song').trigger('pause'); $('#left').html('Play audio'); }
	playAudio = !playAudio;
})