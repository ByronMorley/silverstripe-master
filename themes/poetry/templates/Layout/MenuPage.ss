<div class="container">
	<div class="menu-page poetic">
		<ul class="menu-3">
            <% if $Children %>
                <% loop $Children %>
					<li>
						<a href="$Link" style="background-color:#$ThemeColor">
                            <div class="triangle-bottomright"></div>
							<i class="fa $Icon" aria-hidden="true"></i>
							<span class="menu-title">$MenuTitle</span>
                        </a>
					</li>
                <% end_loop %>
            <% end_if %>
		</ul>
	</div>
</div>