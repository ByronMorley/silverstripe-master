<div class="container">
	<article>
		<div class="theme-banner" style="background-color:#$ThemeColor">
			<div class="triangle-bottomright"></div>
			<i class="fa $Icon" aria-hidden="true"></i>
			<h1 class="menu-title">$MenuTitle</h1>
		</div>
        <% if $Children %>
			<ul>
                <% loop $Children %>
					<li class="poem-panel">
						<div class="panel main">
							<div class="panel header">
								<div class="section left">
									<h2 class="title">$Title</h2>
								</div>
								<div class="section right">
									<button onclick="window.location='$Link'">Open</button>
								</div>
							</div>
							<div class="panel content typography">
								<h3 class="author">Bardd: <span>$Author</span></h3>
								<p>$Synopsis</p>
							</div>
						</div>
					</li>
                <% end_loop %>
			</ul>
        <% end_if %>
	</article>
    $Form
    $CommentsForm
</div>