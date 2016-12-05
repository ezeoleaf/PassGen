document.write(`<div class="navbar-fixed">
	<nav id="nav">
	<div class="nav-wrapper default-primary-color">
		<a class="brand-logo center primary-text-color">Pass Generator</a>
		<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
		<ul class="left hide-on-med-and-down">
			<!--li><a class="liProfile" onclick="window.location.replace('profile.html')" ><i class="material-icons">perm_identity</i></a></li-->
		</ul>
		<ul class="right hide-on-med-and-down">
			<!--li><a class="dropdown-button" href="#" data-activates="dropdownMoreOptions"><i class="material-icons">more_vert</i></a></li-->
			<!--li><a onclick="logout()"><i class="material-icons">power_settings_new</i></a></li-->
		</ul>
		<ul class="right show-on-med-and-down">
			<!--li id="backMenuArrow"><a onclick="window.location.replace('index.html')"><i class="material-icons">keyboard_arrow_left</i></a></li-->
		</ul>
		<ul class="side-nav" id="mobile-demo">
			<li class="liPassGenerator accent-color"><a onclick="window.location.replace('index.html')"><strong><i class="nav-bar-icon material-icons">home</i> Pass Generator</strong></a></li>
			<li class="liSavedPassword"><a onclick="window.location.replace('savedPasswords.html')"><i class="nav-bar-icon material-icons">save</i> <span>Last Passwords</span></a></li>
			<li class="liSettings"><a onclick="window.location.replace('settings.html')"><i class="nav-bar-icon material-icons">settings</i> <span>Settings</span></a></li>
		</ul>
	</div>
</nav></div>`);

function showSubNavBar(menu,classColor)
{

	if(!classColor) classColor = 'accent-color';

    document.write(`<div class="navbar-fixed" id="subnavbar">
	<nav id="navsubnavbar">
		<div class="nav-wrapper ${classColor}">
		    <a class="brand-logo center"><h6><span>${menu}</span></h6></a>
        </div>
    </nav>
    </div>`);
}