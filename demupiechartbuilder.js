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
					<input type="checkbox" id="showlegend" name="showlgnd" value="Yes">
					<label for="vehicle1"> Show Legend</label><br>
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
			this._shadowRoot.getElementById("showlegend").addEventListener("click", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							titlefontsize: this.titlefontsize, 
							legend: this.legend,
							
						}
					}
			}));
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
		set legend(newLegend) {
			this._shadowRoot.getElementById("showlegend").checked = newLegend;
		}

		get legend() {
			return this._shadowRoot.getElementById("showlegend").checked;
		}
		
	}

	customElements.define("com-sap-sample-piechart-builder", RadiusPieChartBuilderPanel);
})();
