// programmed by: Baradits Janka & apr :)
//
var $BJ = 
{ 
	hElements : [ ],
	mElements : [ ],
	sElements : [ ],
	dlElements : [ ],
	ddElements : [ ],
	dFormatElements : [ ],
	dSecElements : [ ],	
	h : 0,
	h12 : 0,
	m : 0,
	s : 0,
	h24 : true,
	sec : false,
	digital : false,
	dark : false,
	fullscreen : false
};	// Our global object (Baradits Janka) holds everything.
var $get = function( id ) { return document.getElementById( id ); };

function start( )
{
	$BJ.dark = window.localStorage.getItem( "dark") === "dark";
	$BJ.h24 = window.localStorage.getItem( "h24") === "h24";
	$BJ.sec = window.localStorage.getItem( "sec") === "sec";

	updateDark( );

	if( document.body.classList.contains( "clock-style-3" ) )
	{
		$BJ.digital = true;
	}

	$get( "light-mode" ).addEventListener( "click", function( e ) 
	{ 
		e.stopPropagation( );
		$BJ.dark = false;
		window.localStorage.setItem( "dark", "" );
		updateDark( );
		if( $BJ.digital ) { updateDigitalClock( true ); }
	} );
	$get( "dark-mode" ).addEventListener( "click", function( e ) 
	{ 
		e.stopPropagation( );
		$BJ.dark = true;
		window.localStorage.setItem( "dark", "dark" );
		updateDark( );
		if( $BJ.digital ) { updateDigitalClock( true ); }
	} );
	$get( "content" ).addEventListener( "click", function( e ) 
	{ 
		e.stopPropagation( );
		if( e.target.classList.contains( "clock" ) || e.target.classList.contains( "dclock" ) )
		{
			if( document.body.classList.contains( "full-screen" ) )
			{
				document.body.classList.remove( "full-screen" );
				$BJ.fullscreen = false;
			}
			else
			{
				document.body.classList.add( "full-screen" );
				$BJ.fullscreen = true;
			}
		}
	} );
	$get( "dark-mode" ).addEventListener( "click", function( e ) 
	{ 
		e.stopPropagation( );
		document.body.classList.add( "dark" );
		document.body.classList.remove( "light" );
		if( $BJ.digital ) { updateDigitalClock( true ); }
	} );

	if( $BJ.digital )
	{
		$BJ.digital = true;
		updateDigitalClock( true );
	}
	else
	{
		$BJ.digital = false;
		startAnalogClock( );
	}

	window.setInterval( updateDigitalClock, 50, false );
}

function updateDark( )
{
	if( $BJ.dark )
	{
		document.body.classList.add( "dark" );
		document.body.classList.remove( "light" );
	}
	else
	{
		document.body.classList.add( "light" );
		document.body.classList.remove( "dark" );
	}
}

function startAnalogClock( )
{
	var now = new Date;
	var h = now.getHours( ) % 12;
	var m = now.getMinutes( );
	var s = now.getSeconds( );

	var hSVG = document.getElementsByClassName( "clock-h" );
	var mSVG = document.getElementsByClassName( "clock-m" );
	var sSVG = document.getElementsByClassName( "clock-s" );

	var i;
	var element;

	for( i = hSVG.length; i --> 0; )
	{

		element = hSVG[ i ];
		element.animate(
		[
			{ transform: "rotate(" + ( 359.0 / 43200.0 * h * 3600.0 ) + "deg)" },
			{ transform: "rotate(" + ( 359.0 / 43200.0 * h * 3600.0 + 359.0 ) + "deg)" }
			], 
		{
			duration: 43200000,
			iterations: Infinity
		} );
		$BJ.hElements.push( element );
	}

	for( i = mSVG.length; i --> 0; )
	{
		element = mSVG[ i ];
		element.animate(
		[
			{ transform: "rotate(" + ( 359.0 / 3600.0 * 60.0 * m ) + "deg)" },
			{ transform: "rotate(" + ( 359.0 / 3600.0 * 60.0 * m + 359.0 ) + "deg)" }
			], 
		{
			duration: 3600000,
			iterations: Infinity
		} );
		$BJ.mElements.push( element );
	}

	for( i = sSVG.length; i --> 0; )
	{
		element = sSVG[ i ];
		element.animate(
		[
			{ transform: "rotate(" + ( 360.0 / 60.0 * s ) + "deg)" },
			{ transform: "rotate(" + ( 360.0 / 60.0 * s + 360.0 ) + "deg)" }
	 	], 
		{
			duration: 60000,
			iterations: Infinity
		} );
		$BJ.sElements.push( element );
	}
}

function updateDigitalClock( force )
{
	var i;
	var element;

	if( typeof( force ) == "undefined" )
	{ 
		force = false;
	}
	if( $BJ.digital && $BJ.dlElements.length === 0 )
	{
		$BJ.dlElements.push( $get( "light-clock-d1" ) );
		$BJ.dlElements.push( $get( "light-clock-d2" ) );
		$BJ.dlElements.push( $get( "light-clock-d3" ) );
		$BJ.dlElements.push( $get( "light-clock-d4" ) );
		$BJ.dlElements.push( $get( "light-clock-d5" ) );
		$BJ.dlElements.push( $get( "light-clock-d6" ) );
		$BJ.ddElements.push( $get( "dark-clock-d1" ) );
		$BJ.ddElements.push( $get( "dark-clock-d2" ) );
		$BJ.ddElements.push( $get( "dark-clock-d3" ) );
		$BJ.ddElements.push( $get( "dark-clock-d4" ) );
		$BJ.ddElements.push( $get( "dark-clock-d5" ) );
		$BJ.ddElements.push( $get( "dark-clock-d6" ) );
		$BJ.dFormatElements.push( $get( "light-clock-format" ) );
		$BJ.dFormatElements.push( $get( "dark-clock-format" ) );
		$BJ.dSecElements.push( $get( "light-clock-sec" ) );
		$BJ.dSecElements.push( $get( "dark-clock-sec" ) );
		ce = document.getElementsByClassName( "dclock-format" );

		for( i = $BJ.dFormatElements.length; i --> 0; )
		{
			element = $BJ.dFormatElements[ i ];
			element.addEventListener( "click", function( e ) 
			{ 
				e.stopPropagation( );
				$BJ.h24 = !$BJ.h24;
				window.localStorage.setItem( "h24", $BJ.h24 ? "h24" : "" );
				updateDigitalClock( true );
			} );
		}
		for( i = $BJ.dSecElements.length; i --> 0; )
		{
			element = $BJ.dSecElements[ i ];
			element.addEventListener( "click", function( e ) 
			{ 
				e.stopPropagation( );
				$BJ.sec = !$BJ.sec;
				window.localStorage.setItem( "sec", $BJ.sec ? "sec" : "" );
				updateDigitalClock( true );
			} );
		}
	}

	var now = new Date;
	var h = now.getHours( );
	var h12 = h % 12;
	h12 = ( h12 == 0 ? 12 : h12 );
	var m = now.getMinutes( );
	var s = now.getSeconds( );

	if( $BJ.digital )
	{
		if( $BJ.h24 && ( $BJ.h != h || force ) )
		{
			$BJ.h = h;
			$BJ.dlElements[ 0 ].src = "./content/svg/3/light/3v-" + ( ( h - h % 10 ) / 10 ) + "-szam.svg";
			$BJ.dlElements[ 1 ].src = "./content/svg/3/light/3v-" + ( h % 10 ) + "-szam.svg";
			$BJ.ddElements[ 0 ].src = "./content/svg/3/dark/3s-" + ( ( h - h % 10 ) / 10 ) + "-szam.svg";
			$BJ.ddElements[ 1 ].src = "./content/svg/3/dark/3s-" + ( h % 10 ) + "-szam.svg";
			$BJ.dFormatElements[ 0 ].src = "./content/svg/3/light/v-24.svg";
			$BJ.dFormatElements[ 1 ].src = "./content/svg/3/dark/s-24.svg";
		}
		if( !$BJ.h24 && ( $BJ.h12 != h12 || force ) )
		{
			$BJ.h12 = h12;
			$BJ.dlElements[ 0 ].src = "./content/svg/3/light/3v-" + ( ( h12 - h12 % 10 ) / 10 ) + "-szam.svg";
			$BJ.dlElements[ 1 ].src = "./content/svg/3/light/3v-" + ( h12 % 10 ) + "-szam.svg";
			$BJ.ddElements[ 0 ].src = "./content/svg/3/dark/3s-" + ( ( h12 - h12 % 10 ) / 10 ) + "-szam.svg";
			$BJ.ddElements[ 1 ].src = "./content/svg/3/dark/3s-" + ( h12 % 10 ) + "-szam.svg";
			$BJ.dFormatElements[ 0 ].src = h < 12 ? "./content/svg/3/light/v-am.svg" : "./content/svg/3/light/v-pm.svg";
			$BJ.dFormatElements[ 1 ].src = h < 12 ? "./content/svg/3/dark/s-am.svg" : "./content/svg/3/dark/s-pm.svg";
		}	
		if( $BJ.m != m || force )
		{
			$BJ.m = m;
			$BJ.dlElements[ 2 ].src = "./content/svg/3/light/3v-" + ( ( m - m % 10 ) / 10 ) + "-szam.svg";
			$BJ.dlElements[ 3 ].src = "./content/svg/3/light/3v-" + ( m % 10 ) + "-szam.svg";
			$BJ.ddElements[ 2 ].src = "./content/svg/3/dark/3s-" + ( ( m - m % 10 ) / 10 ) + "-szam.svg";
			$BJ.ddElements[ 3 ].src = "./content/svg/3/dark/3s-" + ( m % 10 ) + "-szam.svg";
		}
		if( $BJ.s != s || force )
		{
			$BJ.s = s;
			$BJ.dlElements[ 4 ].src = "./content/svg/3/light/3v-" + ( ( s - s % 10 ) / 10 ) + "-szam.svg";
			$BJ.dlElements[ 5 ].src = "./content/svg/3/light/3v-" + ( s % 10 ) + "-szam.svg";
			$BJ.ddElements[ 4 ].src = "./content/svg/3/dark/3s-" + ( ( s - s % 10 ) / 10 ) + "-szam.svg";
			$BJ.ddElements[ 5 ].src = "./content/svg/3/dark/3s-" + ( s % 10 ) + "-szam.svg";
		}
		if( force )
		{
			if( $BJ.sec )
			{
				document.body.classList.add( "sec" );
				$BJ.dSecElements[ 0 ].src = "./content/svg/3/light/v-sec-minus.svg";
				$BJ.dSecElements[ 1 ].src = "./content/svg/3/dark/s-sec-minus.svg";
			}
			else
			{
				document.body.classList.remove( "sec" );
				$BJ.dSecElements[ 0 ].src = "./content/svg/3/light/v-sec-plus.svg";
				$BJ.dSecElements[ 1 ].src = "./content/svg/3/dark/s-sec-plus.svg";
			}
		}
	}

	if( s % 2 == 0 )
	{
		$get( "logo-l-1" ).style.display = "none";
		$get( "logo-l-2" ).style.display = $BJ.dark || $BJ.fullscreen ? "none" : "block";
		$get( "logo-d-1" ).style.display = "none";
		$get( "logo-d-2" ).style.display = $BJ.dark && !$BJ.fullscreen ? "block" : "none";		
	}
	else
	{
		$get( "logo-l-2" ).style.display = "none";
		$get( "logo-l-1" ).style.display = $BJ.dark || $BJ.fullscreen ? "none" : "block";
		$get( "logo-d-2" ).style.display = "none";
		$get( "logo-d-1" ).style.display = $BJ.dark && !$BJ.fullscreen ? "block" : "none";		
	}
}