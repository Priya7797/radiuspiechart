(function()  {
	let _series1Color;
	let _chartTitle;
	let _chartTitleFontSize;
	let _statusCheckBox;
	const amchartscorejs = "https://cdn.amcharts.com/lib/4/core.js";
	const amchartschartsjs = "https://cdn.amcharts.com/lib/4/charts.js";
	const amchartsanimatedjs = "https://cdn.amcharts.com/lib/4/themes/animated.js"


    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
<div id="chartTitle" style=""></div><br/>
<div id="chartdiv"></div>
    `;
	
function loadScript(src) {
		return new Promise(function(resolve, reject) {
			let script = document.createElement('script');
			script.src = src;

			script.onload = () => {
				resolve(script);
			}
			script.onerror = () => reject(new Error(`Script load error for ${src}`));

			document.head.appendChild(script)
		});
	}	

    customElements.define('com-sap-sample-piechart', class WidgetTemplate extends HTMLElement {


		constructor() {
			super(); 
		
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(tmpl.content.cloneNode(true));					
			this._props = {};
			this._firstConnection = 0;
		}


        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
			
            if (this._firstConnection === 0) {
				async function LoadLibs(that) {
					try {
						await loadScript(amchartscorejs);
						await loadScript(amchartschartsjs);
						await loadScript(amchartsanimatedjs);
					} catch (e) {
						console.log(e);
					} finally {
						that._firstConnection = 1;
						that.loadthis();
					}
				}
				LoadLibs(this);
			}
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }
		onCustomWidgetBeforeUpdate(changedProperties) {
				this._props = { ...this._props, ...changedProperties };
			}

			onCustomWidgetAfterUpdate(changedProperties) {
				if ("color" in changedProperties) {
					this._series1Color = changedProperties["color"];
				}
				if ("title" in changedProperties) {
					this._chartTitle = changedProperties["title"];
				}
				if ("titlefontsize" in changedProperties) {
					this._chartTitleFontSize = changedProperties["titlefontsize"];
				}
				if ("statusCheckBox" in changedProperties) {
					this._statusCheckBox = changedProperties["statusCheckBox"];
				}
				if (this._firstConnection === 1) {
					this.loadthis();
				}
			}

		onCustomWidgetResize(width, height){
			if (this._firstConnection === 1) {
				this.loadthis();
			}
        }
		
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
        
        }
        */

        loadthis(){
			
			let myChart = this.shadowRoot.getElementById('chartdiv');
			myChart.style.height = this.shadowRoot.host.clientHeight - 20 + "px";
			myChart.style.width = this.shadowRoot.host.clientWidth - 20 + "px";
		
			if(this._chartTitle && this._chartTitle.trim() !== "") {
				var chartTitle = this.shadowRoot.getElementById('chartTitle');
				chartTitle.innerText = this._chartTitle.trim();
				if(this._chartTitleFontSize && this._chartTitleFontSize > 0) {
					chartTitle.style.fontSize = this._chartTitleFontSize + "px";
				}
				myChart.style.height = myChart.clientHeight - chartTitle.clientHeight - 10 + "px";
				myChart.style.top = chartTitle.clientHeight - 10 + "px"; 
			}
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart
var chart = am4core.create(myChart, am4charts.PieChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

if(this.datasourceString.trim() === "{}") { 

chart.data = [
  {
    country: "Lithuania",
    value: 260
  },
  {
    country: "Czechia",
    value: 230
  },
  {
    country: "Ireland",
    value: 200
  },
  {
    country: "Germany",
    value: 165
  },
  {
    country: "Australia",
    value: 139
  },
  {
    country: "Austria",
    value: 128
  }
];


}

else {
				var newDataSourceObj = JSON.parse(this.datasourceString);
				var newChartData = [];
				for(var i = 0; i < newDataSourceObj.length; i++) {
					var dimMemberID = newDataSourceObj[i].dimensions[0].member_id;
					var dimMemberDesc = newDataSourceObj[i].dimensions[0].member_description;
					var msrObj = newDataSourceObj[i].measure;
					if(!newChartData.find(x => x.category_id === dimMemberID)) {
						var newDataObject = {};
						newDataObject.category_id = dimMemberID;
						newDataObject.country = dimMemberDesc;
						newDataObject.measuredescriptions = [];
						newDataObject.measuredescriptions.push(msrObj.measure_description);
						newDataObject.value = msrObj.formattedValue;
						newChartData.push(newDataObject);
					} else {
						var existingObj = newChartData.find(x => x.category_id === dimMemberID);
						existingObj.measuredescriptions.push(msrObj.measure_description);
						var newProp = "value"+existingObj.measuredescriptions.length;
						existingObj[newProp] = msrObj.formattedValue;
					}
					
				}
				chart.data = newChartData;
				

}

var series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "value";
series.dataFields.radiusValue = "value";
series.dataFields.category = "country";
series.slices.template.cornerRadius = 6;
series.colors.step = 3;

series.hiddenState.properties.endAngle = -90;
console.log(_statusCheckBox);		
if(this._statusCheckBox == true){
chart.legend = new am4charts.Legend();
//chart.legend.maxHeight = 50;
//chart.legend.scrollable = true;
chart.legend.fontSize = 10;
var markerTemplate = chart.legend.markers.template;
markerTemplate.width = 10;
markerTemplate.height = 10;
}

// end am4core.ready()
        }
    
    
    });
        
})();
