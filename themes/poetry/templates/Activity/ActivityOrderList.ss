<div class="panel content aq-activity aq-order-list" id="activity-$ID" data-object="OrderList">
	<ul class="drag-and-drop">
		<li>
			<ul class="order">
                <% loop $Items %>
					<li><h4>$Pos</h4></li>
                <% end_loop %>
			</ul>
		</li>
		<li>
			<ul id="selection-area" class="selection area">
                <% loop $randomisedList %>
					<li id="item-$ID" data-sort="$SortOrder" class="aq-selectable aq-box">
                        <p>$Text</p>
						<div class="aq-icons"></div>
                    </li>
                <% end_loop %>
			</ul>
		</li>
	</ul>
</div>