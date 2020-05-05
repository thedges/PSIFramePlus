# PSIFramePlus

THIS SOFTWARE IS COVERED BY [THIS DISCLAIMER](https://raw.githubusercontent.com/thedges/Disclaimer/master/disclaimer.txt).

This is enhanced iframe utility component to embed other page/site inside Salesforce. It was primarily built to show a Tableau viz inside Salesforce as there was not specific Lightning Web Component for iframes. I also added ability to automatically scale the Tableau viz if the size of the component changes based on stretching/shrinking the browser window. So the Tableau via will grow and shrink in size instead of rolling off the page and having typical iframe scroll bars.

![alt text](https://github.com/thedges/PSIFramePlus/blob/master/TableauVizCommunity.png "Tableau Viz Community")

Here are the main configuration options:

| Parameter  | Definition |
| ------------- | ------------- |
| IFrame URL  | The URL to the external page you want to embed |
| IFrame Width  | The width of the iframe. Typically use '100%' |
| IFrame Height | The height in pixels of iframe. On initial setup, just keep playing with this value until the remote site fits in the window to your liking. |
| IFrame Border | Options are 0 and 1. For 0 pixel or 1 pixel border. |
| Scrollbars? | Options are 'auto', 'yes' and 'no' for scrollbars |
| Original Width | The original width of source content. This is used for the scaling calculations to resize the iframe and source content as one grows/shrinks the window. |


# Dynamic URL Parameters

The component also supports ability to provide dynamic URL parameters if the component is placed on a record page. This would be used so you could pass along an account number, customer id, case number, etc... to the remote site as a URL parameter. Just put in single squirrely brackets the API name of the record field you want to pass. For example if you want to pass along CaseNumber on the URL, you would format the URL like following:

https://somesite.com/samplepage?casenum={CaseNumber}

You can pass along multiple dynamic URL parameters if needed.

# Clickjack Protection

If you try to iframe/embed a website URL and it does not display, this is probably due to [clickjack protection](https://www.imperva.com/learn/application-security/clickjacking/). A source website can define if they will allow their website to be iframed or not. It is in their control and you cannot do anything about it. So if their website does not display, you can turn on Chrome debugger and search for [__X-Frame-Options:SAMEORIGIN__](https://www.keycdn.com/blog/x-frame-options) errors to verify it is a clickjack issue.

# Tableau Setup

Typically the Tableau SE will provide a URL to a Tableau Viz like following: 

https://public.tableau.com/views/SanFranciscoDashboards/SFDashboards

![alt text](https://github.com/thedges/PSIFramePlus/blob/master/TableauViz.png "Tableau Viz")

Tableau supports some extra URL parameters that help embed a Viz on a page. These extra parameters tell Tableau to remove things like the header, footer, toolbar, etc... The extra URL parameters I add to a Tableau URL are the following
```
?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:toolbar=no&:showShareOptions=false&:showVizHome=no
```
So for example, the above Tableau URL now becomes the following which is just a clean Tableau Viz that can now be embedded:

https://public.tableau.com/views/SanFranciscoDashboards/SFDashboards?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:toolbar=no&:showShareOptions=false&:showVizHome=no

![alt text](https://github.com/thedges/PSIFramePlus/blob/master/TableauVizEmbed.png "Embed Tableau Viz")

# Installation Instructions

Click below button to install this package:

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
