import {LightningElement, api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {loadScript} from 'lightning/platformResourceLoader';
import APP_RESOURCES from '@salesforce/resourceUrl/PSIFramePlus';
import getData from '@salesforce/apex/PSIFramePlus.getData';

export default class PsIFramePlus extends LightningElement {
  @api recordId;
  @api url;
  @api height;
  @api width;
  @api minScale = 0.60;
  @api cssStyle = '';
  @api frameBorder = '0';
  @api scrolling = 'no';
  originalWidth = 1487;

  adjustIFrame () {
    console.log ('adjustIFrame invoked...');
  }

  renderedCallback () {
    var self = this;

    if (this.d3Initialized) {
      return;
    }
    this.d3Initialized = true;

    Promise.all ([loadScript (this, APP_RESOURCES + '/handlebars-v4.1.2.js')])
      .then (() => {
        console.log ('renderedCallback...');
        window.addEventListener('resize', this.myFunction.bind(this));

        var main = this.template.querySelector('.main');
        main.style.height = (parseInt(self.height) + 5) + 'px';

        var wrapper = this.template.querySelector('.wrapper');
        wrapper.style.height = self.height + 'px';

        var fr = this.template.querySelector('.frame1');
        var scale = el.clientWidth/this.originalWidth;
        if (scale < 1.0)
        {
          fr.style.webkitTransform = 'scale(' + scale.toFixed(4) + ')';
          fr.style.MozTransform = 'scale(' + scale.toFixed(4) + ')';
        }
        //fr.style.webkitTransform = "scale(0.7)";
        //fr.style.MozTransform = "scale(0.7)";
        //-webkit-transform:scale(0.7);-moz-transform-scale(0.7);

        //fr.style.width = "800px";

        var doc;
    if (fr.contentDocument) // FF Chrome
      doc = fr.contentDocument;
    else if ( fr.contentWindow ) // IE
       doc = fr.contentWindow.document;
       console.log('doc=' + JSON.stringify(doc));

        console.log ('check handlerbars...');
        if (self.url.includes ('{{')) {
          console.log ('getting params...');
          var params = self.getHandlebarVars (self.url);
          console.log ('params=' + JSON.stringify (params));

          return getData({recordId: self.recordId, params: params});
        }
      })
      .then ((data) => {
         console.log('data=' + JSON.stringify(data));
         var urlTemplate = Handlebars.compile(self.url);
         self.url = urlTemplate(data);
      })
      .catch (error => {
          self.handleError(error);
          /*
        console.log ('error=' + JSON.stringify (error));
        this.dispatchEvent (
          new ShowToastEvent ({
            title: 'Error loading JS libraries',
            message: error.message,
            variant: 'error',
          })
        );
        */
      });
  }

  myFunction = () => {
    console.log('resized => ');
    
    var main = this.template.querySelector('.main');
    var el = this.template.querySelector('.wrapper');
    var fr = this.template.querySelector('.frame1');

    var scale = el.clientWidth/this.originalWidth;
    if (scale < 1.0)
    {
      fr.style.width = this.originalWidth + 'px';
      fr.style.webkitTransform = 'scale(' + scale.toFixed(4) + ')';
      fr.style.MozTransform = 'scale(' + scale.toFixed(4) + ')';

      main.style.height = (parseInt(this.height)*scale + 5) + 'px';
    }
    else
    {
      main.style.height = this.height + 'px';
      el.style.height = this.height + 'px';
      fr.style.height = '100%';
      fr.style.width = '100%';
      fr.style.webkitTransform = 'scale(1.0)';
      fr.style.MozTransform = 'scale(1.0)';
    }

  };

  getHandlebarVars (template) {
    const ast = Handlebars.parse (template);
    let keys = [];

    for (let i in ast.body) {
      if (ast.body[i].type === 'MustacheStatement') {
        keys.push (ast.body[i].path.original);
      }
    }
    return keys;
  }

  handleError (err) {
    console.log ('error=' + err);
    console.log ('type=' + typeof err);

    this.showSpinner = false;

    const event = new ShowToastEvent ({
      title: err.statusText,
      message: err,
      variant: 'error',
      mode: 'pester',
    });
    this.dispatchEvent (event);
  }
}