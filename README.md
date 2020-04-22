# PSIFramePlus

THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

This is enhanced iframe utility component to embed other page/site inside Salesforce. It was primarily built to show a Tableau viz inside Salesforce as there was not specific Lightning Web Component for iframes. I also added ability to automatically scale the Tableau viz if the size of the component changes based on stretching/shrinking the browser window. So the Tableau via will grow and shrink in size instead of rolling off the page and having typical iframe scroll bars.

Here are the main configuration options:

| Parameter  | Definition |
| ------------- | ------------- |
| IFrame URL  | The URL to the external page you want to embed |
| IFrame Width  | The width of the iframe. Typically use '100%' |
| IFrame Height | The height in pixels of iframe. On initial setup, just keep playing with this value until the remote site fits in the window to your liking. |
| IFrame Border | Options are 0 and 1. For 0 pixel or 1 pixel border. |
| Scrollbars? | Options are 'auto', 'yes' and 'no' for scrollbars |

# Dynamic URL Parameters

# Clickjack Protection

Lastly if you try to iframe/embed a website URL and it does not display, this is probably due to [clickjack protection](https://www.imperva.com/learn/application-security/clickjacking/). A source website can define if they will allow their website to be iframed or not. It is in their control and you cannot do anything about it. So if their website does not display, you can turn on Chrome debugger and search for [__X-Frame-Options:SAMEORIGIN__](https://www.keycdn.com/blog/x-frame-options) errors.

# Tableau Setup

Typically the Tableau SE will provide a URL to a Tableau Viz like following: 

https://public.tableau.com/views/SanFranciscoDashboards/SFDashboards

(place image here)

Tableau supports some extra URL parameters that help embed a Viz on a page. These extra parameters tell Tableau to remove things like the header, footer, toolbar, etc... The extra URL parameters I add to a Tableau URL are the following

?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:toolbar=no&:showShareOptions=false&:showVizHome=no

So for example, the above Tableau URL now becomes the following which is just a clean Tableau Viz that can now be embedded:

https://public.tableau.com/views/SanFranciscoDashboards/SFDashboards?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:toolbar=no&:showShareOptions=false&:showVizHome=no

(place image here)

# Installation Instructions

Click below button to install this package:

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
