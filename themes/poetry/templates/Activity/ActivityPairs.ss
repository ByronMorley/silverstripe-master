<div class="panel content aq-activity aq-pairs" id="activity-$ID" data-object="PairActivity" data-canvas="#canvas-$ID">

	<div class="aq-pair-activity-area" id="area-1" style="display:block">
		<ul class="aq-pool aq-left-pool">
            <% loop $leftSide.Sort('RAND()') %>
				<li class="aq-canvas-item aq-selectable aq-box" data-text="$Text" data-pair="$PairID" data-side="$Side">$Text</li>
            <% end_loop %>
		</ul>
        <!--<canvas id="canvas-$ID"></canvas>-->
		<ul class="aq-pool aq-right-pool">
            <% loop $rightSide.Sort('RAND()') %>
				<li class="aq-canvas-item  aq-selectable aq-box" data-text="$Text" data-pair="$PairID" data-side="$Side">$Text</li>
            <% end_loop %>
		</ul>
	</div>
</div>
<script>
	window.addEventListener('load', function(){
		console.log(document.getElementById('area-1').clientWidth);
		console.log(document.getElementById('area-1').offsetWidth);
	});
	$(document).ready(function(){
		$('#area-1').css('display', 'block');
		console.log($('#area-1').width());
	});

</script>