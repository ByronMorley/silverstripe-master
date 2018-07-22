<div class="page-menu">
    <div class="container">
        <ul>
            <% if $SiteLinks %>
                <% loop $SiteLinks.sort('SortOrder', 'ASC') %>
                    <li class="col-lg-2 col-xs-4 col-6">
                        <a class="rs-link" data-class="rs-slide-link-$Pos">
                            <div class="panel c-panel-container">
                                <div class="c-panel">
                                    <div class="outer-circle">
                                        <div class="circle">
                                            <i class="fa $Icon" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel text">
                                <span>$Welsh</span>
                                <span class="bold">$English</span>
                            </div>
                        </a>
                    </li>
                <% end_loop %>
            <% end_if %>
        </ul>
    </div>
</div>