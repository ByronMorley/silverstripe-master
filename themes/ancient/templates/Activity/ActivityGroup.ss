<div id="aqua-$ID">
	<div class="panel">
		<div class="panel header">
            <% if $ShowTitle %>
				<span class="title">
                    $Title
				</span>
            <% end_if %>
		</div>
		<div class="aq-main-panel">
			<div class="panel content">
				<div class="panel aq-upper-section">
					<div class="section left aq-intro">
					</div>
					<div class="section right aq-score">

					</div>
				</div>
			</div>
			<ul class="aq-activities">
                <% loop $Activities %>
					<li>
                        $Me
					</li>
                <% end_loop %>
			</ul>
		</div>
	</div>
	<div class="panel content aq-finish-panel">
		<h3>Activity Completed</h3>
		<span class="aq-final-score">You Scored 10 out of 30 points</span>
		<button class="aq-try-again">Try Again</button>
	</div>

</div>
<script>
	$(document).ready(function () {
		$('#aqua-1').aqua();
	});
</script>