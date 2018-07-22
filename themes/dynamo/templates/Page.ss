<!-- PAGE -->
<!DOCTYPE html>
<html lang="en">
    <% include Head %>
<body class="$ClassName.LowerCase" >

    <% include Header %>
    <% include Banner %>

<div class="main">
    <div id="page-management-root" class="ajax-container">
        $Layout
    </div>
</div>
    <% include Footer %>


<!-- Ajax Setup -->
<!-- Recursive Site tree - use for mapping the site -->
<ul style="display:none;" id="site-information-tree" base_url="$absoluteBaseURL">
    <% loop $Menu(1) %>
        <li link="$Link" title="$MenuTitle" parentID="$ParentID" pageID="$ID" className="$ClassName" nest="$Nest"
            segment="$URLSegment">$MenuTitle
            <% include Menu %>
        </li>
    <% end_loop %>
</ul>
<script src="$ThemeDir/app/dist/bundle.js"></script>
</body>
</html>
