/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.grid.filter.BooleanFilter = Ext.extend(Ext.grid.filter.Filter, {
  defaultValue: false,

	init: function(){
    var gId = Ext.id();
		this.options = [
			new Ext.menu.CheckItem({text: "Да", group: gId, checked: this.defaultValue === true}),
			new Ext.menu.CheckItem({text: "Нет", group: gId, checked: this.defaultValue === false})
    ];
		
		this.menu.add(this.options[0], this.options[1]);
		
		for(var i=0; i<this.options.length; i++) {
			this.options[i].on('click', this.fireUpdate, this);
			this.options[i].on('checkchange', this.fireUpdate, this);
		}
	},
	
	isActivatable: function() {
		return true;
	},
	
	fireUpdate: function() {		
		this.fireEvent("update", this);			
		this.setActive(true);
	},
	
	setValue: function(value) {
		this.options[value ? 0 : 1].setChecked(true);
	},
	
	getValue: function() {
		return this.options[0].checked;
	},
	
	serialize: function() {
		var args = {type: 'boolean', value: this.getValue()};
		this.fireEvent('serialize', args, this);
		return args;
	},
	
	validateRecord: function(record) {
		return record.get(this.dataIndex) == this.getValue();
	}
});