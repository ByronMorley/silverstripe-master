<!-- Playground -->
<!DOCTYPE html>
<html lang="en">
    <% include Head %>
<body>

    <% include Header %>
    <% include Banner %>
<div class="main">
	<div class="container">
        <% control $Widgets %>
            $Me
        <% end_control %>
        <% control $Sections %>
            $Me
        <% end_control %>
	</div>
</div>

    <% include Javascript %>
</body>
</html>
