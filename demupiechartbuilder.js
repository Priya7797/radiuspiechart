(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<table>
				<tr>
					<td>Chart Title</td>
					<td><input id="chart_title" type="text"></td>
				</tr>
				<tr>
					<td>Chart Title Font Size</td>
					<td><input id="chart_title_fontsize" type="number" size="2" maxlength="2"></td>
				</tr
				<br/>
				<tr>
					<td><label for="showlegend" id="showlgndlabel"> Show Legend</label>
					 <input type="checkbox" id="showlegend" name="showlgnd" checked><br> </td>
					 <td><label for="showlegendvalue" id="showlgndlabel"> Show Actual Value in Slice label</label>
					 <input type="checkbox" id="showlegendvalue" name="showlgndval" checked><br> </td>
					     
				</tr>
				<br/>
				

			</table>

			<input type="submit" style="display:none;">
		</form>
		<style>
			:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;
			   
	class RadiusPieChartBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
			this._shadowRoot.getElementById("showlegend").addEventListener("change", this._click.bind(this));
			this._shadowRoot.getElementById("showlegendvalue").addEventListener("change", this._click.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							titlefontsize: this.titlefontsize,
							statusCheckBox: this.statusCheckBox,
							legendvalue: this.legendvalue
						}
					}
			}));
			
		}
		
			
		_click(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							statusCheckBox: this.statusCheckBox,
							legendvalue: this.legendvalue
						}
					}
			}));
			
			this.checked = !this.checked;
		}	
		
		set statusCheckBox(status) {
			console.log("Inside the set statusCheckBox");
			this._shadowRoot.getElementById("showlegend").checked = status;
		}

		get statusCheckBox() {
			console.log("Inside the set statusCheckBox");
			return this._shadowRoot.getElementById("showlegend").checked;
		}

		set legendvalue(legendval) {
			console.log("Inside the set legend value");
			this._shadowRoot.getElementById("showlegendvalue").checked = legendval;
		}

		get legendvalue() {
			console.log("Inside the get legend value");
			return this._shadowRoot.getElementById("showlegendvalue").checked;
		}
		

		set title(newTitle) {
			this._shadowRoot.getElementById("chart_title").value = newTitle;
		}

		get title() {
			return this._shadowRoot.getElementById("chart_title").value;
		}
		
		set titlefontsize(newTitleFontSize) {
			this._shadowRoot.getElementById("chart_title_fontsize").value = newTitleFontSize;
		}

		get titlefontsize() {
			return this._shadowRoot.getElementById("chart_title_fontsize").value;
		}
		
	}
	 
	customElements.define("com-sap-sample-piechart-builder", RadiusPieChartBuilderPanel);
})();
