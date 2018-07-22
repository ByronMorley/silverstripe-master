<header class="header">

	<div id="react-header-navigation">

	</div>
</header>
<script>
	$(document).ready(function(){
	   $('#menu-toggle').on('click', function(){
	       console.log('click');
	       $('.nav-root').toggleClass('open');

	   }) ;
	});
</script>