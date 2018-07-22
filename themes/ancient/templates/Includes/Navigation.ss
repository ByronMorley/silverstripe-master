<!-- NAVIGATION -->
<nav id="nav">
	<i class="fa fa-bars menu-toggle" aria-hidden="true"></i>
	<ul>
        <% if $Menu(1) %>
            <% loop $Menu(1) %>
				<li>
					<a href="$Link" class="$LinkingMode" title="$MenuTitle">$MenuTitle
                        <% if $Children %>
							<i class="fa fa-chevron-down arrow-toggle" aria-hidden="true"></i>
                        <% end_if %>
					</a>
                    <% if $Children %>
						<ul>
							<li class="mobile-sub-menu-option"><a href="$Link" title="$MenuTitle">$MenuTitle Menu</a></li>
                            <% loop $Children %>
								<li><a href="$Link" title="$MenuTitle">$MenuTitle</a></li>
                            <% end_loop %>
						</ul>
                    <% end_if %>
				</li>
            <% end_loop %>
        <% end_if %>
	</ul>
</nav>
