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
</table>

<div class="onoffswitch">
<span> Legend </span>
    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" checked>
    <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
    </label>
</div>

			<input type="submit" style="display:none;">
		</form>
		<style>
.onoffswitch {
    position: relative; width: 90px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 20px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;
    font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "ON";
    padding-left: 10px;
    background-color: #34A7C1; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 10px;
    background-color: #EEEEEE; color: #999999;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 18px; margin: 6px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 56px;
    border: 2px solid #999999; border-radius: 20px;
    transition: all 0.3s ease-in 0s; 
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px; 
}
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
			this._shadowRoot.getElementById("myonoffswitch").addEventListener("click", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							titlefontsize: this.titlefontsize, 
							legend: this.legend
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
			this._shadowRoot.getElementById("myonoffswitch").checked = newLegend;
		}

		get legend() {
			return this._shadowRoot.getElementById("myonoffswitch").checked;
		}
		
	}

	customElements.define("com-sap-sample-piechart-builder", RadiusPieChartBuilderPanel);
})();
