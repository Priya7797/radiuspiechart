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
					<td> <input type="checkbox" id="showlegend" name="showlgnd" checked> </td>
					<td><label for="showlegend" id="showlgndlabel"> Show Legend</label><br> </td>
				</tr>
				<br/>
				<tr>
					<td> <button type="submit" value="Submit">Submit Changes</button> </td>
				</tr>

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
			this._shadowRoot.getElementById("showlegend").addEventListener("click", this._submit2.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							titlefontsize: this.titlefontsize,
							statusCheckBox: this.statusCheckBox
							
						}
					}
			}));
			
		_submit2(e) {
// 			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							
							statusCheckBox: this.statusCheckBox
							
						}
					}
			}));
			
			
			
		
			
			
			
		}
		
		set statusCheckBox(status) {
			console.log("Inside the set statusCheckBox");
			this._shadowRoot.getElementById("showlegend").checked = status;
		}

		get statusCheckBox() {
			console.log("Inside the set statusCheckBox");
			return this._shadowRoot.getElementById("showlegend").checked;
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
		set legendlabel(newLegendlabel) {
			this._shadowRoot.getElementById("showlgndlabel").value = newLegendlabel;
		}

		get legendlabel() {
			return this._shadowRoot.getElementById("showlgndlabel").value;
		}
		
	}
	 
	customElements.define("com-sap-sample-piechart-builder", RadiusPieChartBuilderPanel);
})();
