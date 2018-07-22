<div class="container">
	<article class="col-sm-9 ">
		<ul class="panel-list">
			<li id="section-poem-$ID" class="poem-panel open poem-text">
				<div class="panel main">
					<div class="panel header content-toggle" data-id="section-poem-$ID">
						<h2 class="title">$Title</h2>
						<i class="fa fa-chevron-up arrow-toggle" aria-hidden="true"></i>
						<i class="fa fa-chevron-down arrow-toggle" aria-hidden="true"></i>
					</div>
					<div class="panel content typography">
						<h3 class="author">Bardd: <span>$Author</span></h3>
                        $PoemText
					</div>
				</div>
			</li>

            <% loop $Sections %>

			<li id="section-$ID" class="poem-panel">
				<div class="panel main">
					<div class="panel header content-toggle" data-id="section-$ID">
						<h2 class="title">$Title</h2>
						<i class="fa fa-chevron-up arrow-toggle" aria-hidden="true"></i>
						<i class="fa fa-chevron-down arrow-toggle" aria-hidden="true"></i>
					</div>
					<div class="panel content typography">
						$Me
					</div>
				</div>
			</li>
            <% end_loop %>
		</ul>
	</article>
	<aside class="col-sm-3">
		<div class="panel header">
			<h1 class="title">$Parent.Title</h1>
		</div>
		<div class="panel content">

			<ul>
                <% loop $Parent.Children %>
					<li class="panel"><a href="$Link">$Title</a></li>
                <% end_loop %>
			</ul>

		</div>
	</aside>
</div>