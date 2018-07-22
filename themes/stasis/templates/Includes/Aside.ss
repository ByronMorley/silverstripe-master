<aside>
    <% include ActivitySession %>
	<div class="aside-item">	<h6 class="title">In this section</h6>


		<div class="pane round content">
			<div class="inner">
				<ul class="aside-menu">
                    <% control $Parent.Children %>
						<li>
							<a href="$Link">
                                $MenuTitle
							</a>
						</li>
                    <% end_control %>
				</ul>
			</div>
		</div>
	</div>



</aside>